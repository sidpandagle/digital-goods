'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalBundles: number;
  recentOrders: Array<{
    id: string;
    email: string;
    amount: number;
    status: string;
    created_at: string;
    bundle: {
      title: string;
    };
  }>;
  topBundles: Array<{
    bundle_id: string;
    title: string;
    sales_count: number;
    total_revenue: number;
  }>;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // Get total revenue and orders
      const { data: orders } = await supabase
        .from('orders')
        .select('amount, status')
        .eq('status', 'paid');

      const totalRevenue = orders?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const totalOrders = orders?.length || 0;

      // Get total bundles
      const { count: bundlesCount } = await supabase
        .from('bundles')
        .select('*', { count: 'exact', head: true });

      // Get recent orders with bundle info
      const { data: recentOrders } = await supabase
        .from('orders')
        .select(`
          id,
          email,
          amount,
          status,
          created_at,
          bundle:bundles(title)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      // Get top selling bundles
      const { data: topBundles } = await supabase
        .from('orders')
        .select(`
          bundle_id,
          amount,
          bundle:bundles(title)
        `)
        .eq('status', 'paid');

      // Aggregate top bundles
      const bundleStats = topBundles?.reduce((acc: any, order: any) => {
        const bundleId = order.bundle_id;
        if (!acc[bundleId]) {
          acc[bundleId] = {
            bundle_id: bundleId,
            title: order.bundle?.title || 'Unknown',
            sales_count: 0,
            total_revenue: 0,
          };
        }
        acc[bundleId].sales_count += 1;
        acc[bundleId].total_revenue += order.amount;
        return acc;
      }, {});

      const topBundlesArray = Object.values(bundleStats || {})
        .sort((a: any, b: any) => b.sales_count - a.sales_count)
        .slice(0, 5) as any[];

      setAnalytics({
        totalRevenue: totalRevenue / 100, // Convert from paise to rupees
        totalOrders,
        totalBundles: bundlesCount || 0,
        recentOrders: (recentOrders || []).map((order: any) => ({
          ...order,
          bundle: order.bundle || { title: 'Unknown' },
        })),
        topBundles: topBundlesArray.map((bundle: any) => ({
          ...bundle,
          total_revenue: bundle.total_revenue / 100,
        })),
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!analytics) {
    return <div>Failed to load analytics</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{analytics.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Total Bundles</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalBundles}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Bundles */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Selling Bundles</h2>
          {analytics.topBundles.length === 0 ? (
            <p className="text-gray-600">No sales data available yet.</p>
          ) : (
            <div className="space-y-4">
              {analytics.topBundles.map((bundle, index) => (
                <div
                  key={bundle.bundle_id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{bundle.title}</h3>
                      <p className="text-sm text-gray-600">{bundle.sales_count} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{bundle.total_revenue.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
          {analytics.recentOrders.length === 0 ? (
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Bundle</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{order.email}</td>
                      <td className="py-3 px-4">{order.bundle.title}</td>
                      <td className="py-3 px-4 font-semibold">₹{(order.amount / 100).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

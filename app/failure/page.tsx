'use client';

import Link from 'next/link';
import { X, AlertCircle, Info, ArrowLeft, Home, ShieldCheck } from 'lucide-react';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center border border-gray-100 animate-slide-up">
          {/* Error Icon */}
          <div className="mb-8 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl animate-in">
              <X
                className="w-14 h-14 text-white"
                strokeWidth={3}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
              Payment Failed
            </span>
          </h1>
          <p className="text-gray-700 text-xl mb-10">
            We could not process your payment. This could be due to several reasons.
          </p>

          {/* Common Reasons */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              Common Reasons
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                <span>Payment was cancelled or closed</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                <span>Insufficient funds or credit limit exceeded</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                <span>Incorrect card details or expired card</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                <span>Network or connection issues</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                <span>Bank declined the transaction</span>
              </li>
            </ul>
          </div>

          {/* What to do */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Info className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              What to do next?
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <span className="pt-1">Check your card details and available balance</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <span className="pt-1">Try a different payment method</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <span className="pt-1">Contact your bank if the issue persists</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <span className="pt-1">Retry the purchase when ready</span>
              </li>
            </ul>
          </div>

          {/* Reassurance */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-600" strokeWidth={2} />
              <p className="text-gray-900 font-semibold">
                Don&apos;t worry, no charges were made to your account.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Try Again
            </button>
            <Link
              href="/"
              className="group px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:scale-105 transition-all duration-200 font-bold flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" strokeWidth={2} />
              Back to Catalog
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 bg-white/50 backdrop-blur-sm rounded-xl py-3 px-6 inline-block">
            Need assistance?{' '}
            <a href="mailto:support@pixelforgestudio.in" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

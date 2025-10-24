import { redirect } from 'next/navigation';
import { getUserProfile } from '@/lib/auth/utils';
import AnalyticsDashboard from './components/AnalyticsDashboard';

export default async function AnalyticsPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== 'admin') {
    redirect('/login');
  }

  return <AnalyticsDashboard />;
}

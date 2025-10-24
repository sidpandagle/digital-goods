import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth/utils';
import MyPurchasesDashboard from './components/MyPurchasesDashboard';

export default async function MyPurchasesPage() {
  const user = await getCurrentUser();
  const profile = await getUserProfile();

  if (!user || !profile) {
    redirect('/login');
  }

  return <MyPurchasesDashboard user={user} profile={profile} />;
}

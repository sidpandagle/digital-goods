import { redirect } from 'next/navigation';
import { getUserProfile } from '@/lib/auth/utils';
import AdminDashboard from './components/AdminDashboard';

export default async function AdminPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== 'admin') {
    redirect('/login');
  }

  return <AdminDashboard profile={profile} />;
}

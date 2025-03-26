
import React from 'react';
import { getUser } from '@/app/actions';
import DashboardClientPage from './dashboard-client-page';

export default async function DashboardPage() {
  const { user } = await getUser();

  return (
    <DashboardClientPage user={user} />
  );
}




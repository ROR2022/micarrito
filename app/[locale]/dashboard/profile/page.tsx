

import React from 'react';

import { getUser } from '@/app/actions';
import ProfileClient from './profile-client';

export default async function ProfilePage() {
  const { user } = await getUser();
  
  return (
    <ProfileClient user={user} />
  );
}





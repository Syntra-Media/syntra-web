import React from 'react'
import { getNotification } from '@/utils/supabaseServerActions';
import SingleNotification from '@/components/ui/SingleNotification';

async function NotificationSlug(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const notification = await getNotification(params.slug);

  if (!notification) return null;

  return (
    <SingleNotification notification={notification} />
  )
}

export default NotificationSlug
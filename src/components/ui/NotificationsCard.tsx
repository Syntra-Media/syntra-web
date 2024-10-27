import { ChevronRightIcon, MessageCircleIcon } from 'lucide-react';
import React, { useMemo } from 'react'
import Link from 'next/link';

function NotificationsCard({notifications}: {notifications: any[]}) {
  console.log(notifications);
  const lastNotification = useMemo(() => {
    return notifications[notifications.length - 1];
  }, [notifications]);
  
  if (notifications.length === 0) return (
    <div className={"flex w-full h-full bg-bg-200/20 rounded-lg"}>
      <div className={"flex w-full h-full items-center justify-center"}>
        <p className='text-xs font-medium text-light/60'>
          Henüz bildirim yok
        </p>
      </div>
    </div>
  );

  return (
    <div className={"flex w-full h-full bg-bg-200/20 rounded-lg"}>
      <div className={"flex flex-col w-full h-full gap-2 p-3"}>
        <div className='flex items-center gap-1'>
          <MessageCircleIcon className='w-6 h-6 text-light/90' />
          <p className='text-base font-medium text-light/90'>
            {lastNotification.title}
          </p>
        </div>
        <div className='text-sm font-medium text-light/80 line-clamp-3 prose prose-xs prose-invert' dangerouslySetInnerHTML={{__html: lastNotification.content}}></div>
        <div className='flex w-full mt-auto items-end justify-between'>
          <p className='text-xs font-medium text-light/60'>
            {lastNotification.sender} tarafından gönderildi
          </p>
          <Link href={`/portal/notifications/${lastNotification.id}`} className='text-xs font-medium text-light/60'>
            mesajı oku
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotificationsCard
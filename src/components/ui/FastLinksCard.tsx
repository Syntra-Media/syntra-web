import { CalendarCheck, CircleUser, CreditCard, File, FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useTheme } from '@/components/providers/PortalThemeProvider'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

function FastLinks() {
  const { isDarkTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
      )}
    >
      <div className={"flex h-full items-center justify-between 2xl:gap-6 gap-4 w-full px-4 2xl:px-8 py-2"}>
        {[
          { href: "/portal/profile", icon: CircleUser, label: "Profil" },
          { href: "/portal/project", icon: FileText, label: "Projeler" },
          { href: "/portal/tasks", icon: CalendarCheck, label: "Görevler" },
          { href: "/portal/payments", icon: CreditCard, label: "Ödemeler" },
          { href: "/portal/files", icon: File, label: "Dosyalar" }
        ].map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
          >
            <Link 
              href={item.href} 
              className={cn(
                'flex flex-col items-center gap-2 transition-colors duration-200 p-2 rounded-lg',
                isDarkTheme ? 'text-light/90 hover:bg-light/10' : 'text-gray-800 hover:bg-gray-200',
                'hover:text-light'
              )}
            >
              <item.icon className='2xl:w-12 2xl:h-12 w-8 h-8' />
              <span className='text-sm 2xl:text-base'>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default FastLinks
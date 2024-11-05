import { cn } from '@/lib/utils'
import { HardDrive, Info, Table, File, Image, Video, Pin } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { useTheme } from '@/components/providers/PortalThemeProvider'
import { motion } from 'framer-motion'

const FileTypeIcons: Record<string, React.ElementType> = {
  'document': File,
  'table': Table,
  'image': Image,
  'video': Video,
}

const FileTypeColors: Record<string, string> = {
  'document': 'bg-blue-500',
  'table': 'bg-green-500',
  'image': 'bg-red-500',
  'video': 'bg-yellow-500',
}

const FileTypeNames: Record<string, string> = {
  'document': 'Döküman',
  'table': 'Tablo',
  'image': 'Resim',
  'video': 'Video',
}

function SyntraDriveCard({files}: {files: any}) {
  const { isDarkTheme } = useTheme();
  const filesLength = useMemo(() => {
    return files.length
  }, [files])

  const lastUpdated = useMemo(() => {
    if (filesLength === 0) return 'herhangi bir dosya yok'

    const timeDiff = getTimeDifference(files[filesLength - 1].created_at);
    return `${timeDiff.value} ${timeDiff.unit} önce güncellendi`;
  }, [files])

  const [selectedFile, setSelectedFile] = useState<any>(null)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "flex flex-col lg:flex-row w-full h-full rounded-lg overflow-hidden backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
      )}>
      <div className="flex flex-col w-full lg:w-3/4 p-4 h-full overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full h-full">
          {
            files.sort((a: any) => a.pinned ? -1 : 1).slice(0, 12).map((file: any, index: number) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                key={file.id}
              >
                <Link href={file.link} target='_blank' className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-colors bg-opacity-10",
                  isDarkTheme ? "hover:bg-bg-100/50" : "hover:bg-gray-200/50"
                )}>
                  {
                    FileTypeIcons[file.type] && React.createElement(FileTypeIcons[file.type], {size: 32, className: `text-${FileTypeColors[file.type].split('-')[1]}-500`})
                  }
                  <p className={cn(
                    "text-xs sm:text-sm font-medium text-center line-clamp-2",
                    isDarkTheme ? "text-light" : "text-gray-800"
                  )}>{file.name}</p>
                  <p className={cn(
                    "text-xs flex items-center gap-1 mt-1",
                    isDarkTheme ? "text-light/70" : "text-gray-600"
                  )}>
                    {file.size} MB 
                    {file.pinned && <Pin size={12} className="text-primary/90" />}
                  </p>
                </Link>
              </motion.div>
            ))
          }
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-between items-center w-full mt-4">
          <p className={cn(
            "text-xs",
            isDarkTheme ? "text-light/70" : "text-gray-600"
          )}>
            toplam {filesLength} öğe (görülen {filesLength > 12 ? '12' : filesLength})
          </p>
          <Link href={'/portal/files'} className={cn(
            "text-xs font-medium hover:text-primary",
            isDarkTheme ? "text-light/70" : "text-gray-600"
          )}>
            tümünü gör
          </Link>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col w-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-light/10">
        <div className={cn(
          "flex justify-center items-center py-4 lg:py-8 rounded-tr-lg",
          isDarkTheme ? "bg-bg-100/25" : "bg-gray-200/25"
        )}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <HardDrive className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
          </motion.div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-4 lg:py-8 h-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-1">
            <p className={cn(
              "text-base lg:text-lg font-medium",
              isDarkTheme ? "text-light" : "text-gray-800"
            )}>Syntra Drive <span className={cn(
              "text-xs",
              isDarkTheme ? "text-light/70" : "text-gray-600"
            )}> {filesLength > 0 ? `(${filesLength} öğe)` : ''}</span></p>
            <p className={cn(
              "text-xs",
              isDarkTheme ? "text-light/70" : "text-gray-600"
            )}>
              {lastUpdated}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "flex border gap-2 items-center justify-center w-full rounded-lg p-2 mt-auto",
              isDarkTheme ? "border-light/10" : "border-gray-300"
            )}>
            <Info size={32} className="text-primary flex-shrink-0" />
            <p className={cn(
              "text-xs",
              isDarkTheme ? "text-light/70" : "text-gray-600"
            )}>
              Tümünü gör butonuna tıklayarak tüm dosyalarınıza erişebilirsiniz.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const getTimeDifference = (date: string) => {
  const now = new Date()
  const createdAt = new Date(date)
  const diffTime = Math.abs(now.getTime() - createdAt.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

  if (diffDays > 0) return { value: diffDays, unit: 'gün' }
  if (diffHours > 0) return { value: diffHours, unit: 'saat' }
  return { value: diffMinutes, unit: 'dakika' }
}

export default SyntraDriveCard
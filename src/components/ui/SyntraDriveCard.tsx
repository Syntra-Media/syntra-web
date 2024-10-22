import { cn } from '@/lib/utils'
import { HardDrive, Info, Table, File, Image, Video, Pin } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

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
    <div className="flex flex-col lg:flex-row w-full h-full bg-bg-200/20 rounded-lg overflow-hidden">
      <div className="flex flex-col w-full lg:w-3/4 p-4 h-full overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full h-full">
          {
            files.sort((a: any) => a.pinned ? -1 : 1).slice(0, 12).map((file: any) => (
              <Link key={file.id} href={file.link} target='_blank' className={`flex flex-col items-center p-2 rounded-lg hover:bg-bg-100/50 transition-colors bg-opacity-10`}>
                {
                  FileTypeIcons[file.type] && React.createElement(FileTypeIcons[file.type], {size: 32, className: `text-${FileTypeColors[file.type].split('-')[1]}-500`})
                }
                <p className={`text-xs sm:text-sm font-medium text-center line-clamp-2`}>{file.name}</p>
                <p className="text-xs text-light/70 flex items-center gap-1 mt-1">
                  {file.size} MB 
                  {file.pinned && <Pin size={12} className="text-primary/90" />}
                </p>
              </Link>
            ))
          }
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <p className="text-xs text-light/70">
            toplam {filesLength} öğe (görülen {filesLength > 12 ? '12' : filesLength})
          </p>
          <Link href={'/portal/files'} className="text-xs font-medium text-light/70 hover:text-primary">
            tümünü gör
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-light/10">
        <div className="bg-bg-100/70 flex justify-center items-center py-4 lg:py-8 rounded-tr-lg">
          <HardDrive className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
        </div>
        <div className="flex flex-col gap-4 px-4 py-4 lg:py-8 h-full">
          <div className="flex flex-col gap-1">
            <p className="text-base lg:text-lg font-medium">Syntra Drive <span className="text-xs text-light/70"> {filesLength > 0 ? `(${filesLength} öğe)` : ''}</span></p>
            <p className="text-xs text-light/70">
              {lastUpdated}
            </p>
          </div>
          <div className="flex border gap-2 items-center justify-center w-full rounded-lg p-2 border-light/10 mt-auto">
            <Info size={32} className="text-primary flex-shrink-0" />
            <p className="text-xs text-light/70">
              Tümünü gör butonuna tıklayarak tüm dosyalarınıza erişebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
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
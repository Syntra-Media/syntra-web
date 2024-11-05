"use client"

import React from 'react';
import { File as FileIcon, Table, Image, Video, Pin } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/PortalThemeProvider';
import { cn } from '@/lib/utils';

const FileTypeIcons: Record<string, React.ElementType> = {
  'document': FileIcon,
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

const File = ({ projectFile }: { projectFile: any }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Link
      href={projectFile.link || '/'}
      target="_blank"
      key={projectFile.id}
      className={cn(
        'flex flex-col p-4 rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md',
        `${FileTypeColors[projectFile.type]} bg-opacity-10 hover:bg-opacity-20`,
        isDarkTheme ? 'text-light' : 'text-gray-800'
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {FileTypeIcons[projectFile.type] &&
            React.createElement(FileTypeIcons[projectFile.type], {
              size: 32,
              className: `text-${
                FileTypeColors[projectFile.type].split("-")[1]
              }-500`,
            })}
          <p className="text-lg font-medium truncate">{projectFile.name}</p>
        </div>
        {projectFile.pinned && <Pin size={16} className="text-primary/90 ml-2" />}
      </div>
      <div className={cn(
        "flex items-center justify-between text-sm",
        isDarkTheme ? "text-light/70" : "text-gray-600"
      )}>
        <span>{FileTypeNames[projectFile.type]}</span>
        <span>{new Date(projectFile.created_at).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}

export default File;
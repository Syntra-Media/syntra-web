"use client"

import React, {useMemo} from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useTheme } from '@/components/providers/PortalThemeProvider'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const TasksOverviewCard = ({tasks}: {tasks: any}) => {
  const { isDarkTheme } = useTheme();

  const completedTasks = useMemo(() => {
    if (!tasks) return 0

    return tasks.filter((task: any) => task.complete === true).length
  }, [tasks])

  const totalTasks = useMemo(() => {
    if (!tasks) return 0
    return tasks.length
  }, [tasks])

  const progress = useMemo(() => {
    if (!totalTasks) return 0
    return Math.round((completedTasks / totalTasks) * 100)
  }, [completedTasks, totalTasks])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
      )}>
          <div className={"flex w-full justify-center px-3 py-3 gap-2"}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='flex flex-col gap-4 items-center justify-center'
            >
              <CircularProgressbar value={progress} text={`${progress}%`} 
                styles={{
                  path: {
                    stroke: '#ffc300',
                  },
                  trail: {
                    stroke: '#ffc30033',
                  },
                  text: {
                    fill: isDarkTheme ? '#ffc300' : '#ffc300',
                    fontSize: '16px',
                  },
                }}
              />
              <p className={cn(
                'text-xs font-medium',
                isDarkTheme ? 'text-light/60' : 'text-gray-600'
              )}>
                İlerleme
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='flex flex-col gap-4 items-center justify-center'
            >
              <CircularProgressbar value={progress} text={`${completedTasks} / ${totalTasks}`} 
                styles={{
                  path: {
                    stroke: '#ffc300',
                  },
                  trail: {
                    stroke: '#ffc30033',
                  },
                  text: {
                    fill: isDarkTheme ? '#ffc300' : '#ffc300',
                    fontSize: '16px',
                  },
                }}
              />
              <p className={cn(
                'text-xs text-center font-medium',
                isDarkTheme ? 'text-light/60' : 'text-gray-600'
              )}>
                Görevler
              </p>
            </motion.div>
          </div>
    </motion.div>
  )
}

export default TasksOverviewCard
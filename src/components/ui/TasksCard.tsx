"use client"

import React from 'react'
import { useTheme } from '@/components/providers/PortalThemeProvider'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

function TasksCard({tasks}: {tasks: any[]}) {
  const { isDarkTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
      )}>
      <div className={"flex w-full h-full gap-4 p-3"}>
        <div className='grid grid-cols-7 gap-3 h-full w-full'>
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, index) => (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              key={day} 
              className={cn(
                'text-xs font-medium text-left',
                isDarkTheme ? 'text-light/60' : 'text-gray-600'
              )}>
              {day}
            </motion.div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + i);
            const dayTasks = tasks.filter(task => {
              const taskEndDate = new Date(task.end_date);
              return taskEndDate.toDateString() === date.toDateString() && !task.complete;
            });
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                key={i}
                className={cn(
                  'rounded-md p-1 h-full relative group transition-all duration-200 hover:scale-110 hover:z-10',
                  isDarkTheme ? 'ring-1 ring-bg-200/60' : 'ring-1 ring-gray-200',
                  date.toDateString() === new Date().toDateString() 
                    ? (isDarkTheme ? 'bg-slate-100/15' : 'bg-slate-600/15')
                    : 'bg-transparent hover:bg-slate-100/20'
                )}
              >
                <div className={cn(
                  'text-xs font-medium',
                  isDarkTheme ? 'text-light/80' : 'text-gray-700'
                )}>
                  {date.getDate()}
                </div>
                {dayTasks.length > 0 && (
                  <>
                    <div className='mt-1 flex flex-col h-min gap-1'>
                      {dayTasks.map((task, index) => {
                        const colorClass = task.color ? `bg-${task.color}-500` : 'bg-primary-500';
                        return (
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            key={index} 
                            className={`w-full h-1 rounded-full ${colorClass}`} 
                          />
                        );
                      })}
                    </div>
                    <div className={cn(
                      'absolute z-10 invisible group-hover:visible rounded-lg p-2 shadow-lg -translate-y-full -translate-x-1/4 top-0 w-48 transition-all duration-200',
                      isDarkTheme ? 'bg-bg-100' : 'bg-white'
                    )}>
                      <div className='flex flex-col gap-1'>
                        {dayTasks.map((task, index) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut" }}
                            key={index} 
                            className={cn(
                              'flex gap-1 items-center text-xs',
                              isDarkTheme ? 'text-light/80' : 'text-gray-700'
                            )}>
                            <div className={`w-2 h-2 rounded-full bg-${task.color}-500`} />
                            <p className={cn(
                              'text-sm font-medium',
                              isDarkTheme ? 'text-light/90' : 'text-gray-800'
                            )}>
                              {task.name}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className='flex flex-col gap-1 max-w-32'>
          {tasks.map((task, index) => {
            if (task.complete) return
            return (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                key={index} 
                className={cn(
                'text-xs flex w-full items-center gap-4 transition-all duration-200 hover:translate-x-2',
                isDarkTheme ? 'text-light/80' : 'text-gray-700'
              )}>
              <div className={`min-w-[0.5rem] h-2 rounded-full bg-${task.color}-500 shrink-0`} />
              <p className={cn(
                'text-sm font-medium',
                isDarkTheme ? 'text-light/90' : 'text-gray-800'
              )}>
                {task.name}
              </p>
              </motion.div>
          )})}
        </div>
      </div>
    </motion.div>
  )
}

export default TasksCard
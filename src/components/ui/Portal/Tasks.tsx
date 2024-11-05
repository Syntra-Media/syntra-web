"use client";

import React from 'react'
import { usePortal } from '@/components/providers/PortalProvider';
import { Oval } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/PortalThemeProvider';
import { cn } from '@/lib/utils';

function Tasks() {
  const { favoriteProject, loading } = usePortal();
  const { isDarkTheme } = useTheme();

  if (loading) {
    return (
      <div className={cn(
        'flex w-full h-screen items-center justify-center',
        isDarkTheme ? 'bg-bg-200/20' : 'bg-gray-100'
      )}>
        <Oval
          height={64}
          width={64}
          color="#ffc300"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ffc400"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex w-full h-full overflow-hidden',
        isDarkTheme ? 'bg-bg-200/20' : 'bg-gray-100'
      )}
    >
      <div className='flex flex-col gap-4 mx-6 lg:mx-16 my-16 w-full'>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-4xl font-bold text-primary'
        >
          Görevler
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex flex-col w-full h-full gap-4'
        >
          {favoriteProject?.tasks && favoriteProject?.tasks.length > 0 ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={
                'h-full w-full overflow-hidden'
              }
            >
              <div className="flex w-full h-full rounded-lg">
                <div className="flex w-full h-full gap-4">
                  <div className='grid grid-cols-7 gap-3 h-full w-full overflow-hidden'>
                    {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
                      <div key={day} className={cn(
                        'text-lg font-medium text-left',
                        isDarkTheme ? 'text-light/60' : 'text-gray-500'
                      )}>
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() - date.getDay() + i);
                      const dayTasks = favoriteProject.tasks.filter((task: any) => {
                        const taskEndDate = new Date(task.end_date);
                        return taskEndDate.toDateString() === date.toDateString() && !task.complete;
                      });
                      return (
                        <div
                          key={i}
                          className={cn(
                            'rounded-md p-2 h-full w-full group transition-all duration-200 hover:scale-105 border',
                            isDarkTheme ? 'border-bg-200/60' : 'border-gray-200',
                            date.toDateString() === new Date().toDateString() 
                              ? 'bg-primary-100/20 text-primary-100' 
                              : isDarkTheme 
                                ? 'bg-transparent hover:bg-bg-200/20'
                                : 'bg-transparent hover:bg-gray-100'
                          )}
                        >
                          <div className={cn(
                            'text-lg font-medium',
                            isDarkTheme ? 'text-light/80' : 'text-gray-700'
                          )}>
                            {date.getDate()}
                          </div>
                          {dayTasks.length > 0 && (
                            <>
                              <div className='mt-2 flex flex-col h-min gap-2'>
                                {dayTasks.map((task: any, index: number) => {
                                  let colorClass = task.color ? `bg-${task.color}-500` : 'bg-primary-500';
                                  return (
                                    <div key={index} className={`w-full h-2 rounded-full ${colorClass}`} />
                                  );
                                })}
                              </div>
                              <div className={cn(
                                'absolute z-10 invisible group-hover:visible rounded-lg p-4 shadow-lg -translate-y-full left-0 top-0 w-64',
                                isDarkTheme ? 'bg-bg-100' : 'bg-white'
                              )}>
                                <div className='flex flex-col gap-2'>
                                  {dayTasks.map((task: any, index: number) => (
                                    <div key={index} className={cn(
                                      'flex gap-2 items-center text-sm',
                                      isDarkTheme ? 'text-light/80' : 'text-gray-600'
                                    )}>
                                      <div className={`w-3 h-3 rounded-full bg-${task.color}-500`} />
                                      <p className={cn(
                                        'text-base font-medium',
                                        isDarkTheme ? 'text-light/90' : 'text-gray-800'
                                      )}>
                                        {task.name}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex flex-col gap-2'>
                    {favoriteProject.tasks.map((task: any, index: number) => (
                      <div key={index} className={cn(
                        'text-sm flex items-center gap-4',
                        isDarkTheme ? 'text-light/80' : 'text-gray-600'
                      )}>
                        <div className={`min-w-[0.75rem] h-3 rounded-full bg-${task.color}-500 shrink-0`} />
                        <p className={cn(
                          'text-base font-medium truncate',
                          isDarkTheme ? 'text-light/90' : 'text-gray-800'
                        )}>
                          {task.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                'rounded-xl shadow-lg p-8',
                isDarkTheme 
                  ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/50' 
                  : 'bg-white'
              )}
            >
              <p className={cn(
                'text-center text-lg',
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              )}>
                Henüz görev bulunmamaktadır.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Tasks
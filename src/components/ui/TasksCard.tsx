"use client"

import React from 'react'

function TasksCard({tasks}: {tasks: any[]}) {
  return (
    <div className={"flex w-full h-full bg-bg-200/20 rounded-lg"}>
      <div className={"flex flex-col w-full h-full gap-2 p-3"}>
        <div className='grid grid-cols-7 gap-1 h-full items-center'>
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
            <div key={day} className='text-xs font-medium text-light/60 text-left'>
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + i);
            const dayTasks = tasks.filter(task => 
              new Date(task.due_date).toDateString() === date.toDateString()
            );
            
            return (
              <div
                key={i}
                className={`
                  rounded-md p-1 h-full
                  ${date.toDateString() === new Date().toDateString() 
                    ? 'bg-primary-100/20 text-primary-100' 
                    : 'bg-bg-300/20'
                  }
                  ${dayTasks.length > 0 ? 'ring-1 ring-primary-100' : ''}
                `}
              >
                <div className='text-xs font-medium text-light/80'>
                  {date.getDate()}
                </div>
                {dayTasks.length > 0 && (
                  <div className='mt-1'>
                    <div className='w-full h-1 bg-primary-100 rounded-full' />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default TasksCard
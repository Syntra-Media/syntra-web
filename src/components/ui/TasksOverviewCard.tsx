"use client"

import React, {useMemo} from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const TasksOverviewCard = ({tasks}: {tasks: any}) => {
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
    <div className={"flex w-full h-full bg-bg-200/20 rounded-lg"}>
          <div className={"flex w-full justify-center mx-3 my-3 gap-2"}>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <CircularProgressbar value={progress} text={`${progress}%`} 
                styles={{
                  path: {
                    stroke: '#ffc300',
                  },
                  trail: {
                    stroke: '#ffc30033',
                  },
                  text: {
                    fill: '#ffc300',
                    fontSize: '16px',
                  },
                }}
              />
              <p className='text-xs font-medium text-light/60'>
                İlerleme
              </p>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <CircularProgressbar value={progress} text={`${completedTasks} / ${totalTasks}`} 
                styles={{
                  path: {
                    stroke: '#ffc300',
                  },
                  trail: {
                    stroke: '#ffc30033',
                  },
                  text: {
                    fill: '#ffc300',
                    fontSize: '16px',
                  },
                }}
              />
              <p className='text-xs text-center font-medium text-light/60'>
                Görevler
              </p>
            </div>
          </div>
    </div>
  )
}

export default TasksOverviewCard
"use client";

import { cn } from '@/lib/utils';
import React from 'react';
import { useTheme } from '@/components/providers/PortalThemeProvider';
import { motion } from 'framer-motion';

const PhaseCard = ({phase}: {phase: any}) => {
    const { isDarkTheme } = useTheme();

    return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={cn(
            "flex w-full h-full rounded-lg backdrop-blur border transition-all duration-200 hover:shadow-lg",
        isDarkTheme ? "bg-bg-100/15 border-slate-700/60 hover:bg-bg-100/30" : "bg-gray-100 border-gray-200 hover:bg-gray-200/50"
          )}>
          <div className={"flex w-full mx-3 my-3"}>
              <div className={"flex flex-col gap-1 h-full w-full "}>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className={"text-xl font-bold"}
                >
                  {phase?.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className={cn(
                    "text-xs",
                    isDarkTheme ? "text-light/70" : "text-gray-600"
                  )}
                >
                  {phase?.description}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className={cn(
                    "text-xs",
                    isDarkTheme ? "text-primary/70" : "text-primary"
                  )}
                >
                  Bitmesine {phase?.end_at ? Math.ceil((new Date(phase?.end_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 'N/A'} gün kaldı.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className={"flex mt-auto w-full justify-between relative"}
                >
                  <div className="flex justify-between w-full">
                    <div className={cn(
                      "absolute w-[90%] h-px top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-2 border-dotted",
                      isDarkTheme ? "border-primary/30" : "border-primary/50"
                    )}></div>
                    {phase?.stages.map((stage: any, index: number) => (
                      <motion.div 
                        key={stage.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 + (index * 0.1) }}
                        className={cn(
                          "flex flex-col gap-1",
                          index === 0 ? "items-start" : index === phase.stages.length - 1 ? "items-end text-end" : "items-center text-center"
                        )}
                      >
                        <div className={cn(
                          index === 0 ? "items-start" : index === phase.stages.length - 1 ? "items-end" : "items-center"
                        )}>
                          <div className='w-6 h-6 text-xs text-black font-bold flex items-center justify-center rounded-full bg-primary flex-shrink-0'>
                            {stage.id}
                          </div>
                        </div>
                        <p className='text-xs'>{stage.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
          </div>
        </motion.div>
    );
};

export default PhaseCard;
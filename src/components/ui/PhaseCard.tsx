"use client";

import { cn } from '@/lib/utils';
import React from 'react';

const PhaseCard = ({phase}: {phase: any}) => {
    return (
        <div className={"flex w-full h-full bg-bg-200/20 rounded-lg"}>
          <div className={"flex w-full mx-3 my-3"}>
              <div className={"flex flex-col gap-1 h-full w-full "}>
                <h1 className={"text-xl font-bold"}>{phase.name}</h1>
                <p className={"text-xs text-light/70"}>{phase.description}</p>
                <p className={"text-xs text-primary/70"}>
                  Bitmesine {phase.end_at ? Math.ceil((new Date(phase.end_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 'N/A'} gün kaldı.
                </p>
                <div className={"flex mt-auto w-full justify-between relative"}>
                  <div className="flex justify-between w-full">
                    <div className='absolute w-[90%] h-px  top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-2 border-dotted border-primary/30'></div>
                    {phase.stages.map((stage: any, index: number) => (
                      <div key={stage.id} className={cn(
                        "flex flex-col gap-1",
                        index === 0 ? "items-start" : index === phase.stages.length - 1 ? "items-end text-end" : "items-center text-center"
                      )}>
                        <div className={cn(
                          index === 0 ? "items-start" : index === phase.stages.length - 1 ? "items-end" : "items-center"
                        )}>
                          <div className='w-6 h-6 text-xs text-black font-bold flex items-center justify-center rounded-full bg-primary flex-shrink-0'>
                            {stage.id}
                          </div>
                        </div>
                        <p className='text-xs'>{stage.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
    );
};

export default PhaseCard;
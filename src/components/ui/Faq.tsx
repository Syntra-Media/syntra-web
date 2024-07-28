import React, {useState} from 'react';
import {cn} from "@/utils/cn"
import {ChevronRight} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";

type FaqProps = {
    title: string,
    description: string,
    isActive: boolean,
    className?: string,
}


const Faq = ({title, description, isActive, className}: FaqProps) => {
    return (
        <motion.div
            className={cn("flex flex-col text-light backdrop-blur bg-neutral-900/20 border border-light/10 rounded-lg transition-all duration-300", className)}
        >
            <div className={"flex justify-between m-4"}>
                <p>{title}</p>
                <ChevronRight className={cn("transition-all", isActive ? "rotate-90": "rotate-0")}/>
            </div>
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        className={cn("border-t border-light/10")}
                    >
                        <div className={"w-full h-full"}>
                            <p className={"p-4"}>
                                {description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Faq;
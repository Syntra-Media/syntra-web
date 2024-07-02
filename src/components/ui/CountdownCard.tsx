import React from 'react';
import {motion} from "framer-motion";

type CountdownCardProps = {
    title: string;
    description: string;
    delay?: number
}

const CountdownCard = ({title, description, delay}: CountdownCardProps) => {
    return (
        <motion.div
            className={"w-40 h-40 mobile:w-24 mobile:h-24 border border-light/20 rounded-3xl flex justify-center items-center flex flex-col text-center font-medium"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1.5, delay: delay}}
        >
            <p className={"text-6xl mobile:text-3xl"}>{title}</p>
            <p>{description}</p>
        </motion.div>
    );
};

export default CountdownCard;
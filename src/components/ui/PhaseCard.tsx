"use client";

import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";

const PhaseCard = () => {
    const {data: session} = useSession();

    return (
        <div className={"flex w-full h-full bg-bg-200/20 rounded-lg"}>
        </div>
    );
};

export default PhaseCard;
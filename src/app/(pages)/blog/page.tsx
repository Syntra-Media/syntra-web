"use client";

import React from 'react';
import {useSession} from "next-auth/react";

const Blog = () => {
    const {data: session} = useSession();

    console.log(session);

    return (
        <div>
            test
        </div>
    );
};

export default Blog;
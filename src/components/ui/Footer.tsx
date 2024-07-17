import React from 'react';

const Footer = () => {
    return (
        <div className={"w-full h-60 border-t border-light/20 flex overflow-hidden"}>
            <div className={"flex w-full h-full m-12 justify-between"}>
                <div className={"flex flex-col gap-8 w-full"}>
                    <p className={"text-2xl "}>
                        Syntra Media
                    </p>
                    <p className={"w-2/3 text-light/90"}>
                        We offer customized digital marketing solutions, including web design, SEO, social media management, and content creation, to enhance your online presence and drive business growth.
                    </p>
                </div>
                <div className={"flex flex-col gap-8 w-full items-end"}>
                    <nav className={"flex gap-4 font-medium text-xl uppercase"}>
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Contact</p>
                        <p>Pricing</p>
                    </nav>
                    <p className={"text-light/60 text-sm"}>
                        © 2024 Syntra Media. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Calendar} from "@/components/ui/Calendar";

// Zod doğrulama şeması
const formSchema = z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    companyName: z.string().min(1, { message: "Company Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    meetingPreference: z.enum(["Google Meet", "Phone", "Zoom"]).optional(),
});

const AVAIBLE_HOURS = [
    "15.00",
    "16.00",
    "17.00",
    "18.00",
    "19.00",
    "20.00",
]

const CTASection = () => {
    const [selectedCategory, setCategory] = React.useState<string>("Web Design");
    const [selectedHour, setHour] = React.useState<string | undefined>(undefined);
    const [minBookingDate, setMinBookingDate] = React.useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 2)));
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className={"w-full flex"}>
            <div className={"mx-8 lg:mx-32 my-12 flex flex-col gap-8 w-full h-full"}>
                <h2 className={"text-4xl font-semibold"}>
                    Ready to take the first step? – <span className={"text-primary"}>Let&apos;s Talk!</span>
                </h2>
                <div className={"w-full h-full flex flex-col lg:flex-row gap-x-24"}>
                    <form onSubmit={handleSubmit(onSubmit)} className="text-white w-full h-full flex flex-col">

                        {/* Kategoriler */}
                        <div className="flex space-x-4 mb-6">
                            {["Web Design", "White-hat SEO", "UI/UX Design", "Social Media"].map((category) => (
                                <Button key={category} variant={category === selectedCategory ? "default" : "secondary"}
                                        onClick={() => setCategory(category)}>
                                    {category}
                                </Button>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <div className="flex mb-4 w-full gap-4">
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <Input {...register("fullName")} type="text"
                                       className="w-full p-3 bg-gray-800 text-white rounded-md"
                                       placeholder="Full Name"/>
                                {errors.fullName &&
                                    <p className="text-red-500 text-sm mt-2">{errors.fullName.message?.toString()}</p>}
                            </div>
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">Company Name</label>
                                <Input {...register("companyName")} type="text"
                                       className="w-full p-3 bg-gray-800 text-white rounded-md"
                                       placeholder="Company Name"/>
                                {errors.companyName &&
                                    <p className="text-red-500 text-sm mt-2">{errors.companyName.message?.toString()}</p>}
                            </div>
                        </div>

                        <div className="flex mb-4 w-full gap-4">
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <Input {...register("email")} type="text"
                                       className="w-full p-3 bg-gray-800 text-white rounded-md"
                                       placeholder="Email address"/>
                                {errors.email &&
                                    <p className="text-red-500 text-sm mt-2">{errors.email.message?.toString()}</p>}
                            </div>
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">Meeting Preference</label>
                                <select {...register("meetingPreference")}
                                        className="bg-gray-800 w-full px-3 py-2 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-800 ring-offset-neutral-950 placeholder:text-neutral-400 focus-visible:ring-neutral-300 rounded-md">
                                    <option value="Google Meet">Google Meet</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Zoom">Zoom</option>
                                </select>
                            </div>
                        </div>

                        <div className={"flex w-full justify-start gap-4"}>
                            {
                                AVAIBLE_HOURS.map((hour) => (
                                    <Button type={"button"} key={hour} size={"lg"} variant={hour === selectedHour ? "default" : "secondary"}
                                            onClick={() => setHour(hour)}>
                                        {hour}
                                    </Button>
                                ))
                            }
                        </div>


                        <Button type="submit"
                                className="mt-6 w-max">
                            Book Your FREE Strategy Call
                        </Button>
                    </form>
                    <div className={"w-full flex h-full items-center justify-center"}>
                        <Calendar
                            mode={"single"}
                            className={"w-full h-full"}
                            showOutsideDays={true}
                            onSelect={setDate}
                            selected={minBookingDate}
                            disabled={{ before: minBookingDate as Date, after: new Date(new Date().setDate(new Date().getDate() + 60)) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;

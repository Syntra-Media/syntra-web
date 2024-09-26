"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Calendar} from "@/components/ui/Calendar";

import tr from '@/localization/tr.json'
import en from '@/localization/en.json'

type CategoryKey = 'web_design' | 'seo' | 'ui_ux' | 'socialmedia' | 'other';

// Zod doğrulama şeması
const formSchema = z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    companyName: z.string().min(1, { message: "Company Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    meetingPreference: z.enum(["Google Meet", "Phone", "Zoom"]).optional(),
    avaibleHour: z.string().optional(),
});

const AVAIBLE_HOURS = [
    "15.00",
    "16.00",
    "17.00",
    "18.00",
    "19.00",
    "20.00",
]

const CTASection = ({locale}: {locale: string}) => {
    const [selectedCategory, setCategory] = React.useState<string>("Web Design");
    const [selectedHour, setHour] = React.useState<string | undefined>(undefined);
    const [minBookingDate, setMinBookingDate] = React.useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 2)));
    const [date, setDate] = React.useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 2)));
    const [submitted, setSubmitted] = React.useState<boolean>(false);
    const [selectedLocale, setSelectedLocale] = React.useState(locale === "en" ? en : tr)
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        setButtonDisabled(true);
        fetch("/api/v1/meetings", {
            method: "POST",
            body: JSON.stringify({
                fullName: data.fullName,
                companyName: data.companyName,
                email: data.email,
                meetingPreference: data.meetingPreference,
                avaibleHour: selectedHour,
                date: date,
                category: selectedCategory,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setSubmitted(true);
                }
            })
            .catch((error) => console.error(error));
    };

    return submitted ? (
        <div className={"w-full flex my-24 justify-center"}>
            <h2 className={"text-4xl font-semibold"}>
                {
                    locale === "en" ? (
                        <span>
                            Thank you for your interest! – <span className={"text-primary-100"}>We will contact you soon.</span>
                        </span>
                    ) : (
                        <span>
                            İlginiz için teşekkür ederiz! – <span className={"text-primary-100"}>En kısa sürede sizinle iletişime geçeceğiz.</span>
                        </span>
                    )
                }
            </h2>
        </div>
    ) : (
        <div className={"w-full flex"}>
            <div className={"mx-8 lg:mx-32 my-12 flex flex-col gap-8 w-full h-full"}>
                <h2 className={"text-4xl font-semibold"}>
                    {
                        locale === "en" ? (
                            <span>
                                Ready to take the first step? – <span className={"text-primary-100"}>Let&apos;s Talk!</span>
                            </span>
                        ) : (
                            <span>
                                İlk adımı atmaya hazır mısın? – <span className={"text-primary-100"}>Hadi konuşalım!</span>
                            </span>
                        )
                    }
                </h2>
                <div className={"w-full h-full flex flex-col lg:flex-row gap-x-24 gap-y-12"}>
                    <form onSubmit={handleSubmit(onSubmit)} className="text-white w-full h-full flex flex-col">

                        {/* Kategoriler */}
                        <div className="flex gap-x-4 mb-6 flex-wrap gap-y-4">
                            {Object.keys(selectedLocale.cta.categories).map((category: any) => (
                                <Button type={"button"} key={category} variant={category === selectedCategory ? "default" : "secondary"}
                                        onClick={() => setCategory(category)}>
                                    {selectedLocale.cta.categories[category as CategoryKey]}
                                </Button>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <div className="flex mb-4 w-full gap-4">
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">{selectedLocale.cta.contact.full_name}</label>
                                <Input {...register("fullName")} type="text"
                                       className="w-full p-3 bg-gray-800 text-white rounded-md"
                                       placeholder={selectedLocale.cta.contact.full_name}/>
                                {errors.fullName &&
                                    <p className="text-red-500 text-sm mt-2">{errors.fullName.message?.toString()}</p>}
                            </div>
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">{selectedLocale.cta.contact.company}</label>
                                <Input {...register("companyName")} type="text"
                                       className="w-full p-3 bg-gray-800 text-white rounded-md"
                                       placeholder={selectedLocale.cta.contact.company}/>
                                {errors.companyName &&
                                    <p className="text-red-500 text-sm mt-2">{errors.companyName.message?.toString()}</p>}
                            </div>
                        </div>

                        <div className="flex mb-4 w-full gap-4">
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">{selectedLocale.cta.contact.email}</label>
                                <Input {...register("email")} type="text"
                                       className="w-full p-3 bg-gray-800 text-white rounded-md"
                                       placeholder={selectedLocale.cta.contact.email}/>
                                {errors.email &&
                                    <p className="text-red-500 text-sm mt-2">{errors.email.message?.toString()}</p>}
                            </div>
                            <div className={"flex flex-col w-full"}>
                                <label className="block text-sm font-medium mb-2">{selectedLocale.cta.contact.meeting}</label>
                                <select {...register("meetingPreference")}
                                        className="bg-gray-800 w-full px-3 py-2 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-800 ring-offset-neutral-950 placeholder:text-neutral-400 focus-visible:ring-neutral-300 rounded-md">
                                    <option value="Google Meet">Google Meet</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Zoom">Zoom</option>
                                </select>
                            </div>
                        </div>

                        <div className={"flex w-full justify-start gap-4 flex-wrap"}>
                            {
                                AVAIBLE_HOURS.map((hour) => (
                                    <Button type={"button"} key={hour} size={"lg"} variant={hour === selectedHour ? "default" : "secondary"}
                                            onClick={() => {setHour(hour); setValue("avaibleHour", hour)}}>
                                        {hour}
                                    </Button>
                                ))
                            }
                        </div>


                        <Button type="submit"
                                className="mt-6 w-max"
                                disabled={buttonDisabled}
                        >
                            {selectedLocale.hero.cta_button}
                        </Button>
                    </form>
                    <div className={"w-fit md:w-full flex h-full items-center justify-center"}>
                        <Calendar
                            mode={"single"}
                            className={"w-full h-full"}
                            showOutsideDays={true}
                            onSelect={setDate}
                            selected={date}
                            disabled={{ before: minBookingDate as Date, after: new Date(new Date().setDate(new Date().getDate() + 14)) }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
};

export default CTASection;

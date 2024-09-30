"use client";

import React, { useEffect } from 'react'
import { useAdmin } from '@/components/providers/AdminProvider';
import { toast } from 'react-hot-toast'
import {Oval} from 'react-loader-spinner'
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {approveMeeting, cancelMeeting, declineMeeting, deleteMeeting, getMeetings} from "@/utils/supabaseRequests";
import {useAuth} from "@clerk/nextjs";
import {CircleCheck, CircleX, Loader } from 'lucide-react';

const AdminPage = () => {
    const {user, isLoaded} = useAdmin()
    const {getToken} = useAuth()
    const [meetings, setMeetings] = React.useState<any[]>([]);
    const [seeApproved, setSeeApproved] = React.useState(false);
    const [seeDeclined, setSeeDeclined] = React.useState(false);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        const GetMeetingsDB = async () => {
            const token = await getToken({template: "supabase"});
            const meetings = await getMeetings({ token });

            if (!meetings) {
                toast.error("Error fetching meetings")
                return;
            }

            setMeetings(meetings);
        }
        GetMeetingsDB();
    }, [isLoaded]);

    const handleDelete = (meeting: any) => {
        const DeleteMeetingDB = async () => {
            const token = await getToken({template: "supabase"});
            const deleted = await deleteMeeting({ token, id: meeting.id });

            toast.success("Meeting deleted!")

            setMeetings(meetings.filter((m) => m.id !== meeting.id))
        }
        DeleteMeetingDB();
    }

    const handleCancel = (meeting: any) => {
        const CancelMeetingDB = async () => {
            const token = await getToken({template: "supabase"});
            const canceled = await cancelMeeting({ token, id: meeting.id });

            toast.success("Meeting canceled!")

            setMeetings(meetings.map((m) => {
                if (m.id === meeting.id) {
                    return {...m, status: "waiting"}
                }

                return m;
            }))
        }
        CancelMeetingDB();
    }

    const handleDecline = (meeting: any) => {
        const DeclineMeetingDB = async () => {
            const token = await getToken({template: "supabase"});
            const declined = await declineMeeting({ token, id: meeting.id });

            toast.success("Meeting declined!")

            setMeetings(meetings.map((m) => {
                if (m.id === meeting.id) {
                    return {...m, status: "declined"}
                }

                return m;
            }))
        }
        DeclineMeetingDB();
    }

    const handleApprove = (meeting: any) => {
        const ApproveMeetingDB = async () => {
            const token = await getToken({template: "supabase"});
            const approved = await approveMeeting({ token, id: meeting.id });

            toast.success("Meeting approved!")

            setMeetings(meetings.map((m) => {
                if (m.id === meeting.id) {
                    return {...m, status: "approved"}
                }

                return m;
            }))
        }
        ApproveMeetingDB();
    }


    if (!isLoaded) {
        return (
            <div className={"flex justify-center items-center h-screen"}>
                <Oval color="#10B981" height={100} width={100} />
            </div>
        )
    }

    return (
        <div className={"flex w-full"}>
            <div className={"flex flex-col w-full h-full mt-12 mx-12 gap-4"}>
                <Button className={"w-max"} variant={"secondary"}>
                    <Link href={"/admin"}>
                        Back
                    </Link>
                </Button>
                <div className={"flex justify-between items-center"}>
                    <h1 className={"text-4xl font-bold"}>Meetings</h1>
                    <div className={"flex gap-2"}>
                        <Button variant={"secondary"} onClick={() => setSeeApproved(!seeApproved)}>
                            {
                                seeApproved ? "Hide approved" : "Show approved"
                            }
                        </Button>
                        <Button variant={"secondary"} onClick={() => setSeeDeclined(!seeDeclined)}>
                            {
                                seeDeclined ? "Hide declined" : "Show declined"
                            }
                        </Button>
                    </div>
                </div>
                <div className={"flex flex-col w-full gap-2 mt-4"}>
                    {meetings.map((meeting) => {
                        if (meeting.status !== "waiting" && !seeApproved && !seeDeclined) {
                            return null;
                        }

                        if (seeApproved && meeting.status !== "approved") {
                            return null;
                        }

                        if (seeDeclined && meeting.status !== "declined") {
                            return null;
                        }

                        return (
                            <div key={meeting.id} className={"flex w-full justify-between items-center gap-4 p-4 border border-light/30 rounded-lg"}>
                                <div className={"flex items-center gap-4"}>
                                    <div className={"flex items-center justify-center"}>
                                        {
                                            meeting.status === "waiting" ? (
                                                <Loader size={36} className={"text-orange-500"}/>
                                            ) : meeting.status === "approved" ? (
                                                <CircleCheck size={36} className={"text-green-500"}/>
                                            ) : (
                                                <CircleX size={36} className={"text-red-500"}/>
                                            )
                                        }
                                    </div>
                                    <p className={"text-xl text-light/85"}>
                                       <span className={"font-medium text-light"}>{meeting.name}</span> <span className={"text-light/70 font-base text-sm"}>({meeting.email})</span> from <span className={"font-medium text-light"}>{meeting.company}</span> wants to meet you at {meeting.meeting}
                                    </p>
                                </div>
                                <div className={"flex gap-4 items-center"}>
                                    <div className={"text-light/90 text-sm"}>
                                        {meeting.date} at {meeting.time} | {meeting.type}
                                    </div>
                                    {
                                        meeting.status === "waiting" && (
                                            <div className={"flex gap-4"}>
                                                <Button variant={"secondary"} onClick={() => handleApprove(meeting)}>
                                                    Approve
                                                </Button>
                                                <Button variant={"secondary"} onClick={() => handleDecline(meeting)}>
                                                    Decline
                                                </Button>
                                            </div>
                                        )
                                    }

                                    {
                                        meeting.status === "approved" && (
                                            <div className={"flex gap-4"}>
                                                <Button variant={"secondary"} onClick={() => handleCancel(meeting)}>
                                                    Cancel
                                                </Button>
                                                <Button variant={"secondary"} onClick={() => handleDelete(meeting)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        )
                                    }

                                    {
                                        meeting.status === "declined" && (
                                            <div className={"flex gap-4"}>
                                                <Button variant={"secondary"} onClick={() => handleCancel(meeting)}>
                                                    Cancel
                                                </Button>
                                                <Button variant={"secondary"} onClick={() => handleDelete(meeting)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminPage
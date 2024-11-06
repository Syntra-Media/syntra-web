import {ClerkProvider, SignUp} from '@clerk/nextjs'

export default function Page() {
    return (
        <ClerkProvider>
            <div className={"w-full h-screen flex justify-center items-center"}>
                <SignUp
                    appearance={{
                        elements: {
                            footer: {
                                display: "none",
                            }
                        }
                    }}
                />
            </div>
        </ClerkProvider>
    )
}
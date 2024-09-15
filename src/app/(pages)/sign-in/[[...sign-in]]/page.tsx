import {ClerkProvider, SignIn} from '@clerk/nextjs'

export default function Page() {
    return (
        <ClerkProvider>
            <div className={"w-full h-screen flex justify-center items-center"}>
                <SignIn
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
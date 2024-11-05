import NewProjectContent from "@/components/ui/AdminContent/NewProjectContent";
import { clerkClient } from "@clerk/nextjs/server";

export default async function NewProject() {
  const client = await clerkClient();
  const users = await client.users.getUserList();
  
  const serializedUsers = JSON.parse(JSON.stringify(
    users.data.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      avatar: user.imageUrl,
    }))
  ));

  return (
    <div className="flex flex-col gap-4 p-16 min-h-screen">
      <NewProjectContent users={serializedUsers} />
    </div>
  );
}


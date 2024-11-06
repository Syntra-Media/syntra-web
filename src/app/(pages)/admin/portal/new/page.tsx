import NewProjectContent from "@/components/ui/AdminContent/NewProjectContent";
import { clerkClient } from "@clerk/nextjs/server";

export default async function NewProject() {
  try {
    const users = await clerkClient.users.getUserList();
    
    if (!users.data || users.data.length === 0) {
      console.error('No user data received from Clerk');
      return (
        <div className="flex flex-col gap-4 p-16 min-h-screen">
          <p>Error loading users. Please try again later.</p>
        </div>
      );
    }

    const serializedUsers = users.data.map(user => ({
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      avatar: user.imageUrl,
    }));

    return (
      <div className="flex flex-col gap-4 p-16 min-h-screen">
        <NewProjectContent users={serializedUsers} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return (
      <div className="flex flex-col gap-4 p-16 min-h-screen">
        <p>Error loading users. Please try again later.</p>
      </div>
    );
  }
}


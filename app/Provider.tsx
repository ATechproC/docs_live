'use client';

import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.action';
import { useUser } from '@clerk/nextjs';
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        try {
          const users = await getClerkUsers({ userIds });
          return users;
        } catch (error) {
          console.error('Failed to resolve users:', error);
          return [];
        }
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        try {
          // Check if user data is available
          if (!clerkUser?.emailAddresses[0]?.emailAddress) {
            console.warn("User email not available for mention suggestions");
            return [];
          }

          const roomUsers = await getDocumentUsers({
            roomId,
            currentUser: clerkUser.emailAddresses[0].emailAddress,
            text,
          });

          // Transform the data into the format Liveblocks expects
          // Liveblocks expects an array of { id: string, name: string } objects
          return roomUsers.map(user => ({
            id: user.id, // Make sure this matches the user IDs from resolveUsers
            name: user.name || user.email || 'Unknown User', // Fallback names
            // You can also add avatar if your component supports it:
            // avatar: user.avatarUrl,
          }));

        } catch (error) {
          console.error("Failed to fetch mention suggestions:", error);
          // Return empty array instead of throwing to keep the editor functional
          return [];
        }
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider;
// hooks/useUser.ts
import { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

// Adjust the KindeUser type to allow for nullable fields
type KindeUser = {
  id: string;
  email: string | null; // Allow email to be null
  // Add other fields if needed
};

type KindeUserType = KindeUser | null; // The state can be either a KindeUser or null

export const useUser = () => {
  const { getUser } = useKindeBrowserClient(); // Access getUser function from Kinde
  const [user, setUser] = useState<KindeUserType>(null); // State for the user, initially null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Set loading to true before fetching user
      try {
        const userData = await getUser(); // Assuming getUser is async, wait for the user data
        setUser(userData); // Set the user data once fetched
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Set loading to false after the operation is done
      }
    };

    fetchUser(); // Call the async function inside useEffect
  }, [getUser]);

  return { user, loading }; // Return both user and loading state
};

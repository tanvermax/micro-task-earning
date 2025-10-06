import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './Authprovider';
import axios from 'axios';

const useProfile = () => {
    const auth = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (auth?.user?.email) {
                try {
                    setLoading(true);
                    console.log("Fetching profile for:", auth.user.email);
                    const response = await axios.get(`https://micro-task-server-plum.vercel.app/user/me?email=${auth.user.email}`);
                    setUserData(response.data);
                } catch (err) {
                    console.error("Error fetching user profile:", err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [auth?.user?.email]); // Re-fetch when email changes

    return { userData, loading, error };
};

export default useProfile;
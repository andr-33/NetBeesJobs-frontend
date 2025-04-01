import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext"; 
import axios from "axios";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";

const UserProfilePage = () => {
    const [userInfo, setUserInfo]=useState();
    const { accessToken } = useAuth();
    const { notification, closeNotification, updateNotification, openNotification } = useNotification();
    
    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await axios.get('/api/users/user-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error: ',error.message);
                updateNotification("No pudimos obtener tu información", 'error');
                openNotification();
            }
        };
        fetchUserInformation();
    }, []);

    return (
        <>

            <SlideUpNotification 
                message={notification.message}
                open={notification.open}
                type={notification.type}
                handleClose={closeNotification}
            />
        </>
    );
};

export default () => (
    <NotificationProvider>
        <UserProfilePage />
    </NotificationProvider>
);
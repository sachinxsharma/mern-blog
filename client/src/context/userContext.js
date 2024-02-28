import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const storedUser = localStorage.getItem('user');
    const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    useEffect(() => {
        if(currentUser)
            localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>;
};

export default UserProvider;

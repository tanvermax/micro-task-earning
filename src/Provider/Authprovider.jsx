import { createContext, useState } from "react";
import { app } from "../Firebase/Firebase.init";


export const AuthContext= createContext(null);

const Authprovider = ({children}) => {

    const auth = getAuth(app);
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);



    const authinfo={
        user,loading
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default Authprovider;
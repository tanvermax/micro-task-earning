import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useaxiospublic from "../Axios/useaxiospublic";
const googleprovider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiospublic = useaxiospublic();

  const handlnewuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginwithemail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handlegooglelogin = () => {
    return signInWithPopup(auth, googleprovider);
  };

  const handlelogout = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state capture", currentUser);
      if (currentUser) {
        const userinfo = {email : currentUser.email}
        axiospublic.post("/jwt",userinfo)
        .then(res=>{
          if (res.data.token) {
            localStorage.setItem('access-token',res.data.token)
          }
        })
      }
      else{
        localStorage.removeItem('access-token')
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  });

  const authinfo = {
    user,
    loading,
    handlnewuser,
    handlegooglelogin,
    loginwithemail,
    handlelogout,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;

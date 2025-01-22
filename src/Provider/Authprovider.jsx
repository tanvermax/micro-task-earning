import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

  const deleteUser1 = () => {
    return deleteUser(user);
  };

  const updateUser = async (updatedData) => {
    await updateProfile(auth.currentUser, updatedData);
    setUser({...auth.currentUser});
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("state capture", currentUser);
      if (currentUser) {
        setUser(currentUser);

        setLoading(false);
        const userinfo = { email: currentUser.email };
        axiospublic.post("/jwt", userinfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        setLoading(false);
        setUser(null);
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiospublic, user]);

  const authinfo = {
    user,
    loading,
    handlnewuser,
    handlegooglelogin,
    loginwithemail,
    handlelogout,
    deleteUser1,
    setUser,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;

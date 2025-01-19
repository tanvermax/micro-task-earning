// import React from 'react';
// import useAuth from '../Provider/useAuth';
// import { Navigate, useLocation } from 'react-router-dom';

// const privetRouts = ({children}) => {
//     const {user,loading} = useAuth();
//     const location= useLocation();

//     if (loading) {
//         return <span className="loading loading-spinner text-success"></span>;
//     }
//     if (user) {
//         return children;
//     }
//     return <Navigate to={"/login"} state={{from:location}} replace></Navigate>
// };

// export default privetRouts;
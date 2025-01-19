import { useLocation } from "react-router-dom";
import useAuth from "../../Provider/useAuth";
import useAdmin from "./useAdmin";

const AdminRouts = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [user,loading] = useAuth();
    const location= useLocation();

    if (loading || isAdminLoading) {
        return <span className="loading loading-spinner text-success"></span>;
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={"/login"} state={{from:location}} replace></Navigate>
};

export default AdminRouts;
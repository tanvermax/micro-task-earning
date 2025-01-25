import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Notification = () => {
  // const [selectedSubmission, setSelectedSubmission] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const response = await axiosSecure.get(`/transit`);

      // Filter submissions to include only "pending" status
      // (Assuming your data has a "status" property)
      return response.data.filter(
        (submission) => submission.status === "pending"
      );
    },
  });
  return (
    <div className="items-center  lg:w-32 relative -left-11 lg:block">
      <div>
        
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">{submissions.length}</span>
          <button ><IoIosNotifications className="ml-10 lg:text-5xl" /></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;

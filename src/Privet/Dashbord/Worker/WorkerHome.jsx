
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import userMange from "../userMange";
import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
const WorkerHome = () => {
  const { user } = useAuth(); 
  // Get logged-in user info
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [],refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/totoalsubmitted");
      // console.log("API Response:", response.data); // Log API response
      return response.data;
    },
  });
  const [userData] = userMange();

  // Fetch worker submissions
  // console.log(submissions);
  // console.log("hello");
  
  // console.log(userData);
  
  

//   console.log(userData.coins);
//   console.log(user.coins);
  

  // Filter submissions
  const pendingSubmissions = submissions.filter(
    (sub) => sub.status === "pending"
  );
  const approvedSubmissions = submissions.filter(
    (sub) => sub.status === "approve"
  );

    const totalApprovedCoins = approvedSubmissions.reduce(
      (sum, sub) => sum + Number(sub.payable_amount),
      0
    );

  // Calculate stats
  const totalSubmissions = submissions.length;
  const totalPendingSubmissions = pendingSubmissions.length;
  const totalEarnings = approvedSubmissions.reduce(
    (sum, sub) => sum + Number(sub.payable_amount),
    0
  );

  const totalusercoin = totalEarnings + userData.coins;
  // console.log(totalusercoin);

 

  

  return (
    <div className="container mx-auto lg:p-5 p-2">
      <h1 className="lg:text-sm text-[8px] font-bold mb-5">Worker Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className=" lg:p-5 p-3 rounded shadow">
          <h2 className="lg:text-sm text-[8px] font-bold">Total Submissions</h2>
          <p className="lg:text-sm text-[8px]">{totalSubmissions}</p>
        </div>
        <div className=" lg:p-5 p-3 rounded shadow">
          <h2 className="lg:text-sm text-[8px] font-bold">Pending Submissions</h2>
          <p className="lg:text-sm text-[8px]">{totalPendingSubmissions}</p>
        </div>
        <div className=" lg:p-5 p-3 rounded shadow">
          <h2 className="lg:text-sm text-[8px] font-bold">Total Earnings</h2>
          <button
            
            className="lg:text-sm text-[8px]"
          >
            ${totalEarnings.toFixed(2)}{" "}
           {" "}
          </button>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className=" p-5 rounded shadow mb-10 overflow-scroll">
        <h2 className="text-lg font-bold mb-5">Approved Submissions</h2>
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr>
              <th className="border-b py-2 lg:text-base text-[8px]">Task Title</th>
              <th className="border-b py-2  lg:text-base text-[8px]">earn Amount coin </th>
              <th className="border-b py-2 lg:text-base text-[8px]">Buyer Name</th>
              <th className="border-b py-2 lg:text-base text-[8px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2 lg:text-base text-[8px]">{submission.task_title}</td>
                <td className="border-b py-2 lg:text-base text-[8px]">${submission.payable_amount}</td>
                <td className="border-b py-2 lg:text-base text-[8px]">{submission.ownername}</td>
                <td className="border-b py-2 lg:text-base text-[8px]">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Submissions Table */}
      <div className=" p-5 rounded shadow">
        <h2 className="text-lg font-bold mb-5">Pending Submissions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2  lg:text-base text-[8px]">Task Title</th>
              <th className="border-b py-2 lg:text-base text-[8px]">Payable Amount</th>
              <th className="border-b py-2 lg:text-base text-[8px]">Buyer Name</th>
              <th className="border-b py-2 lg:text-base text-[8px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2 lg:text-base text-[8px]">{submission.task_title}</td>
                <td className="border-b py-2 lg:text-base text-[8px]">${submission.payable_amount}</td>
                <td className="border-b py-2 lg:text-base text-[8px]">{submission.buyer_name}</td>
                <td className="border-b py-2 lg:text-base text-[8px]">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;

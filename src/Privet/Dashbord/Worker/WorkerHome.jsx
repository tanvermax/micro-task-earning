import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import userMange from "../userMange";
import { useQuery } from "@tanstack/react-query";

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [] } = useQuery({
    queryKey: ["workerSubmissions", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/totoalsubmitted/${user.email}`);
      return response.data;
    },
  });

  const [userData] = userMange();

  const pendingSubmissions = submissions.filter((sub) => sub.status === "pending");
  const approvedSubmissions = submissions.filter((sub) => sub.status === "approve");

  const totalEarnings = approvedSubmissions.reduce(
    (sum, sub) => sum + Number(sub.payable_amount),
    0
  );

  const totalSubmissions = submissions.length;
  const totalPendingSubmissions = pendingSubmissions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8 text-center">
          Worker Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg text-center">
            <h2 className="text-gray-500 text-sm lg:text-base font-medium">Total Submissions</h2>
            <p className="text-2xl font-bold text-gray-800">{totalSubmissions}</p>
          </div>
          <div className="p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg text-center">
            <h2 className="text-gray-500 text-sm lg:text-base font-medium">Pending Submissions</h2>
            <p className="text-2xl font-bold text-yellow-500">{totalPendingSubmissions}</p>
          </div>
          <div className="p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg text-center">
            <h2 className="text-gray-500 text-sm lg:text-base font-medium">Total Earnings</h2>
            <p className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Approved Submissions */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 mb-10 overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-green-600">✅ Approved Submissions</h2>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-green-50">
              <tr>
                {[
                  "Task Title",
                  "Payable Amount",
                  "Status",
                  "Buyer Email",
                  "Worker Email",
                  "Worker Name",
                  "Submission Details",
                  "Task ID",
                  "Current Date",
                ].map((heading) => (
                  <th key={heading} className="border-b py-3 px-4 text-left font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions.map((submission, idx) => (
                <tr
                  key={submission._id}
                  className={`transition hover:bg-green-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4">{submission.task_title}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">
                    ${submission.payable_amount}
                  </td>
                  <td className="py-2 px-4 capitalize">{submission.status}</td>
                  <td className="py-2 px-4">{submission.Buyer_email}</td>
                  <td className="py-2 px-4">{submission.worker_email}</td>
                  <td className="py-2 px-4">{submission.worker_name}</td>
                  <td className="py-2 px-4">{submission.submission_details}</td>
                  <td className="py-2 px-4">{submission.task_id}</td>
                  <td className="py-2 px-4">{submission.current_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending Submissions */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">⏳ Pending Submissions</h2>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-yellow-50">
              <tr>
                {[
                  "Task Title",
                  "Payable Amount",
                  "Worker Name",
                  "Worker Email",
                  "Buyer Email",
                  "Submission Details",
                  "Task ID",
                  "Current Date",
                  "Status",
                ].map((heading) => (
                  <th key={heading} className="border-b py-3 px-4 text-left font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map((submission, idx) => (
                <tr
                  key={submission._id}
                  className={`transition hover:bg-yellow-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4">{submission.task_title}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">
                    ${submission.payable_amount}
                  </td>
                  <td className="py-2 px-4">{submission.worker_name}</td>
                  <td className="py-2 px-4">{submission.worker_email}</td>
                  <td className="py-2 px-4">{submission.Buyer_email}</td>
                  <td className="py-2 px-4">{submission.submission_details}</td>
                  <td className="py-2 px-4">{submission.task_id}</td>
                  <td className="py-2 px-4">{submission.current_date}</td>
                  <td className="py-2 px-4 capitalize">{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Erro = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
        <motion.h1
          className="text-9xl font-bold text-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="px-6 py-3 text-lg font-semibold bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    );
};

export default Erro;
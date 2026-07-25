import { motion } from "framer-motion";

function Stats() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-10">

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-5xl font-bold text-blue-600">
          50K+
        </h1>

        <p className="text-gray-500 mt-3">
          Active Users
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-5xl font-bold text-green-500">
          95%
        </h1>

        <p className="text-gray-500 mt-3">
          ATS Accuracy
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-5xl font-bold text-purple-500">
          1M+
        </h1>

        <p className="text-gray-500 mt-3">
          Resumes Analyzed
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-5xl font-bold text-orange-500">
          4.9★
        </h1>

        <p className="text-gray-500 mt-3">
          User Rating
        </p>
      </motion.div>

    </div>
  );
}

export default Stats;
import { motion } from "framer-motion";

function ATSCard() {
  return (

    <motion.div
      className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-[430px]"
      animate={{y:[0,-15,0]}}
      transition={{duration:3,repeat:Infinity}}
    >

      <h1 className="text-3xl font-bold text-blue-800">
        ATS Score
      </h1>

      <h1 className="text-7xl text-green-500 font-bold mt-5">
        85%
      </h1>

      <div className="space-y-5 mt-8">

        <div>
          <div className="flex justify-between">
            <span>Skills</span>
            <span>90%</span>
          </div>

          <div className="bg-gray-200 h-3 rounded-full mt-2">
            <div className="bg-green-500 h-3 rounded-full w-[90%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span>Keywords</span>
            <span>80%</span>
          </div>

          <div className="bg-gray-200 h-3 rounded-full mt-2">
            <div className="bg-blue-500 h-3 rounded-full w-[80%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span>Formatting</span>
            <span>85%</span>
          </div>

          <div className="bg-gray-200 h-3 rounded-full mt-2">
            <div className="bg-purple-500 h-3 rounded-full w-[85%]"></div>
          </div>
        </div>

      </div>

    </motion.div>

  );
}

export default ATSCard;
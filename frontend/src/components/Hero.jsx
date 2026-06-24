import ATSCard from "./ATSCard";
import { motion } from "framer-motion";

function Hero() {
  return (
   <div className="max-w-7xl mx-auto px-20 pt-24 flex items-center justify-between gap-20">

      {/* Left Side */}
      <motion.div
  className="w-full lg:w-1/2 ml-10"
        initial={{x:-100,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:1}}
      >

        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
          <span className="text-blue-600"> Resume </span>
          With AI
        </h1>

        <p className="mt-8 text-xl text-gray-600 leading-9">
          Get ATS score, keyword analysis,
          professional suggestions and premium
          resume templates instantly.
        </p>

        <div className="mt-10 flex gap-6">

          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-blue-700">
            Upload Resume
          </button>

          <button className="border-2 border-blue-600 px-8 py-4 rounded-2xl text-blue-600">
            Explore Templates
          </button>

        </div>

        <div className="flex gap-10 mt-12">

          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              50K+
            </h1>
            <p className="text-gray-500">
              Users
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              95%
            </h1>
            <p className="text-gray-500">
              ATS Accuracy
            </p>
          </div>

        </div>

      </motion.div>

      {/* Right Side */}
      <ATSCard />

    </div>
  );
}

export default Hero;
import { motion } from "framer-motion";

function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto mt-40">

      <h1 className="text-5xl font-bold text-center text-slate-900">
        What Users Say
      </h1>

      <p className="text-center text-gray-500 text-xl mt-4">
        Trusted by thousands of professionals.
      </p>

      <div className="grid grid-cols-3 gap-10 mt-20">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
        >
          <h1 className="text-yellow-500 text-2xl">★★★★★</h1>

          <p className="text-gray-600 mt-6 leading-8">
            The AI suggestions improved my resume and helped me secure interviews.
          </p>

          <h1 className="mt-8 text-2xl font-bold text-blue-700">
            Pratik
          </h1>

          <p className="text-gray-500">
            Software Developer
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
        >
          <h1 className="text-yellow-500 text-2xl">★★★★★</h1>

          <p className="text-gray-600 mt-6 leading-8">
            ATS score and keyword analysis were extremely useful.
          </p>

          <h1 className="mt-8 text-2xl font-bold text-purple-700">
            Rahul
          </h1>

          <p className="text-gray-500">
            Full Stack Developer
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
        >
          <h1 className="text-yellow-500 text-2xl">★★★★★</h1>

          <p className="text-gray-600 mt-6 leading-8">
            Premium templates made my resume look professional.
          </p>

          <h1 className="mt-8 text-2xl font-bold text-green-700">
            Amit
          </h1>

          <p className="text-gray-500">
            UI/UX Designer
          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Testimonials;
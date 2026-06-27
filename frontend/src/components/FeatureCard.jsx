import { motion } from "framer-motion";

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-[350px]"
    >
      <div className="text-5xl">{icon}</div>

      <h1 className="text-2xl font-bold text-slate-800 mt-6">
        {title}
      </h1>

      <p className="text-gray-500 mt-4 leading-8">
        {desc}
      </p>
    </motion.div>
  );
}

export default FeatureCard;
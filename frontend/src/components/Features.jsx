import FeatureCard from "./FeatureCard";
import { FaRobot } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { MdWork } from "react-icons/md";

function Features() {
  return (
    <div className="max-w-7xl mx-auto mt-40">

      <h1 className="text-center text-5xl font-bold text-slate-900">
        Powerful Features
      </h1>

      <p className="text-center text-gray-500 mt-5 text-xl">
        Everything you need to optimize your resume.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-16">

        <FeatureCard
          icon={<FaRobot className="text-blue-600" />}
          title="AI Analysis"
          desc="Get ATS score, keyword analysis and professional suggestions."
        />

        <FeatureCard
          icon={<HiDocumentText className="text-purple-600" />}
          title="Resume Templates"
          desc="Choose from premium ATS-friendly resume templates."
        />

        <FeatureCard
          icon={<MdWork className="text-green-600" />}
          title="Job Matching"
          desc="Compare your resume with job descriptions instantly."
        />

      </div>

    </div>
  );
}

export default Features;
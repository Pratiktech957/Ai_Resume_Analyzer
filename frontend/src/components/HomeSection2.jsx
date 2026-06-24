import Features from "./Features";
import Stats from "./Stats";

function HomeSection2() {
  return (
    <div className="max-w-7xl mx-auto mt-40">

     <div className="grid lg:grid-cols-2 gap-32 items-start">
        {/* Left */}
        <div>
          <Features />
        </div>

        {/* Right */}
        <div>

          <div className="bg-white rounded-3xl p-10 shadow-2xl">

            <h1 className="text-4xl font-bold text-slate-900">
              Trusted by Professionals
            </h1>

            <p className="text-gray-500 mt-4 leading-8">
              More than 50,000 users have improved their resumes with our AI system.
            </p>

            <div className="mt-10">

              <Stats />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HomeSection2;
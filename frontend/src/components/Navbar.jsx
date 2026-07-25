function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
      <h1 className="text-3xl font-bold text-blue-700">
        AI Resume Analyzer
      </h1>

      <ul className="flex gap-8 text-gray-700 font-medium">
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>About</li>
      </ul>

      <div className="flex gap-4">
        <button className="px-5 py-2 border border-blue-600 rounded-lg text-blue-600">
          Login
        </button>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
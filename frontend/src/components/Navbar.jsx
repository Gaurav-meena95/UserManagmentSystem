export function Navbar({ darkMode, onToggle }) {
  return (
    <nav className={`px-6 py-4 flex items-center justify-between ${darkMode ? "bg-gray-900 border-b border-gray-700" : "bg-blue-500"}`}>
      <h1 className="text-white text-xl font-semibold tracking-wide">
        User Management App
      </h1>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
          darkMode
            ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
            : "bg-blue-400 text-white hover:bg-blue-300"
        }`}
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </nav>
  );
}
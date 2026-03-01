export function Navbar({ darkMode, onToggle }) {
  return (
    <nav className={`px-4 sm:px-6 py-4 flex items-center justify-between ${darkMode ? "bg-gray-900 border-b border-gray-700" : "bg-blue-500"}`}>
      <h1 className="text-white text-base sm:text-xl font-semibold tracking-wide truncate">
         User Management App
      </h1>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition flex-shrink-0 ml-2 ${
          darkMode
            ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
            : "bg-blue-400 text-white hover:bg-blue-300"
        }`}
      >
        {darkMode ? " Light mode" : " Dark mode"}
      </button>
    </nav>
  );
}

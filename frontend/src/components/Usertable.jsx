export function UserTable({ users, darkMode, onUpdate, onDelete, onView }) {
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={`border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
            {["User First Name", "User Last Name", "User Email Id", "Actions"].map((heading) => (
              <th
                key={heading}
                className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user.id}
              className={`border-b transition-colors ${
                darkMode
                  ? `border-gray-700 ${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-950"} hover:bg-gray-800`
                  : `border-gray-100 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`
              }`}
            >
              <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{user.firstName}</td>
              <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{user.lastName}</td>
              <td className={`px-6 py-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{user.email}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2 ">
                  <button
                    onClick={() => onUpdate(user)}
                    className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 hover:bg-red-400 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onView(user)}
                    className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className={`px-6 py-10 text-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                No users found. Add one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export function UserTable({ users, darkMode, onUpdate, onDelete, onView }) {
  if (users.length === 0) {
    return (
      <div
        className={`rounded-xl border p-12 text-center ${
          darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
        }`}
      >
        <p className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          No users found. Add one!
        </p>
      </div>
    );
  }

  return (
    <>
    
      <div
        className={`hidden md:block rounded-lg overflow-hidden shadow-lg border ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
              }`}
            >
              {["First Name", "Last Name", "Email", "Actions"].map((heading) => (
                <th
                  key={heading}
                  className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
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
                    ? `border-gray-700 ${
                        idx % 2 === 0 ? "bg-gray-900" : "bg-gray-950"
                      } hover:bg-gray-800`
                    : `border-gray-100 ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50`
                }`}
              >
                <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {user.firstName}
                </td>
                <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {user.lastName}
                </td>
                <td className={`px-6 py-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdate(user)}
                      className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-1.5 rounded text-sm font-medium transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 hover:bg-red-400 text-white px-4 py-1.5 rounded text-sm font-medium transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onView(user)}
                      className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1.5 rounded text-sm font-medium transition"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className={`rounded-xl p-4 border shadow-sm ${
              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>

              <div className="min-w-0">
                <p className={`font-semibold truncate ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {user.firstName} {user.lastName}
                </p>
                <p className={`text-sm truncate ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onUpdate(user)}
                className="flex-1 bg-teal-500 hover:bg-teal-400 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Delete
              </button>
              <button
                onClick={() => onView(user)}
                className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
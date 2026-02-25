export function UserModal({ darkMode, modalMode, selectedUser, form, onFormChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`rounded-xl shadow-2xl w-full max-w-md p-6 border ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <h3 className={`text-xl font-semibold mb-5 capitalize ${darkMode ? "text-white" : "text-gray-800"}`}>
          {modalMode === "add" ? "Add User" : modalMode === "update" ? "Update User" : "View User"}
        </h3>

        {modalMode === "view" ? (
          <div className="space-y-4">
            {[["First Name", selectedUser.firstName], ["Last Name", selectedUser.lastName], ["Email", selectedUser.email]].map(([label, val]) => (
              <div key={label} className={`p-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
                <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{val}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Email", key: "email" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{label}</label>
                <input
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                  value={form[key]}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  onChange={(e) => onFormChange({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          {modalMode !== "view" && (
            <button
              onClick={onSubmit}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition shadow"
            >
              {modalMode === "add" ? "Add User" : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
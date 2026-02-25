import { useState } from "react";



function UserManagementApp() {

    const initialUsers = [
  { id: 1, firstName: "Gautam", lastName: "Sharma", email: "geekygautam1997@gmail.com" },
  { id: 2, firstName: "Tim", lastName: "Southee", email: "TimSouthee@gmail.com" },
  { id: 3, firstName: "Kane", lastName: "Williamson", email: "kane@gmail.com" },
  { id: 4, firstName: "Martin", lastName: "Guptill", email: "Marin@gmail.com" },
];


  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [darkMode, setDarkMode] = useState(true);

  const openAdd = () => {
    setForm({ firstName: "", lastName: "", email: "" });
    setModalMode("add");
    setShowModal(true);
  };

  const openUpdate = (user) => {
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    setSelectedUser(user);
    setModalMode("update");
    setShowModal(true);
  };

  const openView = (user) => {
    setSelectedUser(user);
    setModalMode("view");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      setUsers([...users, { id: Date.now(), ...form }]);
    } else if (modalMode === "update") {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...form } : u)));
    }
    setShowModal(false);
  };

  const dm = darkMode;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dm ? "bg-gray-950" : "bg-gray-100"}`}>

      <nav className={`px-6 py-4 flex items-center justify-between ${dm ? "bg-gray-900 border-b border-gray-700" : "bg-blue-500"}`}>
        <h1 className="text-white text-xl font-semibold tracking-wide">
           User Management App
        </h1>

        <button
          onClick={() => setDarkMode(!dm)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
            dm
              ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
              : "bg-blue-400 text-white hover:bg-blue-300"
          }`}
        >
          {dm ? " Light" : " Dark"}
        </button>
      </nav>



      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className={`text-3xl font-bold text-center mb-6 ${dm ? "text-white" : "text-gray-800"}`}>
          Users List
        </h2>

        <button
          onClick={openAdd}
          className={`mb-6 font-medium px-5 py-2 rounded transition text-white ${
            dm ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          + Add User
        </button>


        <div className={`rounded-lg overflow-hidden shadow-lg border ${dm ? "border-gray-700" : "border-gray-200"}`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${dm ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                <th className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${dm ? "text-gray-300" : "text-gray-600"}`}>User First Name</th>
                <th className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${dm ? "text-gray-300" : "text-gray-600"}`}>User Last Name</th>
                <th className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${dm ? "text-gray-300" : "text-gray-600"}`}>User Email Id</th>
                <th className={`px-6 py-4 font-semibold text-sm uppercase tracking-wider ${dm ? "text-gray-300" : "text-gray-600"}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`border-b transition-colors ${
                    dm
                      ? `border-gray-700 ${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-950"} hover:bg-gray-800`
                      : `border-gray-100 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`
                  }`}
                >
                  <td className={`px-6 py-4 ${dm ? "text-gray-200" : "text-gray-700"}`}>{user.firstName}</td>
                  <td className={`px-6 py-4 ${dm ? "text-gray-200" : "text-gray-700"}`}>{user.lastName}</td>
                  <td className={`px-6 py-4 ${dm ? "text-blue-400" : "text-blue-600"}`}>{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openUpdate(user)}
                        className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openView(user)}
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
                  <td colSpan={4} className={`px-6 py-10 text-center ${dm ? "text-gray-500" : "text-gray-400"}`}>
                    No users found. Add one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-xl shadow-2xl w-full max-w-md p-6 border ${
            dm ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <h3 className={`text-xl font-semibold mb-5 capitalize ${dm ? "text-white" : "text-gray-800"}`}>
              {modalMode === "add" ? " Add User" : modalMode === "update" ? " Update User" : " View User"}
            </h3>

            {modalMode === "view" ? (
              <div className="space-y-4">
                {[["First Name", selectedUser.firstName], ["Last Name", selectedUser.lastName], ["Email", selectedUser.email]].map(([label, val]) => (
                  <div key={label} className={`p-3 rounded-lg ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dm ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
                    <p className={`font-medium ${dm ? "text-gray-100" : "text-gray-800"}`}>{val}</p>
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
                    <label className={`block text-sm font-medium mb-1 ${dm ? "text-gray-300" : "text-gray-600"}`}>{label}</label>
                    <input
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        dm
                          ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                      value={form[key]}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  dm
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              {modalMode !== "view" && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition shadow"
                >
                  {modalMode === "add" ? "Add User" : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default UserManagementApp
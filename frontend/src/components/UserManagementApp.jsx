

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserTable } from "./Usertable";
import { UserModal } from "./Usermodal";



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

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-gray-100"}`}>
      
      <NavLink darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Users List
        </h2>

        <button
          onClick={openAdd}
          className={`mb-6 font-medium px-5 py-2 rounded transition text-white ${
            darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          + Add User
        </button>

        <UserTable
          users={users}
          darkMode={darkMode}
          onUpdate={openUpdate}
          onDelete={handleDelete}
          onView={openView}
        />
      </div>

      {showModal && (
        <UserModal
          darkMode={darkMode}
          modalMode={modalMode}
          selectedUser={selectedUser}
          form={form}
          onFormChange={setForm}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default UserManagementApp;
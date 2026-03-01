

import { useState,useEffect } from "react";
import { Navbar } from "./Navbar";
import { UserTable } from "./Usertable";
import { UserModal } from "./Usermodal";
import { createUser, deleteUser, getAlluser, updateUser } from "../services/userService";



function UserManagementApp() {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [darkMode, setDarkMode] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAlluser();
  }, []);

  const fetchAlluser = async () => {
    try {
      setLoading(true)
      const data = await getAlluser()
      setUsers(data)

    } catch (error) {
      console.log(error)
      alert('Could not load users. Is Flask running?')

    }
    finally {
      setLoading(false)
    }
  }

  const addnewUser = () => {
    setForm({ firstName: "", lastName: "", email: "" });
    setModalMode("add");
    setShowModal(true);
  };

  const openUpdate = (user) => {
    setForm({ firstName: user.firstName, lastName: user.lastName});
    setSelectedUser(user);
    setModalMode("update");
    setShowModal(true);
  };

  const openView = (user) => {
    setSelectedUser(user);
    setModalMode("view");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await fetchAlluser()
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Could not delete user!");
    }

  };



  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (modalMode === "add") {
        console.log(form)
        await createUser(form)
      } else if (modalMode === "update") {
        await updateUser(selectedUser.id, form)
      }
      await fetchAlluser()
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error?.response?.data?.message || "Something went wrong");
    }

  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-gray-100"}`}>

      <Navbar darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Users List
        </h2>

        <button
          onClick={addnewUser}
          className={`mb-6 font-medium px-5 py-2 rounded transition text-white ${darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
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
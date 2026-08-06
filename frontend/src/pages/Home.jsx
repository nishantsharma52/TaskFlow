import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TodoCard from "../components/TodoCard";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTodos } from "../redux/todoSlice";
import API from "../utils/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { setUser } from "../redux/authSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((store) => store.todo);
  const [editingTodo, setEditingTodo] = useState(null);

  const filterTodo = activeTab === "Dashboard" || activeTab === "All Tasks"
    ? todos : todos.filter((todo) => todo.status == activeTab);

  const finalTodos = filterTodo.filter(
    (todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const getAllTodos = async () => {
      dispatch(setLoading(true));

      try {
        const res = await API.get("/todo");
        dispatch(setTodos(res.data.todos));

      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        dispatch(setLoading(false));
      }
    };
    
    getAllTodos();
  }, [dispatch]);



  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setOpenModal(true);
  };

  


  return (
    <div className="md:ml-64 pt-36 md:pt-24 min-h-screen bg-[#0F172A]">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        setActiveTab={setActiveTab}
      />

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar
          search={search}
          setOpenSidebar={setOpenSidebar}
          setSearch={setSearch}
          activeTab={activeTab} />

        <div className="p-8">
          {/* Heading + Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              My Todos
            </h2>

            <button
              onClick={() => setOpenModal(true)}
             className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
            >
              + Add Todo
            </button>
          </div>

          {/* Todo Cards */}
          <div className="mt-8">
            {loading ? (
              <Loader />
            ) : filterTodo.length === 0 ? (
              <h2 className="text-center  text-gray-400 text-xl mt-10">
                No Todos Found
              </h2>
            ) : (
              <div className="grid grid-cols-1 gap-5 font-bold text-white">
                {finalTodos.length === 0 ? "No Todo Found" : finalTodos.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openModal}
        editingTodo={editingTodo}
        onClose={() => {
          setOpenModal(false);
          setEditingTodo(null);
        }}
      />
    </div>
  );
};

export default Home;


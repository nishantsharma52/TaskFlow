import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo,setLoading, } from "../redux/todoSlice";
import API from "../utils/axios";
import toast from "react-hot-toast";

const TodoForm = ({ editingTodo,onClose }) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(setLoading(true));

  try {

    if (editingTodo) {
      // UPDATE
      const res = await API.put(
        `/todo/${editingTodo._id}`,
        input
      );

      dispatch(updateTodo(res.data.todo));
      toast.success(res.data.message);

    } else {
      // CREATE
      const res = await API.post(
        "/todo/create",
        input
      );

      dispatch(addTodo(res.data.todo));
      toast.success(res.data.message);
    }

    // Form Empty
    setInput({
      title: "",
      description: "",
      status: "Pending",
    });
    onClose();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something Went Wrong"
    );
  } finally {
    dispatch(setLoading(false));
  }
};

  useEffect(() => {

    if (editingTodo) {

      setInput({
        title: editingTodo.title,
        description: editingTodo.description,
        status: editingTodo.status
      });

    }

  }, [editingTodo]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5">

      {/* Title */}
      <div>
        <label className="block text-gray-300 mb-2">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={input.title}
          onChange={changeEventHandler}
          placeholder="Enter title"
          className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-300 mb-2">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={input.description}
          onChange={changeEventHandler}
          placeholder="Enter description"
          className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 outline-none resize-none focus:border-blue-500"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-gray-300 mb-2">
          Status
        </label>

        <select
          name="status"
          value={input.status}
          onChange={changeEventHandler}
          className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 outline-none focus:border-blue-500"
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <button

        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition"
      >
     { editingTodo ? "Update Todo" : "Add Todo"}
      </button>

    </form>
  );
};

export default TodoForm;

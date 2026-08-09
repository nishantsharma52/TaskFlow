import { CheckCircle2, Clock3, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, setLoading } from "../redux/todoSlice";
import API from "../utils/axios";

import toast from "react-hot-toast";

const TodoCard = ({ todo, onEdit }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id)=>{
      dispatch(setLoading(true));
    try {
      const res = await API.delete(`/todo/${id}`)
      dispatch(removeTodo(id))
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong")
    } finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-3 hover:border-blue-500 transition">

      {/* Header */}
      <div className="flex justify-between items-start">

        <h2 className="text-xl font-semibold text-white">
          {todo.title}
        </h2>

        {todo.status === "Completed" ? (
          <span className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            <CheckCircle2 size={16} />
            Completed
          </span>
        ) : (
          <span className="flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">
            <Clock3 size={16} />
            Pending
          </span>
        )}

      </div>
      {/* Description */}
      <p className="text-gray-400 mt-2">
        {todo.description}
      </p>

      {/* Footer */}
      <div className="flex justify-end gap-3 ">

        <button onClick={()=>onEdit(todo)} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition">
          <Pencil size={18} className="text-white" />
        </button>

        <button onClick={()=>handleDelete(todo._id)} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition">
          <Trash2 size={18} className="text-white" />
        </button>

      </div>

    </div>
  );
};

export default TodoCard;



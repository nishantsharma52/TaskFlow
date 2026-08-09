import TodoForm from "./TodoForm";

const Modal = ({ isOpen, onClose, editingTodo }) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

   <div className="w-full max-w-lg bg-[#1E293B] rounded-2xl p-4 md:p-6 border border-gray-700 relative">

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-white">
            Add Todo
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        {/* Todo Form */}
        <TodoForm
          editingTodo={editingTodo}
          onClose={onClose}
        />

      </div>

    </div>
  );
};

export default Modal;

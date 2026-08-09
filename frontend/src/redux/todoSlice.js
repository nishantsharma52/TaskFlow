import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Saare Todos Store Karna
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload
      );
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id
          ? action.payload
          : todo
      );
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    // Logout ke time Todos Clear
    clearTodos: (state) => {
      state.todos = [];
      state.loading = false;
    },
  },
});

// Actions Export
export const { setLoading, setTodos, clearTodos, addTodo, removeTodo, updateTodo } = todoSlice.actions;

// Reducer Export
export default todoSlice.reducer;
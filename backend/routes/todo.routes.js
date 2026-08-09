import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.route("/create").post(isAuthenticated, createTodo)
router.route("/").get(isAuthenticated, getTodos)
router.route("/:id").put(isAuthenticated,updateTodo)
router.route("/:id").delete(isAuthenticated, deleteTodo)

export default router;
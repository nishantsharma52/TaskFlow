import { Todo } from "../models/todo.model.js";

// Create Todo
export const createTodo = async (req, res) => {
    try {
        const { title, description,status } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const todo = await Todo.create({
            title,
            description,
            status,
            user: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create todo",
        });
    }
};

// Get All Todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            todos,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch todos",
        });
    }
};

// Update Todo
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const todo = await Todo.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id,
            },
            {
                title,
                description,
                status,
            },
            {
                new: true,
            }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update todo",
        });
    }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete todo",
        });
    }
};
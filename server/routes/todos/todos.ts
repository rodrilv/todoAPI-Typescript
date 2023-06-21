import { Router } from "express";
import { Todo } from "../../models";

const TodoRouter = Router();

TodoRouter.post("/createTodo", async (req, res) => {
    try {
      const body = req.body;
      const todo = new Todo({
        title: body["title"],
        content: body["content"],
        date: body["date"],
        priority: body["priority"],
        user_id: body["user_id"],
        status: "Pendiente",
      });
      await todo.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  });
  
  TodoRouter.get("/getTodos/:id", async (req, res) => {
    try {
      const nameParam = req.params["id"];
      const todos = await Todo.find({ user_id: nameParam })
        .sort({ date: "desc" })
        .exec();
      return res.status(200).json({
        ok: true,
        todos,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  });
  
  TodoRouter.get("/getTodosByPriority/:id/:priority", async (req, res) => {
    try {
      const priority = req.params["priority"];
      const id = req.params["id"];
      const todos = await Todo.find({ user_id: id, priority: priority }).sort({
        date: "desc",
      });
      if (!todos) {
        return res.status(404).json({
          ok: false,
          error: "Not Found (404)",
        });
      }
      return res.status(200).json({
        ok: true,
        todos,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        error: "Not Found (404)",
      });
    }
  });
  
  TodoRouter.get("/getTodosByStatus/:id/:status", async (req, res) => {
    try {
      const status = req.params["status"];
      const id = req.params["id"];
      const todos = await Todo.find({ user_id: id, status: status }).sort({
        date: "desc",
      });
      if (!todos) {
        return res.status(404).json({
          ok: false,
          error: "Not Found (404)",
        });
      }
      return res.status(200).json({
        ok: true,
        todos,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        error: "Not Found (404)",
      });
    }
  });
  
  TodoRouter.post("/deleteTodo", async (req, res) => {
    try {
      const id = req.body["id"];
      await Todo.deleteOne({ _id: id });
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  });
  
  TodoRouter.put("/updateTodo", async (req, res) => {
    try {
      const body = req.body;
      await Todo.findOneAndUpdate(
        { _id: body["_id"], user_id: body["user_id"] },
        {
          title: body["title"],
          content: body["content"],
          date: body["date"],
          priority: body["priority"],
        }
      );
      return res.status(201).json({
        ok: true,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  });
  
  TodoRouter.put("/completeTodo/:id", async (req, res) => {
    try {
      const id = req.params["id"];
      const body = req.body;
      await Todo.findOneAndUpdate(
        { _id: id, user_id: body["user_id"] },
        {
          status: body["status"],
        }
      );
      return res.status(201).json({
        ok: true,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  });

export default TodoRouter;
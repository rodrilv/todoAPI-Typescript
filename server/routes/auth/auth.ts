import { Router } from "express";
import { User } from "../../models";

const AuthRouter = Router();

AuthRouter.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({
          username: body["username"],
          password: body["password"],
        }).exec();
        if (!user) {
          return res.status(404).json({
            ok: false,
            error: "Not Found (404)",
          });
        }
        return res.status(200).json({
          ok: true,
          user,
        });
      } catch (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }
});

AuthRouter.post("/register", async (req, res) => {
    const body = req.body;
    try {
      const user = new User({
        username: body["username"],
        password: body["password"],
      });
      await user.save();
      return res.status(200).json({
        ok: true,
        user,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  });

  export default AuthRouter;
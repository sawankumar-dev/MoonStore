import { Router } from "express"
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.post("/auth/register", registerUser)
userRouter.post("/auth/login", loginUser)
userRouter.post("/auth/logout", verifyJwt, logoutUser)
userRouter.get("/auth/profile", verifyJwt, getCurrentUser)
userRouter.post("/auth/refresh-token", refreshAccessToken)

export default userRouter
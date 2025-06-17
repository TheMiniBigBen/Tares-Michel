import { Router } from "express";
import { getTimeToken, loginMethod, updateToken, getAllUsers, getUserByUsername, saveUser, updateUser, deleteUser } from "../controllers/auth.controller";

const router = Router();

router.post('/login-user', loginMethod);
router.get('/time/:userId', getTimeToken);
router.put('/update/:userId', updateToken);
router.get("/users", getAllUsers);
router.get("/users/:username", getUserByUsername);
router.post("/users",saveUser)
router.patch("/users/:userId", updateUser)
router.delete("/users/:userId" , deleteUser)
export default router;
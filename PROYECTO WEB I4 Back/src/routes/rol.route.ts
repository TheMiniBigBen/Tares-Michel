// src/routes/rol.routes.ts
import { Router } from "express";
import { getAllRoles, getRolById, createRol, updateRol, deleteRol } from "../controllers/rol.controller";

const router = Router();

router.get("/", getAllRoles);
router.get("/:rolId", getRolById);
router.post("/", createRol);
router.patch("/:rolId", updateRol);
router.delete("/:rolId", deleteRol);


export default router;

// porfavaor git/
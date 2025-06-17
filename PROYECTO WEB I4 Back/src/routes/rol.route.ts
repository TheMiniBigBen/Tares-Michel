// src/routes/rol.routes.ts
import { Router } from "express";
import { getAllRoles, getRolById, createRol, updateRol, deleteRol } from "../controllers/rol.controller";

const router = Router();

router.get("/roles", getAllRoles);
router.get("/roles/:rolId", getRolById);
router.post("/roles", createRol);
router.patch("/roles/:rolId", updateRol);
router.delete("/roles/:rolId", deleteRol);

export default router;

// porfavaor git/
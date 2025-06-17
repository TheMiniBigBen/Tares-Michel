import { Request, Response } from "express";
import { Rol } from "../models/rol";

// Obtener todos los roles
export const getAllRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener roles", error });
  }
};

// Obtener rol por ID
export const getRolById = async (req: Request, res: Response) => {
  const { rolId } = req.params;
  try {
    const rol = await Rol.findById(rolId);
    if (!rol) return res.status(404).json({ message: "Rol no encontrado" });
    res.json(rol);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener rol", error });
  }
};

// Crear nuevo rol
export const createRol = async (req: Request, res: Response) => {
  try {
    const rol = new Rol(req.body);
    const saved = await rol.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear rol", error });
  }
};

// Actualizar rol
export const updateRol = async (req: Request, res: Response) => {
  const { rolId } = req.params;
  try {
    const rol = await Rol.findByIdAndUpdate(rolId, req.body, { new: true });
    if (!rol) return res.status(404).json({ message: "Rol no encontrado" });
    res.json(rol);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar rol", error });
  }
};

// Eliminar rol (opcionalmente solo cambiar estado)
export const deleteRol = async (req: Request, res: Response) => {
  const { rolId } = req.params;
  try {
    const rol = await Rol.findById(rolId);
    if (!rol) return res.status(404).json({ message: "Rol no encontrado" });

    rol.status = false;
    const deleted = await rol.save();
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar rol", error });
  }
};

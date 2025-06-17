import { Request, Response } from "express";
import { OrderModel } from "../models/order";

// Obtener todas las órdenes
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find(); // Ahora usa OrderModel
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error });
  }
};

// Obtener una orden por ID
export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId); // Usa OrderModel
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la orden", error });
  }
};

// Crear una nueva orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new OrderModel(req.body); // Usa OrderModel
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden", error });
  }
};

// Actualizar una orden
export const updateOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findByIdAndUpdate(orderId, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error });
  }
};

// "Eliminar" una orden (cambio de estado a 'cancelled')
export const deleteOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    order.status = "cancelled"; // Coincide con los valores del enum del modelo
    const deleted = await order.save();
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar la orden", error });
  }
};

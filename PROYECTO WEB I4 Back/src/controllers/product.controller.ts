import { Request, Response } from "express";
import { Product } from "../models/product";

// Obtener todos los productos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// Eliminar (desactivar) producto
export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    product.status = false;
    const deleted = await product.save();
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

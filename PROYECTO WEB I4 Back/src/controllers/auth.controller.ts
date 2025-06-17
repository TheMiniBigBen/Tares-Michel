import { Request, Response } from "express";
import { generateAccessToken } from "../utils/token";
import { User } from "../models/user";
import { cache } from "../utils/cahce";
import bcrypt from "bcryptjs"; 
import dayjs from "dayjs";

export const loginMethod = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Buscar usuario por username
    const user = await User.findOne({ username });

    if (!user || user.status === false) {
      return res.status(401).json({ message: "Credenciales incorrectas o usuario inactivo" });
    }

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar token
    const userId = user.id.toString();
    const accessToken = generateAccessToken({
      userId: user.id.toString(),
      username: user.username,
      role: user.role,
    });

    // Guardar en caché
    cache.set(userId, accessToken, 60 * 15); // 15 minutos

    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Error durante el login", error });
  }
};


export const getTimeToken=(req:Request,res:Response) => {
    const { userId } = req.params;

    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({
            message: "Token ivalido o no existe"
        });
    }

    const now=Date.now();
    const timeToLife=Math.floor((ttl-now)/1000);
    const expTime=dayjs(ttl).format('HH:mm:ss');

    return res.json({ timeToLife, expTime, createdBy: userId,  })

}

export const updateToken=(req:Request, res:Response) => {
    const { userId } = req.params;

    const ttl = cache.getTtl(userId);//tiempo de vida
    if (!ttl) {
        return res.status(404).json({
            message: "Token ivalido o no existe"
        });
    }

    const newTimeToken: number = 60 * 15;
    //Actualizar el tiempo de vida token
    cache.ttl(userId, newTimeToken);

    res.json({message: "Update" });
}
//Endpoints para consultas general y por username
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: `Usuario con username '${username}' no encontrado` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario', error });
  }
};
export const saveUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,  // guardar la contraseña encriptada
            role,
            email,
        });

        const user = await newUser.save();

        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Error al guardar el usuario', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const userEmail = await User.findOne({ email });
    if (userEmail && userEmail.id !== user.id) {
      return res.status(400).json({ message: "Correo electrónico ya existente" });
    }
    if (password != null) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }
    user.email = email;
    user.role = role;
    user.firstName = firstName;
    user.lastName = lastName;
    const updateUser = await user.save();
    return res.json({ updateUser });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado"})
    }
    user.status = false;
    const deleteDate = new Date;

    const deleteUser = await user.save();
    return res.json({ deleteUser })

  }
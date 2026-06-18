import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import prisma from "../lib/prisma";

export const register = async (req: Request, res: Response) => {
  console.log('login llamado');
  console.log('body:', req.body);
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  res.status(201).json(user);

}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const isValid = await bcrypt.compare(password, user.password);

  console.log('llegué hasta acá');

  if(!isValid) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  const token = jwt.sign({ id: user.id }, 'supersecretkey123', { expiresIn: '7d' });

  res.json({ token });

}


import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { authconfig } from '../../../config/auth';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || user.password !== data.password) {
      throw new Error('Credenciais inválidas');
    }

const token = sign(
      { userId: user.id },
      authconfig.jwt.secret,
      { expiresIn: authconfig.jwt.expireIn }
    );

    return { token };
  }
}
import { PrismaClient } from "@prisma/client";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { authconfig } from "../../../config/auth";

const prisma = new PrismaClient();

export class AuthService {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async login(data: {
    email: string;
    password: string;
  }) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || user.password !== data.password) {
      throw new Error("Credenciais inválidas");
    }

    const secret: Secret = authconfig.jwt.secret;

    const options: SignOptions = {
      expiresIn: "1d",
    };

    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      options
    );

    return { token };
  }
}
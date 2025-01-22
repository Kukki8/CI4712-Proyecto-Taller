/* API DE PRUEBA DE CONEXIÓN */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Seed data
    const users = await prisma.user.createMany({
      data: [
        { name: "Yerimar", email: "yeri@example.com" },
        { name: "Cesar", email: "cesar@example.com" },
      ],
    });

    res.status(200).json({ message: "Database seeded successfully", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to seed database" });
  } finally {
    await prisma.$disconnect();
  }
}

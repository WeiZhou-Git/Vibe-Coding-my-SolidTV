import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function registerAtmosphereRoutes(app: FastifyInstance) {
  app.get("/api/atmosphere-items", async () => {
    const atmosphereItems = await prisma.contentItem.findMany({
      where: {
        type: "atmosphere",
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        title: true,
        subtitle: true,
        meta: true,
        image: true,
        accent: true,
      },
    });

    return {
      data: atmosphereItems,
    };
  });
}

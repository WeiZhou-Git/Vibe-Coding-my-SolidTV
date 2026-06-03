import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function registerWorldRoutes(app: FastifyInstance) {
  app.get("/api/world-items", async () => {
    const worldItems = await prisma.contentItem.findMany({
      where: {
        type: "world",
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        title: true,
        subtitle: true,
        meta: true,
        textureGroup: true,
        image: true,
      },
    });

    return {
      data: worldItems,
    };
  });
}

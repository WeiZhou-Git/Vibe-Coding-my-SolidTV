import Fastify from "fastify";
import { registerAtmosphereRoutes } from "./modules/atmosphere/atmosphere.routes.js";
import { registerWorldRoutes } from "./modules/world/world.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await registerAtmosphereRoutes(app);
  await registerWorldRoutes(app);

  return app;
}

import { app } from "./app";
import { env } from "./env";
import fastifyCors from "@fastify/cors";

app.register(fastifyCors, { 
  origin: "*",
  methods: ["*"],
  allowedHeaders: '*'
})

app.listen({
  host: '0.0.0.0',
  port: env.PORT,
}).then(() => {
  console.log('HTTP Server Running!')
})
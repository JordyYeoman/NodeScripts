// Require the framework and instantiate it
import fastify, { FastifyRequest, FastifyReply } from "fastify";

const server = fastify();

// Declare a route
server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: "world" };
});

server.get("/ping", async (request: FastifyRequest, reply: FastifyReply) => {
  return "pong\n";
});

server.get("/payload", async (request: FastifyRequest, reply: FastifyReply) => {
  return Array(100).fill(0);
});

// Run the server!
const start = async () => {
  try {
    server.listen({ port: 8080 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

export async function getHealthHandler(request, reply) {
  return reply.status(200).send({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}

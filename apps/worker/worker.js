setInterval(() => {
  const ts = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(`[worker] heartbeat at ${ts}`);
}, 5000);

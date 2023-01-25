const config = {
  pollingIntervalInMs: process.env.NEXT_PUBLIC_POLLING_INTEVAL_IN_MS
    ? parseInt(process.env.NEXT_PUBLIC_POLLING_INTEVAL_IN_MS)
    : 600_000,
};

export default config;

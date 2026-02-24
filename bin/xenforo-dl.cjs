#!/usr/bin/env node

(async () => {
  const { default: XenForoDownloaderCLI } = await import('../dist/cli/index.js');
  await (new XenForoDownloaderCLI()).start();
})().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
});
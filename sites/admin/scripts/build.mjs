import { cp, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = process.env.SITES_DIST_DIR || path.join(root, "dist");

await mkdir(path.join(dist, "server"), { recursive: true });
await mkdir(path.join(dist, ".openai"), { recursive: true });
await copyFile(path.join(root, "src", "worker.js"), path.join(dist, "server", "index.js"));
await copyFile(path.join(root, ".openai", "hosting.json"), path.join(dist, ".openai", "hosting.json"));
await cp(path.join(root, "db"), path.join(dist, ".openai", "db"), { recursive: true });

console.log(`Built Sites admin artifact in ${dist}`);

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.test.ts"],
  },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@test": path.resolve(__dirname, "test"), // ← 追加
      },
    },
  });

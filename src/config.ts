import dotenvSafe from "dotenv-safe";
import path from "path";

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root(".env"),
  sample: root(".env.example"),
});

export const config = {
  PORT: process.env.PORT,
  REDIS_URI: process.env.REDIS_URI,
};

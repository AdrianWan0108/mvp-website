// Runs a command with dev-worker build settings. Used by `npm run deploy:dev`.
//
// NEXT_PUBLIC_META_PIXEL_ID is blanked so dev builds don't send PageView/Lead
// events to the real Meta Pixel and skew ad data. Next's env loader never
// overrides a variable that is already set (even to ""), so this beats the
// value in .env.local. Production deploys never go through this script.
import { spawnSync } from "node:child_process";

const command = process.argv.slice(2).join(" ");
const result = spawnSync(command, {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_META_PIXEL_ID: "" },
});
process.exit(result.status ?? 1);

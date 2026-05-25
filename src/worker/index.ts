import type { PluginContext } from "@paperclipai/plugin-sdk";
import { PLUGIN_ID } from "../manifest/constants.js";

export default async function activate(ctx: PluginContext) {
  ctx.logger.info("Pi fork local adapter plugin activated (adapter-only, no worker logic needed)");
}

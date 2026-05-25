import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";
import { PLUGIN_ID, PLUGIN_VERSION } from "./constants.js";

const manifest: PaperclipPluginManifestV1 = {
  id: PLUGIN_ID,
  apiVersion: 1,
  version: PLUGIN_VERSION,
  displayName: "Pi Fork Local Adapter",
  description: "Fork of pi_local adapter with opt-in model preflight — skips pi --list-models by default to avoid timeout failures.",
  author: "buihongduc132",
  categories: ["connector"],
  capabilities: ["agents.read", "agents.invoke"],
};

export default manifest;

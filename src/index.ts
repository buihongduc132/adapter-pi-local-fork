import type { AdapterModelProfileDefinition } from "@paperclipai/adapter-utils";
import {
  execute,
  testEnvironment,
  sessionCodec,
  listPiModels,
  listPiSkills,
  syncPiSkills,
} from "./server/index.js";

export const type = "pi_fork_local";
export const label = "Pi Fork (local)";

export const SANDBOX_INSTALL_COMMAND = "npm install -g @mariozechner/pi-coding-agent@0.74.0";

export const models: Array<{ id: string; label: string }> = [];

export const modelProfiles: AdapterModelProfileDefinition[] = [];

// External adapter registration — upstream doesn't need this because it's built-in.
// Paperclip's plugin-loader calls createServerAdapter() to discover the adapter module.
export function createServerAdapter() {
  return {
    type: "pi_fork_local" as const,
    execute,
    testEnvironment,
    listSkills: listPiSkills,
    syncSkills: syncPiSkills,
    sessionCodec,
    models,
    modelProfiles,
    listModels: listPiModels,
    supportsLocalAgentJwt: true,
    supportsInstructionsBundle: true,
    instructionsPathKey: "instructionsFilePath",
    requiresMaterializedRuntimeSkills: true,
    getRuntimeCommandSpec: undefined,
    agentConfigurationDoc,
  };
}

export const agentConfigurationDoc = `# pi_fork_local agent configuration

Adapter: pi_fork_local

Fork of upstream pi_local with \`pi --list-models\` preflight made **opt-in** (disabled by default).
Use when \`pi_local\` heartbeats fail due to the 20-second model discovery timeout on hosts
where pi startup (with MCP init) exceeds 20 seconds.

Use when:
- You want Paperclip to run Pi (the AI coding agent) locally as the agent runtime
- You want provider/model routing in Pi format (--provider <name> --model <id>)
- You want Pi session resume across heartbeats via --session
- You need Pi's tool set (read, bash, edit, write, grep, find, ls)

Don't use when:
- You need webhook-style external invocation (use openclaw_gateway or http)
- You only need one-shot shell commands (use process)
- Pi CLI is not installed on the machine

Core fields:
- cwd (string, optional): default absolute working directory fallback for the agent process (created if missing when possible)
- instructionsFilePath (string, optional): absolute path to a markdown instructions file appended to system prompt via --append-system-prompt
- promptTemplate (string, optional): user prompt template passed via -p flag
- model (string, required): Pi model id in provider/model format (for example xai/grok-4)
- thinking (string, optional): thinking level (off, minimal, low, medium, high, xhigh)
- command (string, optional): defaults to "pi"
- env (object, optional): KEY=VALUE environment variables

Operational fields:
- timeoutSec (number, optional): run timeout in seconds
- graceSec (number, optional): SIGTERM grace period in seconds
- preflightModelCheck (boolean, optional): run \`pi --list-models\` preflight before execution. Default: false.
- modelDiscoveryTimeoutSec (number, optional): timeout for model discovery preflight in seconds. Default: 90. Only used when preflightModelCheck is true.

Notes:
- Pi supports multiple providers and models. Use \`pi --list-models\` to list available options.
- Paperclip requires an explicit \`model\` value for \`pi_fork_local\` agents.
- Sessions are stored in ~/.pi/paperclips/ and resumed with --session.
- All tools (read, bash, edit, write, grep, find, ls) are enabled by default.
- Agent instructions are appended to Pi's system prompt via --append-system-prompt, while the user task is sent via -p.
`;

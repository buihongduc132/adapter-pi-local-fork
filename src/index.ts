import type { AdapterModel } from "@paperclipai/adapter-utils";

export const type = "pi_fork_local";
export const label = "Pi Fork (local)";

export const SANDBOX_INSTALL_COMMAND = "npm install -g @mariozechner/pi-coding-agent@0.74.0";

export const models: Array<{ id: string; label: string }> = [];

export const modelProfiles: { id: string; label: string }[] = [];

export const agentConfigurationDoc = `# pi_fork_local agent configuration

Adapter: pi_fork_local

Fork of the upstream \`pi_local\` adapter with the \`pi --list-models\` preflight made **opt-in**.
By default the model discovery preflight is skipped entirely, eliminating the 20-second timeout
that causes heartbeats to fail on hosts where pi startup (with MCP init) takes longer than 20 seconds.

Use when:
- You want Paperclip to run Pi (the AI coding agent) locally as the agent runtime
- You want to skip the \`pi --list-models\` preflight (default) to avoid timeout failures
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
- preflightModelCheck (boolean, optional): run \`pi --list-models\` preflight before execution. Default: false. Set to true to validate the configured model is available before starting a heartbeat.
- modelDiscoveryTimeoutSec (number, optional): timeout for the model discovery preflight in seconds. Default: 90. Only used when preflightModelCheck is true.

Notes:
- Pi supports multiple providers and models.
- Paperclip requires an explicit \`model\` value for \`pi_fork_local\` agents.
- Sessions are stored in ~/.pi/paperclips/ and resumed with --session.
- All tools (read, bash, edit, write, grep, find, ls) are enabled by default.
- Agent instructions are appended to Pi's system prompt via --append-system-prompt, while the user task is sent via -p.
`;

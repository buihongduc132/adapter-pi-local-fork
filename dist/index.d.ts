import { execute, testEnvironment, listPiModels, listPiSkills, syncPiSkills } from "./server/index.js";
export declare const type = "pi_fork_local";
export declare function createServerAdapter(): {
    type: "pi_fork_local";
    execute: typeof execute;
    testEnvironment: typeof testEnvironment;
    listSkills: typeof listPiSkills;
    syncSkills: typeof syncPiSkills;
    sessionCodec: import("@paperclipai/adapter-utils").AdapterSessionCodec;
    models: never[];
    modelProfiles: never[];
    listModels: typeof listPiModels;
    supportsLocalAgentJwt: boolean;
    supportsInstructionsBundle: boolean;
    instructionsPathKey: string;
    requiresMaterializedRuntimeSkills: boolean;
    agentConfigurationDoc: string;
};
export declare const type_pi_fork = "pi_fork_local";
export declare const label = "Pi Fork (local)";
export declare const SANDBOX_INSTALL_COMMAND = "npm install -g @mariozechner/pi-coding-agent@0.74.0";
export declare const models: Array<{
    id: string;
    label: string;
}>;
export declare const modelProfiles: {
    id: string;
    label: string;
}[];
export declare const agentConfigurationDoc = "# pi_fork_local agent configuration\n\nAdapter: pi_fork_local\n\nFork of the upstream `pi_local` adapter with the `pi --list-models` preflight made **opt-in**.\nBy default the model discovery preflight is skipped entirely, eliminating the 20-second timeout\nthat causes heartbeats to fail on hosts where pi startup (with MCP init) takes longer than 20 seconds.\n\nUse when:\n- You want Paperclip to run Pi (the AI coding agent) locally as the agent runtime\n- You want to skip the `pi --list-models` preflight (default) to avoid timeout failures\n- You want provider/model routing in Pi format (--provider <name> --model <id>)\n- You want Pi session resume across heartbeats via --session\n- You need Pi's tool set (read, bash, edit, write, grep, find, ls)\n\nDon't use when:\n- You need webhook-style external invocation (use openclaw_gateway or http)\n- You only need one-shot shell commands (use process)\n- Pi CLI is not installed on the machine\n\nCore fields:\n- cwd (string, optional): default absolute working directory fallback for the agent process (created if missing when possible)\n- instructionsFilePath (string, optional): absolute path to a markdown instructions file appended to system prompt via --append-system-prompt\n- promptTemplate (string, optional): user prompt template passed via -p flag\n- model (string, required): Pi model id in provider/model format (for example xai/grok-4)\n- thinking (string, optional): thinking level (off, minimal, low, medium, high, xhigh)\n- command (string, optional): defaults to \"pi\"\n- env (object, optional): KEY=VALUE environment variables\n\nOperational fields:\n- timeoutSec (number, optional): run timeout in seconds\n- graceSec (number, optional): SIGTERM grace period in seconds\n- preflightModelCheck (boolean, optional): run `pi --list-models` preflight before execution. Default: false. Set to true to validate the configured model is available before starting a heartbeat.\n- modelDiscoveryTimeoutSec (number, optional): timeout for the model discovery preflight in seconds. Default: 90. Only used when preflightModelCheck is true.\n\nNotes:\n- Pi supports multiple providers and models.\n- Paperclip requires an explicit `model` value for `pi_fork_local` agents.\n- Sessions are stored in ~/.pi/paperclips/ and resumed with --session.\n- All tools (read, bash, edit, write, grep, find, ls) are enabled by default.\n- Agent instructions are appended to Pi's system prompt via --append-system-prompt, while the user task is sent via -p.\n";

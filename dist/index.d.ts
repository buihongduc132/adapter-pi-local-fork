import type { AdapterModelProfileDefinition } from "@paperclipai/adapter-utils";
import { execute, testEnvironment, listPiModels, listPiSkills, syncPiSkills } from "./server/index.js";
export declare const type = "pi_fork_local";
export declare const label = "Pi Fork (local)";
export declare const SANDBOX_INSTALL_COMMAND = "npm install -g @earendil-works/pi-coding-agent@0.74.0";
export declare const models: Array<{
    id: string;
    label: string;
}>;
export declare const modelProfiles: AdapterModelProfileDefinition[];
export declare function createServerAdapter(): {
    type: "pi_fork_local";
    execute: typeof execute;
    testEnvironment: typeof testEnvironment;
    listSkills: typeof listPiSkills;
    syncSkills: typeof syncPiSkills;
    sessionCodec: import("@paperclipai/adapter-utils").AdapterSessionCodec;
    models: {
        id: string;
        label: string;
    }[];
    modelProfiles: AdapterModelProfileDefinition[];
    listModels: typeof listPiModels;
    supportsLocalAgentJwt: boolean;
    supportsInstructionsBundle: boolean;
    instructionsPathKey: string;
    requiresMaterializedRuntimeSkills: boolean;
    getRuntimeCommandSpec: undefined;
    agentConfigurationDoc: string;
};
export declare const agentConfigurationDoc = "# pi_fork_local agent configuration\n\nAdapter: pi_fork_local\n\nFork of upstream pi_local with `pi --list-models` preflight made **opt-in** (disabled by default).\nUse when `pi_local` heartbeats fail due to the 20-second model discovery timeout on hosts\nwhere pi startup (with MCP init) exceeds 20 seconds.\n\nUse when:\n- You want Paperclip to run Pi (the AI coding agent) locally as the agent runtime\n- You want provider/model routing in Pi format (--provider <name> --model <id>)\n- You want Pi session resume across heartbeats via --session\n- You need Pi's tool set (read, bash, edit, write, grep, find, ls)\n\nDon't use when:\n- You need webhook-style external invocation (use openclaw_gateway or http)\n- You only need one-shot shell commands (use process)\n- Pi CLI is not installed on the machine\n\nCore fields:\n- cwd (string, optional): default absolute working directory fallback for the agent process (created if missing when possible)\n- instructionsFilePath (string, optional): absolute path to a markdown instructions file appended to system prompt via --append-system-prompt\n- promptTemplate (string, optional): user prompt template passed via -p flag\n- model (string, required): Pi model id in provider/model format (for example xai/grok-4)\n- thinking (string, optional): thinking level (off, minimal, low, medium, high, xhigh)\n- command (string, optional): defaults to \"pi\"\n- env (object, optional): KEY=VALUE environment variables\n\nOperational fields:\n- timeoutSec (number, optional): run timeout in seconds\n- graceSec (number, optional): SIGTERM grace period in seconds\n- preflightModelCheck (boolean, optional): run `pi --list-models` preflight before execution. Default: false.\n- modelDiscoveryTimeoutSec (number, optional): timeout for model discovery preflight in seconds. Default: 90. Only used when preflightModelCheck is true.\n- helloProbeTimeoutSec (number, optional): timeout for the hello probe (test environment) in seconds. Default: 60.\n\nNotes:\n- Pi supports multiple providers and models. Use `pi --list-models` to list available options.\n- Paperclip requires an explicit `model` value for `pi_fork_local` agents.\n- Sessions are stored in ~/.pi/paperclips/ and resumed with --session.\n- All tools (read, bash, edit, write, grep, find, ls) are enabled by default.\n- Agent instructions are appended to Pi's system prompt via --append-system-prompt, while the user task is sent via -p.\n";

# @buihongduc132/adapter-pi-local-fork

Fork of `@paperclipai/adapter-pi-local` with the `pi --list-models` preflight made **opt-in**.

## Why this fork?

The upstream adapter runs `pi --list-models` before every heartbeat to validate the configured model.
Pi needs 45–55s for startup + MCP init, but the preflight had a hardcoded 20s timeout — causing heartbeats
to fail before they even start on hosts with slow MCP init.

## What's different?

| Feature | Upstream `pi_local` | This fork `pi_fork_local` |
|---------|-------------------|-------------------------|
| Model preflight | **Always runs** (`pi --list-models`) | **Skipped by default** |
| Preflight timeout | Hardcoded 20s | Configurable (default 90s) |
| Opt-in preflight | N/A | Set `preflightModelCheck: true` |

## Adapter Config

Same fields as upstream `pi_local`, plus:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `preflightModelCheck` | boolean | `false` | Set `true` to run `pi --list-models` before execution |
| `modelDiscoveryTimeoutSec` | number | `90` | Timeout for model discovery (only used when preflight enabled) |

## Install as Paperclip Plugin

```bash
paperclipai plugin install https://github.com/buihongduc132/adapter-pi-local-fork
```

## License

MIT (same as upstream)

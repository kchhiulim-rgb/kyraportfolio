<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Static Asset Rules for Vercel

- **No spaces in filenames.** All files in `public/` must use hyphens instead of spaces (e.g., `70-and-sunny-reel.mp4`, not `70 and Sunny Reel.mp4`). Spaces produce `%20`-encoded URLs that Vercel cannot resolve for static assets.
- **Video files must be under 100 MB.** Vercel rejects deployments containing files >= 100 MB. Compress videos with ffmpeg (CRF 28, libx264) before adding them to the repo.
- **Use `path-to-regexp` syntax in `vercel.json`.** Header source patterns must use `/:path*.ext` format, not standard regex like `/(.+\.(mp4|webm))`.

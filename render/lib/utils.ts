export { cn } from "cn"

import type { Project, StoredProject } from "@/lib/types/project.type.lib";

const PROJECT_PREFIX = "project:";

export function getAllStoredProjects(): StoredProject[] {
    const out: StoredProject[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(PROJECT_PREFIX)) continue;

        const id = key.slice(PROJECT_PREFIX.length);
        if (!id || id.includes(":")) continue; // ghost key or function-group key

        const raw = localStorage.getItem(key);
        if (!raw) continue;

        try {
            const parsed = JSON.parse(raw) as {
                state?: { project?: Project | null };
            };
            const project = parsed.state?.project;
            if (!project) continue;
            out.push({ id, project });
        } catch {
            // ignore corrupt entries
        }
    }

    return out;
}

export function deleteStoredProject(id: string) {
  const projectKey = `project:${id}`;
  const fgPrefix = `project:${id}:function-group:`;

  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (k === projectKey || k.startsWith(fgPrefix)) toRemove.push(k);
  }
  toRemove.forEach((k) => localStorage.removeItem(k));

  return toRemove.length; // useful for logging / tests
}
import { createProjectStore } from "@/lib/stores/project.store.lib";

const projectStores = new Map<
  string,
  ReturnType<typeof createProjectStore>
>();

export function getProjectStore(projectId: string) {
  let store = projectStores.get(projectId);

  if (!store) {
    store = createProjectStore(projectId);

    projectStores.set(projectId, store);
  }

  return store;
}

export function removeProjectStore(projectId: string) {
  projectStores.delete(projectId);
}
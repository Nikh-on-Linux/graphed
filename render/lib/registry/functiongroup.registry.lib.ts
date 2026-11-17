import { createFunctionGroupStore } from "@/lib/stores/functiongroup.store.lib";

const functionGroupStores = new Map<
  string,
  ReturnType<typeof createFunctionGroupStore>
>();

export function getFunctionGroupStore(
  projectId: string,
  groupId: string
) {
  const key = `project:${projectId}:function-group:${groupId}`;
  let store = functionGroupStores.get(key);

  if (!store) {
    store = createFunctionGroupStore(
      projectId,
      groupId
    );
    functionGroupStores.set(key, store);
  }

  return store;
}

export function removeFunctionGroupStore(
  projectId: string,
  groupId: string
) {
  const key = `project:${projectId}:function-group:${groupId}`
  const store = functionGroupStores.get(key);
  console.log(store);
  if (store) {
    // Remove persisted Zustand data
    console.log(key);
    console.log(store);
    store.persist.clearStorage();

    // Remove in-memory store instance
    functionGroupStores.delete(key);
  }
}
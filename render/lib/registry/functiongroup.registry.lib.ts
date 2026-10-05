import { createFunctionGroupStore } from "@/lib/stores/functiongroup.store.lib";

const functionGroupStores = new Map<
  string,
  ReturnType<typeof createFunctionGroupStore>
>();

export function getFunctionGroupStore(
  projectId: string,
  groupId: string
) {
  let store = functionGroupStores.get(groupId);

  if (!store) {
    store = createFunctionGroupStore(
      projectId,
      groupId
    );

    functionGroupStores.set(groupId, store);
  }

  return store;
}

export function removeFunctionGroupStore(
  groupId: string
) {
  functionGroupStores.delete(groupId);
}
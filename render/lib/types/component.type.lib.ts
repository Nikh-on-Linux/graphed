export type ComponentContext = {
  id: string;
  context: string;
  name: string;
  panelOpen: boolean;
  setId: (id: string) => void;
  setContext: (value: string) => void;
  setName: (value: string) => void;
  setPanelOpen: (value: boolean) => void;
};

export type Project = {
    id: string;
    name: string;
    description?: string;

    functionGroupIds: string[];

    createdAt: number;
    updatedAt: number;
};

export type StoredProject = {
    id: string;
    project: Project;
};
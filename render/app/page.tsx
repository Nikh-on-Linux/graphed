"use client"
import { Button } from "@/components/ui/button";
import { ArrowUpRight01FreeIcons, Delete01FreeIcons, Delete02Icon, PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { getProjectStore, removeProjectStore } from "@/lib/registry/project.registry.lib";
import { useActiveProjectStore } from "@/lib/stores/activeproject.store.lib";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteStoredProject, getAllStoredProjects } from "@/lib/utils";
import { Project, StoredProject } from "@/lib/types/project.type.lib";
import { motion } from "framer-motion";
import { removeFunctionGroupStore } from "@/lib/registry/functiongroup.registry.lib";

export default function Page() {
  const [projectName, setProjectName] = useState("");
  const { setCurrentProject } = useActiveProjectStore();
  const [localProjects, SetLocalProjects] = useState<StoredProject[]>();
  const router = useRouter();

  useEffect(() => {
    SetLocalProjects(getAllStoredProjects());
  }, []);

  const deleteProject = (id: string) => {

    const projectStore = getProjectStore(id);
    const groupIds = projectStore.getState().project?.functionGroupIds ?? [];
    groupIds.forEach((gid) => removeFunctionGroupStore(gid));
    removeProjectStore(id);

    // 2. purge localStorage
    const removed = deleteStoredProject(id);

    // 3. update React state so the row disappears
    SetLocalProjects((prev) => prev?.filter((p) => p.id !== id) ?? []);

    // 4. tell the user
    if (removed > 0) toast.success("Project deleted");
    else toast.error("Project not found in storage");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = crypto.randomUUID();

    const projectStore = getProjectStore(id);

    projectStore.getState().setProject({
      id,
      name: projectName,
      description: "",
      functionGroupIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setCurrentProject(id);

    toast.success("Project Initialized");

    router.push("/app");
  };

  const openProject = (id:string)=>{
    setCurrentProject(id);
    router.push('/app');
  }
  return (
    <section className=" w-full h-screen flex flex-col items-center justify-center px-8 gap-20">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"lg"} className="bg-sidebar-primary cursor-pointer text-sidebar-primary-foreground hover:bg-sidebar-primary/60" >
            <HugeiconsIcon icon={PlusIcon} strokeWidth={2} />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Questionnaire onSubmit={handleSubmit}>
            <QuestionnaireItem name="Project Configuration" required >
              <DialogHeader>
                <QuestionnaireProgress />
                <QuestionnaireTitle render={<DialogTitle />}>New project setup</QuestionnaireTitle>
                <QuestionnaireDescription render={<DialogDescription />}>
                  Give a new name to your project.
                </QuestionnaireDescription>
              </DialogHeader>
              <QuestionnaireInput placeholder="Name of the project" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              <QuestionnaireError />
            </QuestionnaireItem>
            {/* <QuestionnaireItem name="Project Context" >
              <DialogHeader>
                <QuestionnaireProgress />
                <QuestionnaireTitle render={<DialogTitle />}>Context of project</QuestionnaireTitle>
                <QuestionnaireDescription render={<DialogDescription />}>
                  A quick brief about the project helps models understand your expectation and application of the design.
                </QuestionnaireDescription>
              </DialogHeader>
              <Textarea placeholder="e.g., A desktop based application that manages directories." />
              <QuestionnaireError />
            </QuestionnaireItem> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} >
                  Cancel
                </Button>
              </DialogClose>
              <QuestionnaireActions>
                <QuestionnaireNext>Next</QuestionnaireNext>
                <QuestionnaireSubmit className="cursor-pointer">Prepare Project</QuestionnaireSubmit>
              </QuestionnaireActions>
            </DialogFooter>
          </Questionnaire>
        </DialogContent>
      </Dialog>
      {
        localProjects?.length == 0 ? <span className="font-sans text-muted-foreground select-none">No recent projects</span> : <Table className="mx-auto w-full max-w-120" >
          <TableCaption>List of projects</TableCaption>
          <TableHeader className="" >
            <TableRow className="bg-card py-2.5" >
              <TableHead className="">Recent Projects: </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-fit" >
            {
              localProjects?.map((project, key) => {
                return (
                  <TableRow className="group flex duration-0" key={key}>
                    <TableCell className="flex-1 text-muted-foreground group-hover:text-foreground">{project.project.name}</TableCell>
                    <TableCell onClick={()=>openProject(project.id)} className="opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                      <Button variant={"secondary"} className="group/b gap-0 hover:bg-foreground/20">
                        <span className="inline-grid grid-cols-[0fr] group-hover/b:grid-cols-[1fr] transition-[grid-template-columns] duration-200 ease-out">
                          <span className="overflow-hidden font-sans whitespace-nowrap">
                            Open
                          </span>
                        </span>
                        <HugeiconsIcon icon={ArrowUpRight01FreeIcons} />
                      </Button>
                      <Button onClick={() => deleteProject(project.id)} variant="destructive" className="group/b gap-0">
                        <span className="inline-grid grid-cols-[0fr] group-hover/b:grid-cols-[1fr] transition-[grid-template-columns] duration-200 ease-out">
                          <span className="overflow-hidden font-sans whitespace-nowrap">
                            Delete
                          </span>
                        </span>
                        <HugeiconsIcon icon={Delete02Icon} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      }
    </section>
  )
}

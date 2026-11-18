
import React, { useEffect, useRef, useState } from "react"
import { useStore } from "zustand"
import { AnimatePresence, motion } from "framer-motion"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChevronRightIcon,
  ComponentIcon,
  Delete02Icon,
  Edit01Icon,
  EllipsisVerticalIcon,
  FunctionSquareIcon,
  GitBranchIcon,
  Menu01FreeIcons,
  Pen01Icon,
  TextIcon,
} from "@hugeicons/core-free-icons"

import { getFunctionGroupStore } from "@/lib/registry/functiongroup.registry.lib"
import { useFlowEditorStore } from "@/lib/stores/floweditor.store.lib"
import { removeFunctionGroupStore } from "@/lib/registry/functiongroup.registry.lib";
import { Button } from "../ui/button"
import { cn } from "cn"
import type { FunctionGroupProps } from "@/lib/types/functiongroup.type.lib";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

function FunctionGroup({
  currentProjectId,
  group,
}: FunctionGroupProps) {
  const contextCardRef = useRef<HTMLDivElement>(null)
  const [isContextOpen, setIsContextOpen] = useState(false)
  const [contextDescription, setContextDescription] = useState("")

  const fngroup = getFunctionGroupStore(
    currentProjectId,
    group
  )

  const { name, description, nodes } = useStore(
    fngroup,
    (state) => state.group
  )

  useEffect(() => {
    setContextDescription(description)
  }, [description])

  useEffect(() => {
    if (!isContextOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        contextCardRef.current &&
        !contextCardRef.current.contains(event.target as Node)
      ) {
        setIsContextOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContextOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isContextOpen])

  const selectFunctionGroup = useFlowEditorStore(
    (state) => state.selectFunctionGroup
  )

  const clearSelection = useFlowEditorStore(
    (state) => state.clearSelection
  )

  const activeProjectId = useFlowEditorStore(
    (state) => state.activeProjectId
  )

  const activeGroupId = useFlowEditorStore(
    (state) => state.activeFunctionGroupId
  )

  const isActive =
    activeProjectId === currentProjectId &&
    activeGroupId === group

  const handleSelect = () => {
    selectFunctionGroup(currentProjectId, group)
  }

  const deleteFunctionGroup = () => {
    removeFunctionGroupStore(currentProjectId, group);
    clearSelection();
  }

  const saveContext = () => {
    fngroup.getState().setDescription(contextDescription)
    toast.success("Function group context saved")
    setIsContextOpen(false)
  }

  return (
    <Collapsible
      className="group/collapsible"
      asChild
    >
      <SidebarMenuItem className="relative">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <SidebarMenuButton
              onClick={handleSelect}
              isActive={isActive}
              tooltip={name}
              className="min-w-0"
            >
              <HugeiconsIcon
                icon={ComponentIcon}
                strokeWidth={1.8}
                className={
                  isActive ? "text-sidebar-primary" : ""
                }
              />

              <span className="min-w-0 flex-1 truncate font-sans font-medium">
                {name}
              </span>
            </SidebarMenuButton>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuItem
                className="text-muted-foreground"
                onSelect={() => setIsContextOpen(true)}
              >
                <HugeiconsIcon icon={Edit01Icon} strokeWidth={2.5} />
                <span>Edit context</span>
              </ContextMenuItem>
              <ContextMenuItem className="text-muted-foreground">
                <HugeiconsIcon icon={TextIcon} strokeWidth={2.5} />
                <span>Rename function group</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="group hover:bg-destructive/10!" onClick={deleteFunctionGroup}>
                <HugeiconsIcon icon={Delete02Icon} strokeWidth={2.5} className="text-destructive group-hover:text-destructive!" />
                <span className="font-sans font-medium text-destructive">Delete</span>
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>

        <AnimatePresence>
          {isContextOpen && (
            <motion.div
              ref={contextCardRef}
              className="absolute top-10 left-2 z-50"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <Card className="w-62 overflow-visible shadow-lg">
                <div className="absolute left-10 -top-2.5 h-5 w-5 rotate-45 border border-r-0 border-b-0 bg-card" />
                <CardHeader>
                  <span className="font-sans text-muted-foreground">Group context</span>
                </CardHeader>
                <CardContent>
                  <Textarea
                    rows={4}
                    value={contextDescription}
                    onChange={(event) => setContextDescription(event.target.value)}
                    className="w-full resize-none field-sizing-fixed overflow-auto"
                    placeholder="Write context which describes the operations of the function group."
                  />
                  <Button
                    className="float-right mt-3"
                    variant="default"
                    type="button"
                    onClick={saveContext}
                  >
                    <span>Save</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <CollapsibleTrigger asChild>
          <SidebarMenuAction
            aria-label={`Toggle ${name}`}
            showOnHover
            className="group-data-[state=open]/collapsible:rotate-90"
          >
            <HugeiconsIcon
              icon={ChevronRightIcon}
              strokeWidth={2}
            />
          </SidebarMenuAction>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub className="w-full py-1.5">
            {nodes.map((node) => {
              return (
                <SidebarMenuSubItem key={node.id} className="w-full">
                  <SidebarMenuSubButton
                    className="w-full group/nodelist"
                    title={node.data.label || "Untitled node"}
                  >
                    {node.type == "functionNode" ? (
                      <HugeiconsIcon
                        icon={FunctionSquareIcon}
                        strokeWidth={1.5}
                        className="shrink-0 text-muted-foreground group-hover/nodelist:text-secondary-foreground"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={GitBranchIcon}
                        strokeWidth={1.5}
                        className="shrink-0 text-muted-foreground group-hover/nodelist:text-secondary-foreground"
                      />
                    )}

                    <span className="truncate w-full text-muted-foreground group-hover/nodelist:text-secondary-foreground">
                      {node.data.label || "Untitled node"}
                    </span>

                    <Button size="icon" variant="ghost" className={cn("cursor-pointer", "group-hover/nodelist:block hidden")}>
                      <HugeiconsIcon
                        icon={EllipsisVerticalIcon}
                        strokeWidth={1.5}
                        className="shrink-0 text-muted-foreground group-hover/nodelist:text-secondary-foreground"
                      />
                    </Button>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default FunctionGroup

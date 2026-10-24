
import React from "react"
import { useStore } from "zustand"

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

import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChevronRightIcon,
  ComponentIcon,
  EllipsisVerticalIcon,
  FunctionSquareIcon,
  Menu01FreeIcons,
} from "@hugeicons/core-free-icons"

import { getFunctionGroupStore } from "@/lib/registry/functiongroup.registry.lib"
import { useFlowEditorStore } from "@/lib/stores/floweditor.store.lib"
import { Button } from "../ui/button"
import { cn } from "cn"

type FunctionGroupProps = {
  currentProjectId: string
  group: string
}

function FunctionGroup({
  currentProjectId,
  group,
}: FunctionGroupProps) {
  const fngroup = getFunctionGroupStore(
    currentProjectId,
    group
  )

  const { name, nodes } = useStore(
    fngroup,
    (state) => state.group
  )

  const selectFunctionGroup = useFlowEditorStore(
    (state) => state.selectFunctionGroup
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

  return (
    <Collapsible
      className="group/collapsible"
      asChild
    >
      <SidebarMenuItem>
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
          <SidebarMenuSub className="w-full py-1.5" >
            {nodes.map((node) => (
              <SidebarMenuSubItem key={node.id} className="w-full">
                <SidebarMenuSubButton
                  className=" w-full group/nodelist"
                  title={node.data.label || "Untitled node"}
                >
                  <HugeiconsIcon
                    icon={FunctionSquareIcon}
                    strokeWidth={1.5}
                    className="shrink-0 text-muted-foreground group-hover/nodelist:text-secondary-foreground"
                  />

                  <span className="truncate w-full text-muted-foreground group-hover/nodelist:text-secondary-foreground">
                    {node.data.label || "Untitled node"}
                  </span>

                  <Button size={"icon"} variant={"ghost"} className={cn("cursor-pointer",`group-hover/nodelist:block hidden`)} >
                    <HugeiconsIcon
                    icon={EllipsisVerticalIcon} strokeWidth={1.5}
                    className="shrink-0 text-muted-foreground group-hover/nodelist:text-secondary-foreground" />
                  </Button>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default FunctionGroup

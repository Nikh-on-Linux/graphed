"use client"

import * as React from "react"

import { NavUser } from "@/components/nav-user"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { HugeiconsIcon } from "@hugeicons/react"
import { CommandIcon, HomeIcon, Home02Icon, ComponentIcon } from "@hugeicons/core-free-icons"
import { useSidePanelStore } from "@/lib/stores/sidepanel.store.lib"
import XIcon from "@hugeicons/core-free-icons/XIcon"
import { Button } from "./ui/button"
import SidePanel from "./blocks/sidepanel.block.component"

// This is sample data

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.

  // IRL you should use the url/router.
  const { setOpen } = useSidePanelStore();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Home",
        url: "#",
        icon: (
          <HugeiconsIcon icon={Home02Icon} strokeWidth={2} />
        ),
        isActive: true,
        callback: () => { }
      },
      {
        title: "Components",
        url: "",
        icon: (
          <HugeiconsIcon icon={ComponentIcon} strokeWidth={2} />
        ),
        isActive: false,
        callback: () => setOpen(true)
      }
    ],
  }

  const [activeItem, setActiveItem] = React.useState(data.navMain[0])

  return (
    <Sidebar

      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      > */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                      onClick={() => item?.callback()}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      {/* <Sidebar collapsible="none" className="hidden flex-1 md:flex" >
        <SidebarHeader className='flex flex-row items-center px-4' >
          <div className='w-full' >
            <h2 className='font-sans font-medium'>Components</h2>
          </div>
          <div>
            <Button variant={"ghost"} className='outline-none' size={"icon"} onClick={() => setOpen(false)} >
              <HugeiconsIcon icon={XIcon} strokeWidth={2} />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar> */}
      <SidePanel />
    </Sidebar>
    // </Sidebar>
  )
}

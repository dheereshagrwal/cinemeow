"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu as UIMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { VersionSwitcher } from "./version-switcher";
import { usePathname } from "next/navigation";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Navigation Menu",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/home",
        },
        {
          title: "Collections",
          url: "/collections",
        },
        {
          title: "Find Jobs",
          url: "/find-jobs",
        },
        {
          title: "Tags",
          url: "/tags",
        },
        {
          title: "Communities",
          url: "/communities",
        },
        {
          title: "Ask a Question",
          url: "/ask-a-question",
        },
      ],
    },
  ],
};

const SidebarMenuContent = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();
  return (
    <div>
      <SidebarHeader className="mt-4 px-4">
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent className="mt-0 px-4 py-4">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <UIMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </UIMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </div>
  );
};

export default SidebarMenuContent;

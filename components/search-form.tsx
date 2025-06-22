"use client";

import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AddSearchPrams, DeleteSearchPrams } from "@/lib/url";

interface SearchFormProps extends React.ComponentProps<"form"> {
  type: "global-search" | "search";
  placeholder: string;
}

export function SearchForm({ type, placeholder, ...props }: SearchFormProps) {
  const router = useRouter();
  const queryPrams = useSearchParams();
  const query = queryPrams.get(type) || "";
  const [SearchValue, setSerchValue] = useState(query);
  useEffect(() => {
    const Debouncefn = setTimeout(() => {
      if (SearchValue) {
        const NewQuery = AddSearchPrams({
          prams: queryPrams.toString(),
          key: type,
          value: SearchValue,
        });
        router.push(NewQuery, { scroll: false });
      } else {
        const NewQuery = DeleteSearchPrams({
          prams: queryPrams.toString(),
          Removekeys: [type],
        });
        router.push(NewQuery, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(Debouncefn);
  }, [SearchValue]);

  return (
    <form {...props}>
      <SidebarGroup className="py-0 ">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder={placeholder}
            value={SearchValue}
            onChange={(e) => setSerchValue(e.target.value)}
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}

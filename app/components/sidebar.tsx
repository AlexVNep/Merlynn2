"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Links {
  name: string;
  href: string;
  icon: React.ElementType;
}

const links: Links[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Decisions",
    href: "/decisions",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Form",
    href: "/form",
    icon: DocumentPlusIcon,
  },
  {
    name: "Batch Processing ",
    href: "/batchprocessing",
    icon: UserGroupIcon,
  },
  {
    name: "Batch Upload ",
    href: "/batchUpload",
    icon: ArrowUpIcon,
  },
  {
    name: "Batch Download ",
    href: "/batchdownload",
    icon: ArrowDownIcon,
  },
];
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <main>
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-black text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href, //if on this path then use this styling
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    </main>
  );
}

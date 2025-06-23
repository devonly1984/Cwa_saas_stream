import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

export const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];
export const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE=10;
export const MAX_PAGE_SIZE=100;
export const MIN_PAGE_SIZE = 1;
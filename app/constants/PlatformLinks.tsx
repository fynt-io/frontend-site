import { MenuLink } from "./types";

//official menu links

const defaultLinks: MenuLink[] = [
  // {
  //   name: "Dashboard",
  //   link: "/platform/dashboard",
  //   icon: "chart-up",
  //   iconActive: "chart-up",
  //   superuser: false,
  // },
  {
    name: "Assistente IA",
    link: "/platform/assistente-ia",
    icon: "sparkles",
    iconActive: "sparkles-filled",
    superuser: true,
  },
  {
    name: "Modelos",
    link: "/platform/templates",
    icon: "files",
    iconActive: "files-filled",
    superuser: false,
  },
  {
    name: "Clientes",
    link: "/platform/clientes",
    icon: "users",
    iconActive: "users-filled",
    superuser: false,
  },
  {
    name: "Conversas",
    link: "/platform/conversas",
    icon: "chat",
    iconActive: "chat-filled",
    superuser: false,
  },
  // {
  //   name: "Retomar Conversa",
  //   link: "/platform/retomar-conversa",
  //   icon: "balloon-plus",
  //   iconActive: "ballon-plus-filled",
  //   superuser: false,
  // },
  {
    name: "Disparos em Massa",
    link: "/platform/disparos-em-massa",
    icon: "paper-plane",
    iconActive: "paper-plane-filled",
    superuser: false,
  },
  // {
  //   name: "Produtos",
  //   link: "/platform/produtos",
  //   icon: "box",
  //   iconActive: "box-filled",
  //   superuser: true,
  // },
  {
    name: "Colaboradores",
    link: "/platform/colaboradores",
    icon: "suitcase",
    iconActive: "suitcase-filled",
    superuser: true,
  },
];

const linksToHideInProduction = ['/platform/follow-up']

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'
export const MENU_LINKS = isProduction
  ? defaultLinks.filter(link => !linksToHideInProduction.includes(link.link))
  : defaultLinks
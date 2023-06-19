import { AdminPage } from "@/pages";
import { RouteItem } from "@/types";
// export * from "./Skycs/List/Skycs";

export const contractRoutes: RouteItem[] = [
  {
    key: "contract",
    path: "contract",
    mainMenuTitle: "contract",
    mainMenuKey: "contract",
    getPageElement: () => <AdminPage />,
  },
];

import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { HeaderPart } from "../components";

export const CarStdOptPage = () => {
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}></AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { showErrorAtom } from "@/packages/store";
import { Icon } from "@/packages/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { DataGrid, Form } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QueryNames } from "../Sto_TranspReq-common";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("TranspReq");
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2 ml-[16px] page-header">
      <div className={"flex items-center justify-center"}>
        <div
          className={
            "screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer"
          }
          onClick={handleGoBack}
        >
          {t("TranspReqManagement")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("CreateNewTranspReq")}
        </div>
      </div>
      <div>
        {rightButtons.map((button, idx) => (
          <BButton key={idx} {...button} />
        ))}
      </div>
    </div>
  );
};

export const Sto_TranspReqCreateNew = () => {
  const { t } = useI18n("TranspReq");
  const queryClient = useQueryClient();
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const gridRef = useRef<DataGrid>(null);
  const formRef = useRef<Form>(null);

  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Save"),
      onClick: async (e: any) => {
        const validate = formRef.current?.instance.validate();
        if (!validate?.isValid) {
          return;
        }
        const formData = formRef.current?.instance.option("formData");
        console.log(67, formData);
        const selectedCars = gridRef.current?.instance.getDataSource().items();
        if (!selectedCars) {
          toast.error(t("SelectedCarsIsRequired"));
        } else {
          const resp = await api.CarTranspReq_CreateHQ(
            formData,
            selectedCars ?? []
          );
          if (resp.isSuccess) {
            toast.success(t("CreatedSuccessfully"));
            queryClient.removeQueries([QueryNames.DELIVERY_ORDER]);
            navigate(-1);
          } else {
            showError({
              debugInfo: resp.debugInfo,
              errorInfo: resp.errorInfo,
              message: resp.errorCode,
            });
          }
        }
      },
      className: "px-[4px]",
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    },
  ];

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}></AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

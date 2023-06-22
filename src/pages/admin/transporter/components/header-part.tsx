import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import { showErrorAtom } from "@/packages/store";
import { useExportExcel } from "@/packages/ui/export-excel/use-export-excel";
import { useUploadFile } from "@/packages/ui/upload-file/use-upload-file";
import Button from "devextreme-react/button";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { selectedItemsAtom } from "./transporter-store";

interface IHeaderPartProps {
  onAddNew: () => void;
}

export const HeaderPart = ({ onAddNew }: IHeaderPartProps) => {
  const { t } = useI18n("Transporter");
  const selectedItems = useAtomValue(selectedItemsAtom);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const handleUploadFiles = async (files: File[]) => {
    const resp = await api.Mst_Transporter_Upload(files[0]);
    if (resp.isSuccess) {
      toast.success(t("UploadSuccessfully"));
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_Transporter_ExportExcel_Template();
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = resp.Data!;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    let resp = await match(selectedOnly)
      .with(true, async () => {
        return await api.Mst_Transporter_ExportByListCode(selectedItems);
      })
      .otherwise(async () => {
        return await api.Mst_Transporter_ExportExcel();
      });
    if (resp.isSuccess) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = resp.Data;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const { uploadButton, uploadDialog } = useUploadFile({
    handleUploadFiles,
    onDownloadTemplate,
    buttonClassName: "w-100",
  });

  const { exportButton, exportDialog } = useExportExcel({
    buttonClassName: "w-100",
    selectedItems,
    onExportExcel: handleExportExcel,
  });

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">Quản lý đơn vị vận tải</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text="Thêm mới"
          onClick={onAddNew}
        />
        <DropDownButton
          showArrowIcon={false}
          keyExpr={"id"}
          className="menu-items"
          displayExpr={"text"}
          wrapItemText={false}
          dropDownOptions={{
            width: 200,
            wrapperAttr: {
              class: "headerform__menuitems",
            },
          }}
          icon="/images/icons/more.svg"
        >
          <DropDownButtonItem
            render={(item: any) => {
              return <div>{uploadButton}</div>;
            }}
          />
          <DropDownButtonItem
            render={(item: any) => {
              return <div>{exportButton}</div>;
            }}
          />
        </DropDownButton>
        {uploadDialog}
        {exportDialog}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};

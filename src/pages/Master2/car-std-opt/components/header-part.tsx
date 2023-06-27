import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { Button } from "devextreme-react/button";
import { SearchMst_CarStdOptParam } from "@/packages/types";
import { useUploadFile } from "@/packages/ui/upload-file/use-upload-file";
import { useExportExcel } from "@/packages/ui/export-excel/use-export-excel";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedItemsAtom } from "./car-std-opt-store";
import notify from "devextreme/ui/notify";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { match } from "ts-pattern";
import { toast } from "react-toastify";
interface IHeaderPartProps {
  onAddNew: () => void;
  searchCondition: Partial<SearchMst_CarStdOptParam>;
}

export const HeaderPart = ({ onAddNew, searchCondition }: IHeaderPartProps) => {
  const { t } = useI18n("Mst_Quota");
  const api = useClientgateApi();
  const selectedItems = useAtomValue(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom)

  const handleUploadFiles = async(files: File[]) => {
    const resp = await api.Mst_CarStdOpt_Import(files[0]);
    if (resp.isSuccess) {
      notify(t("Upload Successfully"));
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_CarStdOpt_ExportTemplate();
    if (resp.isSuccess) {
      notify(t("Download Successfully"));
      console.log("resp.Data._objResult ", resp.Data);
      window.location.href = resp.Data;
    } else {
      notify(t(resp.Data._strErrCode), {
        position: {
          top: 0,
        },
        direction: "down-push",
      });
    }
  };

  const handleExportExcel = async(selectedOnly: boolean) => {
    let resp = await match(selectedOnly)
      .with(true, async () => {
        return await api.Mst_CarStdOpt_ExportByListCode(selectedItems);
      })
      .otherwise(async () => {
        return await api.Mst_CarStdOpt_Export(searchCondition);
      });
    if (resp.isSuccess) {
      toast.success(t("Download Successfully"));
      if (resp.Data) {
        window.location.href = resp.Data;
      }
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
    buttonClassName: "w-full",
  });

  const { exportButton, exportDialog } = useExportExcel({
    buttonClassName: "w-full",
    selectedItems,
    onExportExcel: handleExportExcel,
  });
  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">Quản lý tuỳ chọn cơ bản</div>
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

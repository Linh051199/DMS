import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";

interface HeaderPartProps {
  onAddNew?: () => void;
  onDownloadTemplate: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
}

const HeaderPart = ({
  onUploadFile,
  onDownloadTemplate,
  onAddNew,
}: HeaderPartProps) => {
  const { t } = useI18n("Common");
  const api = useClientgateApi();
  const keyword = useAtomValue(keywordAtom);
  const setKeyword = useSetAtom(keywordAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    const resp = await api.Mst_Province_ExportByListProvinceCode(
      selectedItems,
      keyword || ""
    );
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

  return (
    <HeaderForm
      onSearch={handleSearch}
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
    />
  );
};

export default HeaderPart;

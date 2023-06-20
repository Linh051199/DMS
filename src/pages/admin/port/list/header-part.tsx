import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemAtom } from "../components/screen-atom";

interface IHeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
}

const HeaderPart = ({
  onAddNew,
  onUploadFile,
  onDownloadTemplate,
}: IHeaderPartProps) => {
  const { t } = useI18n("Common");
  const setkeyword = useSetAtom(keywordAtom);
  const selectedItems = useAtomValue(selectedItemAtom);
  const api = useClientgateApi()
  const showError = useSetAtom(showErrorAtom)

  const handleSearch = (keyword: string) => {
    setkeyword(keyword);
  };

  const handleExportExcel = async(selectedOnly: boolean) => {
    const resp = await api.Mst_Port_Export(selectedItems)
    if (resp.isSuccess) {
      toast.success("Download Successfully!");
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
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onDownloadTemplate={onDownloadTemplate}
      onSearch={handleSearch}
      onExportExcel={handleExportExcel}
      selectedItems={selectedItems}
    />
  );
};

export default HeaderPart;

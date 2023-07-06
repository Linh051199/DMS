import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { selectedItemAtom, keywordAtom } from "../components/screen-atom";

interface IHeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
}

export const HeaderPart = ({
  onAddNew,
  onUploadFile,
  onDownloadTemplate,
}: IHeaderPartProps) => {
  const { t } = useI18n("Common");
  const selectedItems = useAtomValue(selectedItemAtom);
  const setKeyWords = useSetAtom(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();

  const handleSearch = (keyWord: string) => {
    setKeyWords(keyWord);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    const resp = await api.Mst_VINProductionYear_Actual_ExportExcel(selectedItems)
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
      onExportExcel={handleExportExcel}
      selectedItems={selectedItems}
      onSearch={handleSearch}
    />
  );
};

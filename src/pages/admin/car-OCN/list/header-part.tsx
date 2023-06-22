import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";

interface IHeaderPartProps {
  onAddNew: () => void;
  onDownloadTemplate: () => void;
  onUploadFile: (file: File, progressCallback?: Function) => void;
}

export const HeaderPart = ({
  onAddNew,
  onDownloadTemplate,
  onUploadFile,
}: IHeaderPartProps) => {
  const { t } = useI18n("Common");
  const selectedItems = useAtomValue(selectedItemsAtom);
  const setKeyword = useSetAtom(keywordAtom);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const handleOnSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    const resp = await api.Mst_CarOCN_ExportByListCode(selectedItems);
    if (resp.isSuccess) {
      toast.success("Download successfully ");
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
      onSearch={handleOnSearch}
      onAddNew={onAddNew}
      onDownloadTemplate={onDownloadTemplate}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      selectedItems={selectedItems}
    />
  );
};

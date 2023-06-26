import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { selectedItemsAtom, keyWordAtom } from "../components/screen-atom";

interface IHeaderPartProps {
  onAddNew: () => void;
  onUploadFile: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
}

export const HeaderPart = ({
  onAddNew,
  onDownloadTemplate,
  onUploadFile,
}: IHeaderPartProps) => {
  const { t } = useI18n("Common");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);
  const setKeyWord = useSetAtom(keyWordAtom);

  const handleOnSearch = (keyword: string) => {
    setKeyWord(keyword);
  };

  const handleOnExportExcel = async (selectedOnly: boolean) => {
    const resp = await api.Mst_CustomerBase_ExportExcel(selectedItems);
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
      onDownloadTemplate={onDownloadTemplate}
      onUploadFile={onUploadFile}
      onSearch={handleOnSearch}
      onExportExcel={handleOnExportExcel}
      selectedItems={selectedItems}
    />
  );
};

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
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
  const seletedItems = useAtomValue(selectedItemAtom);
  const setKeyWords = useSetAtom(keywordAtom);
  const keyWord = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();

  const handleSearch = (keyWord: string) => {
    setKeyWords(keyWord);
  };

  const handleExportExcel = () => {};

  return (
    <HeaderForm
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onDownloadTemplate={onDownloadTemplate}
      onExportExcel={handleExportExcel}
      selectedItems={seletedItems}
      onSearch={handleSearch}
    />
  );
};

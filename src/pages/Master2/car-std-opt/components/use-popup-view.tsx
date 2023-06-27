import { useI18n } from "@/i18n/useI18n";
import { PopupView } from "@/packages/ui/popup-view";
import { FormOptions } from "@/types";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./car-std-opt-store";

export interface IPopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const PopupViewComponent = ({
  onEdit,
  formSettings,
}: IPopupViewProps) => {
  const { t } = useI18n("Mst_CarStdOpt");

  const [viewingItem, setViewingItem] = useAtom(viewingDataAtom);

  const handleEdit = () => {
    let rowIndex = viewingItem?.rowIndex;
    if (viewingItem) {
      setViewingItem(undefined);
    }
    if (typeof rowIndex == "number") {
      onEdit(rowIndex);
    }
  };

  const handleCancel = () => {
    setViewingItem(undefined);
  };
  return (
    <PopupView
      visible={!!viewingItem.item}
      title={t("View Mst_CarStdOpt")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
    />
  );
};

import { useI18n } from "@/i18n/useI18n";
import { PopupView } from "@/packages/ui/popup-view";
import { FormOptions } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import { viewingDataAtom } from "./transporter-store";

export interface TransporterViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const TransporterPopupView = ({
  onEdit,
  formSettings,
}: TransporterViewProps) => {
  const { t } = useI18n("Common");
  const [viewingItem, setViewingItem] = useAtom(viewingDataAtom);

  const handleEdit = () => {
    let rowIndex = viewingItem?.rowIndex;
    if (viewingItem) {
      setViewingItem(undefined);
    }
    if (typeof rowIndex === "number") {
      onEdit(rowIndex);
    }
  };

  const handleCancel = () => {
    setViewingItem(undefined);
  };

  return (
    <PopupView
      visible={!!viewingItem.item}
      title={t("View Mst_Quota")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
    />
  );
};

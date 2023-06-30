import { useI18n } from "@/i18n/useI18n";
import { PopupView } from "@/packages/ui/popup-view";
import { FormOptions } from "@/types";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./bank-store";

interface IPopupViewComponent {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const PopupViewComponent = ({
  onEdit,
  formSettings,
}: IPopupViewComponent) => {
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
      title={t("ViewingBase")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
    />
  );
};

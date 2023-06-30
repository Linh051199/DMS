import { PopupView } from "@/packages/ui/popup-view";
import { FormOptions } from "@/types";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./bank-account-store";

interface IPopupViewComponent {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const PopupViewComponent = ({
  onEdit,
  formSettings,
}: IPopupViewComponent) => {
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
      title={"Thông tin ngân hàng"}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
    />
  );
};

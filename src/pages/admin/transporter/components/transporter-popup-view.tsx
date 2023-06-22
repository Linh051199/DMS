import { FormOptions } from "@/types";

export interface TransporterViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const TransporterPopupView = ({
  onEdit,
  formSettings,
}: TransporterViewProps) => {
  return <div>popup</div>;
};

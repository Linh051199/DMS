import dxForm from "devextreme/ui/form";
import {CheckBox} from "devextreme-react";

interface CheckboxFieldProps {
  formInstance: dxForm
  dataField: string
  onValueChanged: (e: any) => void
  width?: number;
  label?: string;
  defaultValue?: boolean
}

export const CheckboxField = ({
                                label, formInstance, dataField, width=250, onValueChanged, defaultValue}: CheckboxFieldProps) => {
  return (
    <div className={"checkbox-field flex items-start"}>
      <CheckBox
        width={width}
        className={"ml-2"}
        onValueChanged={onValueChanged}
        text={label}
        defaultValue={defaultValue}
      />
    </div>
  )
}

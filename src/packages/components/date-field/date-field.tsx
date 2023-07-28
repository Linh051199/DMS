import DateBox from "devextreme-react/date-box";
import dxForm from "devextreme/ui/form";

import "src/packages/components/date-field/date-field.scss"

interface DateFieldProps {
  formInstance: dxForm
  dataField: string
  onValueChanged?: (e: any) => void
  placeholder?: string;
  width?: number;
  readOnly?: boolean;
  defaultValue?: Date;
}

export const DateField = ({formInstance, dataField, width=250, placeholder, onValueChanged, readOnly=false, defaultValue}: DateFieldProps) => {
  const handleChanged = (e: any) => {
    if(!onValueChanged) {
      formInstance.updateData(dataField, e.value)
    } else {
      onValueChanged(e)
    }
  }
  return (
    <div className={"date-field flex flex-row"}>
      <DateBox
        openOnFieldClick={true}
        width={width}
        className={"ml-2"}
        inputAttr={{
          class: "rounded border-[0.5]"
        }}
        placeholder={placeholder}
        onValueChanged={handleChanged}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
    </div>
  )
}

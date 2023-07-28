import TextBox from "devextreme-react/text-box";
import dxForm from "devextreme/ui/form";

import "src/packages/components/text-field/text-field.scss"

interface TextFieldProps {
  formInstance: dxForm
  dataField: string
  onValueChanged?: (e: any) => void
  placeholder?: string;
  width?: number;
  readOnly?: boolean;
  defaultValue?: string;
}

export const TextField = ({formInstance, dataField, width=270, placeholder, onValueChanged, readOnly=false, defaultValue}: TextFieldProps) => {
  const handleChanged = (e: any) => {
    if(!onValueChanged) {
      formInstance.updateData(dataField, e.value)
    } else {
      onValueChanged(e)
    }
    
  }
  return (
    <div className={"text-field flex flex-row"}>
      <TextBox
        width={width}
        className={"ml-2"}
        inputAttr={{
          class: "rounded border-[0.5]"
        }}
        placeholder={placeholder}
        onValueChanged={handleChanged}
        readOnly={readOnly}
        defaultValue={defaultValue}
        validationMessagePosition={"bottom"}
      />
    </div>
  )
}
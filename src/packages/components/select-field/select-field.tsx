import SelectBox, {ISelectBoxOptions} from "devextreme-react/select-box";
import "src/packages/components/select-field/select-field.scss"
import {ValueChangedEvent} from "devextreme/ui/select_box";
import dxForm from "devextreme/ui/form";
import {Validator} from "devextreme-react";
import {ValidationRule} from "devextreme-react/common";

interface SelectFieldProps extends ISelectBoxOptions {
  formInstance: dxForm
  dataField: string
  items: any[]
  defaultValue?: any
  valueExpr?: string;
  // displayExpr?: string;
  width?: number
  onValueChanged?: (e: ValueChangedEvent) => void;
  validationRules?: ValidationRule[]
  validationGroup?: string;
}

export const SelectField = (
  {
    items,
    defaultValue,
    valueExpr="value",
    displayExpr="text",
    width=270,
    onValueChanged,
    formInstance,
    dataField,
    validationRules,
    validationGroup
  }: SelectFieldProps) => {
  const formData = formInstance?.option("formData");
  const value = formData?.[dataField];
  const handleValueChanged = (e: ValueChangedEvent) => {
    if(onValueChanged) {
      onValueChanged(e)
    } else {
      formInstance.updateData(dataField, e.value)
    }
  }
  return (
    <div className={"select-field flex items-center"}>
      <SelectBox
        className={"ml-2"}
        width={width}
        searchEnabled={true}
        dataSource={items}
        displayExpr={displayExpr}
        valueExpr={valueExpr}
        defaultValue={defaultValue || value}
        validationMessagePosition={'bottom'}
        validationMessageMode={'always'}
        showClearButton
        onValueChanged={handleValueChanged}
      >
        <Validator validationGroup={validationGroup} validationRules={validationRules}>
        </Validator>
      </SelectBox>
    </div>
  )
}
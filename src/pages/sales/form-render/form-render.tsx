import Form, {IItemProps} from "devextreme-react/form";
import {useMemo} from "react";
import {match} from "ts-pattern";
import {RequiredField} from "@packages/common/Validation_Rules";
import {FieldGroup} from "@/pages/sales/form-builder/edit-form";

const formData = {
  CF01: 'This is short name'
}

const customFields: FieldGroup[] = [
  {
    fieldGroup: 'basic',
    code: 'CF01',
    name: 'ShortName',
    dataType: 'text',
    isRequired: true,
    isUnique: false,
    enabled: true,
    isSearchable: true,
    order: 1
  },
  {
    fieldGroup: 'basic',
    code: 'CF02',
    name: 'CustomerGroup',
    dataType: 'multipleChoice',
    isRequired: true,
    isUnique: false,
    enabled: false,
    isSearchable: true,
    singleChoiceValues: [
      {
        'value': 'group1',
        'id': 'group1'
      },
      {
        'value': 'group2',
        'id': 'group2'
      },
      
    ],
    order: 2
  },
]

const mapEditorType = (dataType: string) => {
  return match(dataType)
    .with('multipleChoice', () => 'dxSelectBox')
    .otherwise(() => 'dxTextBox')
}
const mapEditorOption = (field: FieldGroup) => {
  return match(field.dataType)
    .with('multipleChoice', () => {
      return {
        valueExpr: 'id',
        displayExpr: 'value',
        items: field.singleChoiceValues
      }
      
    })
    .otherwise(() => {
      return {}
      
    })
}
export const FormRender = () => {
  const formSettings = useMemo<IItemProps[]>(() => {
    return customFields.map((field) => {
      return {
        itemType: 'simple',
        dataField: field.code,
        editorType: mapEditorType(field.dataType),
        label: {
          text: field.name
        },
        validationMessageMode: 'always',
        editorOptions: mapEditorOption(field),
        validationRules: [
          field.isRequired && RequiredField('ShortCode')
        ]
      }
    })
  }, [])
  return (
    <div>
      Render Form
      <Form className={''} formData={formData} items={formSettings}>
      </Form>
    </div>
  ) 
}
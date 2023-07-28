export interface SingleChoiceValue {
  id: string;
  value: string;
  isSelected?: boolean;
}

export interface FieldGroup {
  fieldGroup: string;
  code: string;
  name: string;
  isRequired: boolean;
  isUnique: boolean;
  dataType: string;
  enabled: boolean;
  isSearchable: boolean;
  searchType?: string;
  order: number;
  singleChoiceValues?: SingleChoiceValue[];
  multiChoiceValues?: SingleChoiceValue[];
  masterDataId?: string;
}

export interface EditFormProps {
  onCancel: () => void;
  onSave: (data: FieldGroup) => void;
}

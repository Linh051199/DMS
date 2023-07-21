import {atom} from "jotai";
import {FieldGroup} from "@/pages/sales/form-builder/types";

export const showPopupAtom = atom<boolean>(false)
export const currentItemAtom = atom<FieldGroup>({ 
  fieldGroup: 'basic',
  code: 'CF01',
  name: 'ShortName',
  dataType: 'text',
  isRequired: true,
  isUnique: false,
  enabled: true,
  isSearchable: true,
  order: 1
})
import { Accordion, CheckBox, DataGrid, Switch } from "devextreme-react";
import Button from "devextreme-react/button";
import { useSetAtom } from "jotai";
import {currentItemAtom, showPopupAtom} from "@/pages/sales/form-builder/store";
import { EditForm } from "@/pages/sales/form-builder/edit-form";
import React, { useReducer, useState } from "react";
import List, { ItemDragging } from "devextreme-react/list";
import { Icon } from "@packages/ui/icons";
import './form-builder.scss';
import {FieldGroup} from "@/pages/sales/form-builder/types";

const customFieldData = [
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
    order: 2
  },
  {
    fieldGroup: 'basic',
    code: 'CF03',
    name: 'CustomerSource',
    dataType: 'singleChoice',
    dataSource: {
      type: 'fixed',
      items: [
        {
          id: 1,
          name: 'Web'
        },
        {
          id: 2,
          name: 'Mobile'
        }
      ]
    },
    isRequired: true,
    isUnique: false,
    enabled: false,
    isSearchable: true,
    order: 3
  },
  {
    fieldGroup: 'contact',
    code: 'CF04',
    name: 'Country',
    dataType: 'singleChoice',
    dataSource: {
      type: 'master',
      sourceId: 'country'
    },
    isRequired: true,
    isUnique: false,
    enabled: false,
    isSearchable: true,
    order: 1
  },
  {
    fieldGroup: 'contact',
    code: 'CF05',
    name: 'Province',
    dataType: 'singleChoice',
    dataSource: {
      type: 'master',
      sourceId: 'province'
    },
    isRequired: true,
    isUnique: false,
    enabled: false,
    isSearchable: true,
    order: 2
  }
];
export const FormBuilderPage = () => {
  const [basicFields, dispatch] = useReducer(
    (state: any, action: any) => {
      // save changes into localStorage
      return action;
    },
    customFieldData.filter(item => item.fieldGroup === 'basic').sort((a, b) => a.order - b.order)
  );
  const [contactFields, changeContactFields] = useReducer(
    (state: any, action: any) => {
      // save changes into localStorage
      return action;
    },
    customFieldData.filter(item => item.fieldGroup === 'contact').sort((a, b) => a.order - b.order)
  );
  const formGroups = [
    {
      key: 'basicInfo',
      title: 'Basic Information',
      items: basicFields
    },
    {
      key: 'contactInfo',
      title: 'Contact Information',
      items: contactFields
    }
  ];
  const setPopupVisible = useSetAtom(showPopupAtom);
  const setCurrentItem = useSetAtom(currentItemAtom);
  const handleSave = (data: FieldGroup) => {
    dispatch([...basicFields, data]);
    setPopupVisible(false);
  };
  const handleEdit = (item: FieldGroup) => {
    setCurrentItem(item)
    setPopupVisible(true)
  };
  const handleDelete = (item: FieldGroup) => {
    if (item.fieldGroup === 'basic') {
      // remove item from basicFields base on the 
      const newFields = basicFields.filter((i: FieldGroup) => i.code !== item.code);
      dispatch(newFields);
    }

  };
  return (
    <div className={'w-full h-full'} id={'form-builder'}>
      <span>Form Build</span>
      <div>
        <Button
          type={"default"}
          text={"Add New"}
          onClick={() => setPopupVisible(true)} />
      </div>
      <EditForm onCancel={() => setPopupVisible(false)}
        onSave={handleSave}
      />
      <Accordion
        multiple={true}
        dataSource={formGroups}
        itemTitleRender={(item) => item.title}
        itemRender={(item) => {
          return (
            <List
              dataSource={item.items}
              keyExpr="code"
              allowItemDeleting={false}
              itemRender={(item) => {
                return (
                  <div className={'w-full flex items-center'}>
                    <div className={'w-[100px]'}>
                      <Button onClick={() => handleEdit(item)} stylingMode={'text'}>
                        <Icon name={'edit'} size={10} />
                      </Button>
                      <Button onClick={() => handleDelete(item)} stylingMode={'text'}>
                        <Icon name={'trash'} color={'#ff0000'} size={10} />
                      </Button>
                    </div>
                    <div className={'w-[100px] items-center'}>{item.code}</div>
                    <div className={'w-[300px]'}>{item.name}</div>
                    <div className={'w-[100px]'}>{item.dataType}</div>
                    <div className={'w-[300px]'}>
                      <CheckBox readOnly={true} stylingMode={'filled'} text={'Required Field'} value={item.isRequired} />
                    </div>
                    <div className={'w-[300px]'}>
                      <CheckBox readOnly={true} stylingMode={'filled'} text={'Unique Field'} value={item.isUnique} />
                    </div>
                    <div className={'w-[300px] flex items-center'}>
                      <Switch value={item.enabled} readOnly={true} stylingMode={'filled'}
                        switchedOnText={'Enabled'} switchedOffText={'Disabled'} />
                      <span className={'ml-3'}>
                        {item.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                );
              }}
            >
              <ItemDragging
                allowReordering={true}
              >
              </ItemDragging>
            </List>
          );
        }}
      />
    </div>
  );
};
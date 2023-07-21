import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useAtomValue } from "jotai";
import {
  currentItemAtom,
  showPopupAtom,
} from "@/pages/sales/form-builder/store";
import Button from "devextreme-react/button";
import { useEffect, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CheckBox, SelectBox } from "devextreme-react";
import TextBox from "devextreme-react/text-box";
import { Icon } from "@packages/ui/icons";
import "./form-builder.scss";
import ScrollView from "devextreme-react/scroll-view";
import {EditFormProps, FieldGroup} from "@/pages/sales/form-builder/types";


const groupDs = [
  {
    value: "basic",
    text: "Basic",
  },
  {
    value: "contact",
    text: "Contact",
  },
  {
    value: "sales",
    text: "Sales",
  },
];
const dataTypes = [
  {
    value: "text",
    text: "Text",
  },
  {
    value: "textarea",
    text: "TextArea",
  },
  {
    value: "checkbox",
    text: "Checkbox",
  },
  {
    value: "singleChoice",
    text: "Single Choice",
  },
  {
    value: "multipleChoice",
    text: "Multiple Choice",
  },
  {
    value: "masterData",
    text: "Master Data",
  },
];

const searchTypes = [
  {
    value: "period",
    text: "In Period",
  },
  {
    value: "contains",
    text: "Contains",
  },
];

const masterDataDs = [
  {
    value: "country",
    text: "Country",
  },
  {
    value: "province",
    text: "Province",
  },
];
const isSearchableType = (dataType: string) => {
  return [
    "singleChoice",
    "multipleChoice",
    "text",
    "textarea",
    "masterData",
  ].includes(dataType);
};

export const EditForm = ({ onCancel, onSave }: EditFormProps) => {
  const popupVisible = useAtomValue(showPopupAtom);
  const currentItem = useAtomValue(currentItemAtom);
  const handleCancel = () => {
    onCancel();
  };
  const handleSave = (data: FieldGroup) => {
    console.log("submit form:", data);
    onSave({ ...data });
    reset();
  };

  const {
    register,
    reset,
    unregister,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldGroup>({
    defaultValues: currentItem,
  });
  const {
    fields: singleChoiceValuesFields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray<FieldGroup>({
    name: "singleChoiceValues",
    control: control,
  });
  const formRef = useRef<HTMLFormElement>(null);
  console.log(JSON.stringify(errors));
  const handleSaveClick = () => {
    triggerSubmit();
  };
  const refSubmitButton = useRef<HTMLButtonElement>(null);
  const triggerSubmit = () => {
    refSubmitButton?.current?.click();
  };
  const dataTypeValue = watch("dataType");
  const isSearchable = watch("isSearchable");
  const choiceValues = watch("singleChoiceValues");
  useEffect(() => {
    if (dataTypeValue !== "singleChoice") {
      unregister("singleChoiceValues");
    }
  }, [dataTypeValue]);

  const renderSelectBox = ({ field, dataSource, label, rules }: any) => {
    const { onChange, ref, ...rest } = field;
    return (
      <div className={"my-2 flex items-center"}>
        <label className={"w-[150px]"}>{label}</label>
        <SelectBox
          {...rest}
          className={"w-full"}
          dataSource={dataSource}
          valueExpr={"value"}
          displayExpr={"text"}
          defaultValue={rest.value}
          onValueChanged={async (e: any) => {
            await onChange({
              target: {
                name: rest.name,
                value: e.value,
              },
            });
          }}
        />
      </div>
    );
  };
  const renderTextBox = ({ field, label }: any) => {
    const { onChange, ref, ...rest } = field;
    return (
      <div className={"my-2 flex items-center"}>
        <label className={"w-[150px]"}>{label}</label>
        <TextBox
          {...rest}
          className={"w-full"}
          defaultValue={rest.value}
          onValueChanged={async (e: any) => {
            await onChange({
              target: {
                name: rest.name,
                value: e.value,
              },
            });
          }}
        />
      </div>
    );
  };
  const renderCheckBox = ({ field, label, rules }: any) => {
    const { onChange, ref, ...rest } = field;
    return (
      <div className={"my-2"}>
        <CheckBox
          {...rest}
          className={"ml-[130px]"}
          defaultValue={rest.value}
          onValueChanged={async (e: any) => {
            await onChange({
              target: {
                name: rest.name,
                value: e.value,
              },
            });
          }}
        />
        <label className={"ml-2"}>{label}</label>
      </div>
    );
  };

  const canAddMore = (choiceValues: any) => {
    return (
      !choiceValues ||
      choiceValues.every((item: any) => {
        return item.value !== "";
      })
    );
  };
  return (
    <Popup
      position={"center"}
      showCloseButton={true}
      onHiding={onCancel}
      title={"Edit Field"}
      visible={popupVisible}
    >
      <ScrollView width={"100%"} height={600}>
        <form id={"editForm"} ref={formRef} onSubmit={handleSubmit(handleSave)}>
          <Controller
            name={"fieldGroup"}
            control={control}
            render={({ field }) => {
              return renderSelectBox({
                field,
                label: "Group",
                dataSource: groupDs,
                rules: { required: true },
              });
            }}
          />
          <Controller
            name={"code"}
            control={control}
            render={({ field }) => {
              return renderTextBox({ field, label: "Field Code" });
            }}
          />
          <Controller
            name={"name"}
            control={control}
            render={({ field }) => {
              return renderTextBox({ field, label: "Field Name" });
            }}
          />
          <Controller
            name={"isRequired"}
            control={control}
            render={({ field }) => {
              return renderCheckBox({
                field,
                label: "Is Required",
                rules: { required: true },
              });
            }}
          />
          <Controller
            name={"isUnique"}
            control={control}
            render={({ field }) => {
              return renderCheckBox({ field, label: "Is Unique" });
            }}
          />
          <Controller
            name={"dataType"}
            control={control}
            render={({ field }) => {
              return renderSelectBox({
                field,
                label: "Data Type",
                dataSource: dataTypes,
              });
            }}
          />
          {(dataTypeValue === "SELECTMULTIPLESELECTBOX" ||
            dataTypeValue === "SELECTMULTIPLEDROPDOWN") && (
            <div className={"w-full ml-[150px]"}>
              {singleChoiceValuesFields.map((field, index) => {
                const { ref, onChange, ...restField } = register(
                  `singleChoiceValues.${index}.value` as const,
                  {
                    required: true,
                  }
                );
                return (
                  <div key={field.id} className={"flex items-center my-2"}>
                    <TextBox
                      {...restField}
                      onValueChanged={async (e: any) => {
                        await onChange({
                          target: {
                            name: restField.name,
                            value: e.value,
                          },
                        });
                      }}
                      validationMessageMode={"always"}
                      isValid={!errors.singleChoiceValues?.[index]}
                    />
                    <Button onClick={() => remove(index)} stylingMode={"text"}>
                      <Icon name={"trash"} size={14} color={"#ff5050"} />
                    </Button>
                  </div>
                );
              })}
              <Button
                type={"default"}
                stylingMode={"text"}
                hoverStateEnabled={false}
                activeStateEnabled={false}
                focusStateEnabled={false}
                onClick={() =>
                  append({
                    value: "",
                    isSelected: false,
                    id: "",
                  })
                }
                disabled={!canAddMore(choiceValues)}
                className={"flex items-center"}
              >
                <Icon name={"plus"} size={20} />
                <span className={"mx-2"}>Add New</span>
              </Button>
            </div>
          )}
          {dataTypeValue === "masterData" && (
            <Controller
              name={"masterDataId"}
              control={control}
              render={({ field }) => {
                return renderSelectBox({
                  field,
                  label: "Data Source",
                  dataSource: masterDataDs,
                });
              }}
            />
          )}
          <Controller
            name={"isSearchable"}
            control={control}
            render={({ field }) => {
              return renderCheckBox({ field, label: "Can search" });
            }}
          />
          {isSearchable && isSearchableType(dataTypeValue) && (
            <Controller
              name={"searchType"}
              control={control}
              render={({ field }) => {
                return renderSelectBox({
                  field,
                  label: "Search Type",
                  dataSource: searchTypes,
                });
              }}
            />
          )}
          <Controller
            name={"enabled"}
            control={control}
            render={({ field }) => {
              return renderCheckBox({ field, label: "Active" });
            }}
          />
          <button
            hidden={true}
            ref={refSubmitButton}
            type={"submit"}
            form={"editForm"}
          />
        </form>
      </ScrollView>
      <ToolbarItem toolbar={"bottom"} location={"center"}>
        <Button
          text={"Save"}
          type={"default"}
          stylingMode={"contained"}
          onClick={handleSaveClick}
        />
        <Button
          text={"Cancel"}
          stylingMode={"contained"}
          onClick={handleCancel}
        />
      </ToolbarItem>
    </Popup>
  );
};

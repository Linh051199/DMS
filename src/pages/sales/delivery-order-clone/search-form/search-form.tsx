import { useI18n } from "@/i18n/useI18n";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { Form, ScrollView } from "devextreme-react";
import { ButtonItem, ButtonOptions, SimpleItem } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { useCallback, useReducer, useRef } from "react";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface ISearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({ data, onSearch }: ISearchFormProps) => {
  const { t } = useI18n("DeliveryCommandPage");
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "delivery-order-list-search-form",
  });

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);

  const formRef = useRef<Form>(null);

  const formData = { ...data };

  const searchFields = [
    {
      visible: true,
      dataField: "DeliveryOrderNo",
      label: {
        text: t("DeliveryOrderNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },
    {
      dataField: "DealerCode",
      label: {
        text: t("DealerCode"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              defaultValue={value}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },
    {
      dataField: "SOCode",
      label: {
        text: t("SOCode"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              defaultValue={value}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },
    {
      dataField: "DeliveryOrderStatus",
      label: {
        text: t("DeliveryOrderStatus"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              items={[
                { text: t("all"), value: "" },
                { text: t("A1"), value: "A1" },
                { text: t("A2"), value: "A2" },
                { text: t("R"), value: "R" },
                { text: t("P"), value: "P" },
              ]}
              defaultValue={value}
              dataField={dataField}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "CarId",
      label: {
        text: t("CarId"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              defaultValue={value}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },
    {
      dataField: "DeliveryVIN",
      label: {
        text: t("DeliveryVIN"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              defaultValue={value}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },
    {
      dataField: "CreatedDateFromTo",
      label: {
        text: t("CreatedDateFromTo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeField
              allowEmpty={true}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "FlagDataWH",
      label: {
        visible: false,
        text: t("FlagDataWH"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];

  const columns: ColumnVisible[] = searchFields.map(
    (field) =>
      ({
        dataField: field.dataField,
        caption: field.label.text,
        visible: true,
      } as ColumnVisible)
  );

  const [visibleColumns, setVisibleColumns] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("search:", formData);
    onSearch(formData);
  };

  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const onHiding = () => {
    chooserVisible.close();
  };

  const onApply = useCallback(
    (changes: any) => {
      // we need check the order of column from changes set
      const latest = [...changes];
      visibleColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      setVisibleColumns(latest);
      chooserVisible.close();
    },
    [setVisibleColumns]
  );
  return (
    <div id={"searchForm"}>
      <Header
        enableColumnToggler={true}
        onToggleSettings={() => {
          chooserVisible.toggle();
        }}
        onCollapse={onClose}
      />
      <ScrollView>
        <form
          className={"h-full relative min-w-[300px]"}
          onSubmit={handleSearch}
        >
          <Form
            ref={formRef}
            formData={formData}
            labelLocation={"top"}
            colCount={1}
            className={"p-2 h-full"}
            scrollingEnabled
            validationGroup={"form"}
          >
            {visibleColumns
              .filter((f) => f.visible)
              .map((field, index) => {
                const found = searchFields.find(
                  (f) => f.dataField == field.dataField
                );
                return <SimpleItem key={index} {...found} />;
              })}
            <ButtonItem horizontalAlignment={"center"} cssClass={"btn-search"}>
              <ButtonOptions
                text={"Search"}
                icon={"search"}
                stylingMode={"contained"}
                width={"90%"}
                type={"default"}
                useSubmitBehavior={true}
                validationGroup={"form"}
              />
            </ButtonItem>
          </Form>
        </form>
        <CustomColumnChooser
          title={t("ToggleColum")}
          applyText={t("Apply")}
          cancelText={t("Cancel")}
          selectAllText={t("SelectAll")}
          container={"#root"}
          button={"#toggle-search-settings"}
          visible={chooserVisible.visible}
          columns={columns}
          onHiding={onHiding}
          onApply={onApply}
          actualColumns={visibleColumns}
          position={"left"}
        />
      </ScrollView>
    </div>
  );
};

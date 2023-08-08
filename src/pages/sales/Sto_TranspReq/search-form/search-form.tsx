import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
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
import { useCallback, useEffect, useReducer, useRef } from "react";

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
  const { t } = useI18n("StoTranspReqPage");
  const chooserVisible = useVisibilityControl({ defaultVisible: false });

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);

  const formRef = useRef<Form>(null);
  const formData = { ...data };

  const searchFields = [
    {
      visible: true,
      dataField: "TranspReqNo",
      label: {
        text: t("TranspReqNo"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
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
      visible: true,
      dataField: "CarId",
      label: {
        text: t("CarId"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
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
      visible: true,
      dataField: "VIN",
      label: {
        text: t("VIN"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
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
      dataField: "TranspReqDtlStatus",
      label: {
        text: t("TranspReqDtlStatus"),
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
                { text: t("All"), value: "" },
                { text: t("A"), value: "A" },
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
      visible: true,
      dataField: "RefOrdNo",
      label: {
        text: t("RefOrdNo"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
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
      visible: true,
      dataField: "TransporterCode",
      label: {
        text: t("TransporterCode"),
      },
      cssClass: "dms-form-field",

      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
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
      dataField: "CreatedDateFromTo",
      label: {
        text: t("CreatedDateFromTo"),
      },
      validationRules: [RequiredField(t("CreatedDateFromToIsRequired"))],
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeField
              allowEmpty={true} // show clear button
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData[dataField]}
              onValueChanged={(e: any) => {
                //exp: => e:  { value: [ "2023-08-01T17:00:00.000Z", "2023-08-06T15:03:34.551Z", ]; }
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

  //   render form fields
  const columns: ColumnVisible[] = searchFields.map(
    (field) =>
      ({
        dataField: field.dataField,
        caption: field.label.text,
        visible: true,
      } as ColumnVisible)
  );

  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("search:", formData);
    onSearch(formData);
  };

  // ===============================toggle columns=======================================
  // lấy cấu hình table local storage key
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "sto-transp-req-search-form",
  });
  // thực hiện dispatch ẩn hiện lưu cấu hình columns
  const [visibleColumns, setVisibleColumns] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );
  //   thực hiện xử lý lưu cấu hình
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        const columnSettings = searchFields.find(
          (c) => c.dataField === column.dataField
        );

        column.visible = filterResult ? filterResult.visible : false;
        return {
          ...columnSettings,
          ...column,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setVisibleColumns(outputColumns);
    }
  }, []);
  //   hàm confirm nếu có thay đổi thì lưu không thì thôi
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
  // đóng popup toggle columns chooser
  const onHiding = () => {
    chooserVisible.close();
  };
  // ===============================toggle columns=======================================

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

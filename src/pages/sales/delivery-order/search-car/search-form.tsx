import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import ScrollView from "devextreme-react/scroll-view";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { Header } from "@packages/ui/search-panel";
import { SelectField } from "@/packages/components/select-field";
import { Mst_Dealer } from "@packages/types";
import { DateField } from "@/packages/components/date-field";
import { NumberRangeField } from "@/packages/components/number-range-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { parse } from "date-fns";
import { useSavedState } from "@packages/ui/base-gridview/components";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  onSearch: (data: any) => void;
  dealerList: Mst_Dealer[];
}

export const SearchForm = ({
  onClose,
  data,
  onSearch,
  dealerList,
}: SearchFormProps) => {
  const { t } = useI18n("DeliveryCommandPage");

  const formRef = useRef<Form>(null);
  const formData = data;
  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("search:", formData);
    onSearch(formData);
  };

  const searchFields = [
    {
      visible: true,
      dataField: "VIN",
      label: {
        text: t("VIN"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={"VIN"}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
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
      dataField: "FlagMappedVIN",
      label: {
        text: t("FlagMappedVIN"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              items={[
                { text: t("all"), value: "" },
                { text: "1", value: "1" },
                { text: "0", value: "0" },
              ]}
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
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              defaultValue={formData?.[dataField]}
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
      dataField: "FlagCancelCar",
      label: {
        text: t("FlagCancelCar"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              items={[
                { text: t("all"), value: "" },
                { text: "1", value: "1" },
                { text: "0", value: "0" },
              ]}
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
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              items={dealerList}
              displayExpr={"DealerName"}
              valueExpr={"DealerCode"}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "FlagAbleToCreateDO",
      label: {
        text: t("FlagAbleToCreateDO"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              items={[
                { text: t("all"), value: "" },
                { text: "1", value: "1" },
                { text: "0", value: "0" },
              ]}
            />
          </div>
        );
      },
    },
    {
      dataField: "FlagCQDate",
      label: {
        text: t("FlagCQDate"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              items={[
                { text: t("all"), value: "" },
                { text: "1", value: "1" },
                { text: "0", value: "0" },
              ]}
            />
          </div>
        );
      },
    },
    {
      dataField: "FlagTaxPaymentDate",
      label: {
        text: t("FlagTaxPaymentDate"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData?.[dataField];
        // log value to console
        console.log("date:", value);
        const dateValue =
          "string" === typeof value && "" !== value
            ? parse(value, "yyyy-MM-dd", new Date())
            : value;

        return (
          <div className={"flex flex-row"}>
            <DateField
              width={280}
              dataField={dataField}
              defaultValue={dateValue ?? undefined}
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
      dataField: "PaymentPercent",
      label: {
        text: t("PaymentPercent"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <NumberRangeField
              width={270}
              min={0}
              max={100}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
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
      dataField: "MonthOrderFrom",
      label: {
        text: t("MonthOrderFrom"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <NumberRangeField
              width={270}
              min={0}
              max={100}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
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
      dataField: "SOApprovedDates",
      label: {
        text: t("SOApprovedDate"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeField
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

    {
      dataField: "DealerContractNo",
      label: {
        text: t("DealerContractNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
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
      dataField: "CarId",
      label: {
        text: t("CarId"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={t("Input")}
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

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "delivery-order-edit-car-search-form",
  });
  const [visibleColumns, setVisibleColumns] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );

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
        column.visible = filterResult ? filterResult.visible : false;
        return column;
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setVisibleColumns(outputColumns);
    }
  }, []);

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

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <div id={"searchForm"} className={"w-[300px]"}>
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

import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { RequiredField } from "@packages/common/Validation_Rules";
import { logger } from "@packages/logger";
import { Mst_Bank, Mst_Dealer } from "@packages/types";
import { Header } from "@packages/ui/search-panel";
import { format, set } from "date-fns";
import { SelectBox } from "devextreme-react";
import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useMemo, useReducer, useRef } from "react";

export const openPopup = atom<boolean>(false);

function generateMonthData(): Date[] {
  const startYear = 1990;
  const startMonth = 0; // January (0-based index)
  const currentYear = new Date().getFullYear();
  const monthData: Date[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    const start = year === startYear ? startMonth : 11;
    for (let month = start; month >= 0; month--) {
      const date = set(new Date(), {
        year: year,
        month: month,
        date: 1,
      });
      if (date <= new Date()) {
        monthData.push(date);
      }
    }
  }
  return monthData;
}

const monthYearDs = generateMonthData();

export interface SearchFormProps {
  dealerList: Mst_Dealer[];
  // bankList: Mst_Bank[];
  onSearch: (data: Partial<any>) => void;
  data: Partial<any>;
}

export const SearchForm = ({ dealerList, onSearch, data }: SearchFormProps) => {
  const { t } = useI18n("Rpt_DLSDealLoanEUBankMarketSum01");
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const searchFields: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "MonthReport",
        visible: true,
        caption: t("MonthReport"),
        editorType: "dxSelectBox",

        render: ({ editorOptions, component: formRef }: any) => {
          return (
            <div className={"flex items-center"}>
              <SelectBox
                {...editorOptions}
                defaultValue={data.DeliveryFrom}
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("DeliveryFrom", e.value);
                }}
              ></SelectBox>
              -
              <SelectBox
                {...editorOptions}
                defaultValue={data.DeliveryTo}
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("DeliveryTo", e.value);
                }}
              ></SelectBox>
            </div>
          );
        },
        editorOptions: {
          dataSource: monthYearDs,
          displayExpr: (item: Date | null) => {
            if (!!item) {
              return format(item, "yyyy-MM");
            }
            return "";
          },
          validationMessageMode: "always",
        },
        validationRules: [RequiredField(t("MonthReportIsRequired"))],
      },

      {
        dataField: "Dealer",
        visible: true,
        caption: t("Dealer"),
        editorType: "dxSelectBox",
        editorOptions: {
          searchEnabled: true,
          dataSource: dealerList ?? [],
          displayExpr: "DealerName",
          valueExpr: "DealerCode",
          validationGroup: "form",
          validationMessageMode: "always",
        },
        // validationRules: [RequiredField(t("DealerCodesAreRequired"))],
      },
    ];
  }, [loadingKey, dealerList]);

  const handleSearch = (e: any) => {
    const data = formRef.current?.instance?.option("formData");
    logger.debug("search:", data);
    onSearch?.(data);
    e.preventDefault();
  };
  const formRef = useRef<Form | null>(null);

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const setOpenPopup = useSetAtom(openPopup);

  const isOpenPopup = useAtomValue(openPopup);

  return (
    <>
      <Header enableColumnToggler={false} onCollapse={onClose} />
      <form className={"h-full"} onSubmit={handleSearch}>
        <Form
          ref={(r) => (formRef.current = r)}
          formData={data}
          labelLocation={"top"}
          colCount={1}
          className={"p-2 h-full"}
          scrollingEnabled
          validationGroup={"form"}
        >
          {searchFields.map((item, idx) => {
            return <SimpleItem key={idx} {...item} />;
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
    </>
  );
};

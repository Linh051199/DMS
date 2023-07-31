import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { logger } from "@/packages/logger";
import { Mst_Bank, Mst_Dealer } from "@/packages/types";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { format, set } from "date-fns";
import { Form, SelectBox } from "devextreme-react";
import { ButtonItem, ButtonOptions, SimpleItem } from "devextreme-react/form";
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

export interface ISearchFormProps {
  dealerList: Mst_Dealer[] | [];
  bankList: Mst_Bank[] | [];
  onSearch: (data: Partial<any>) => void;
  data: Partial<any>;
}

export const SearchForm = ({
  dealerList,
  bankList,
  onSearch,
  data,
}: ISearchFormProps) => {
  const { t } = useI18n("Rpt_DLSDealLoanEUBankMarketSum01");

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopup = useSetAtom(openPopup);
  const isOpenPopup = useAtomValue(openPopup);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const formRef = useRef<Form | null>(null);

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
                defaultValue={data.MonthFrom}
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("MonthFrom", e.value);
                }}
              ></SelectBox>
              -
              <SelectBox
                {...editorOptions}
                defaultValue={data.MonthTo}
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("MonthTo", e.value);
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
      },

      {
        dataField: "Bank",
        visible: true,
        caption: t("Bank"),
        editorType: "dxSelectBox",
        editorOptions: {
          searchEnabled: true,
          dataSource: bankList ?? [],
          displayExpr: "BankName",
          valueExpr: "BankCode",
          validationGroup: "form",
          validationMessageMode: "always",
        },
      },
    ];
  }, [loadingKey, dealerList, bankList]);

  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const handleSearch = (e: any) => {
    const data = formRef.current?.instance?.option("formData");
    logger.debug("search:", data);
    onSearch?.(data);
    e.preventDefault();
  };
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
          <ButtonItem horizontalAlignment={"center"} cssClass={"btn-search"}>
            <ButtonOptions
              text={"Chart"}
              icon={"chart"}
              stylingMode={"contained"}
              width={"90%"}
              type={"default"}
              onClick={() => {
                console.log("object");
                setOpenPopup(!isOpenPopup);
              }}
            />
          </ButtonItem>
        </Form>
      </form>
    </>
  );
};

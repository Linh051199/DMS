import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import React, { useMemo, useReducer, useRef, useState } from "react";
import { ColumnOptions } from "@/types";
import { Button, ScrollView, SelectBox } from "devextreme-react";
import { RequiredField } from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import {
  Mst_Area,
  Mst_Dealer,
  Mst_SalesManType,
  RptHRSalesManParamDto,
} from "@packages/types";
import { getYear, isAfter, isBefore } from "date-fns";
import { nanoid } from "nanoid";
import { Header } from "@packages/ui/search-panel";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

export interface SearchFormProps {
  bankDs: any[];
  dealerDs: any[];
  onSearch: (data: Partial<any>) => void;
  data: Partial<any>;
}

export const isShowChartAtom = atom<boolean | undefined>(undefined);
export const SearchForm = ({
  bankDs,
  dealerDs,
  onSearch,
  data,
}: SearchFormProps) => {
  const [isShowChart, setIsShowChart] = useAtom(isShowChartAtom);
  const { t } = useI18n("RptPmtPaymentLoanBankMarketSum01");
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const newBankDs = [
    {
      BankCode: "",
      BankName: "All",
    },
    ...bankDs,
  ];
  const windowSize = useWindowSize();
  const searchFields: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "MoneyIncomeFrom",
        caption: t("MoneyIncomeFrom"),
        editorType: "dxDateBox",
        visible: true,
        editorOptions: {
          displayFormat: "yyyy-MM-dd",
          openOnFieldClick: true,
          validationMessageMode: "always",
          showClearButton: true,
          max: new Date(),
        },
        validationRules: [
          {
            type: "required",
            ignoreEmptyValue: true,
            validationCallback: (e: any) => {
              if (data.MoneyIncomeTo) {
                return !isAfter(e.value, data.MoneyIncomeTo);
              }
              return true;
            },
            message: t("DateFromMustBeBeforeDateTo"),
          },
        ],
      },
      {
        dataField: "MoneyIncomeTo",
        caption: t("MoneyIncomeTo"),
        editorType: "dxDateBox",
        visible: true,
        editorOptions: {
          displayFormat: "yyyy-MM-dd",
          openOnFieldClick: true,
          validationMessageMode: "always",
          showClearButton: true,
        },
        validationRules: [
          {
            type: "required",
            ignoreEmptyValue: true,
            validationCallback: ({ value }: any) => {
              return !isBefore(value, data.MoneyIncomeFrom);
            },
            message: t("DateToMustBeAfterDateFrom"),
          },
        ],
      },

      {
        dataField: "Dealer",
        caption: t("Dealer"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: dealerDs ?? [],
          valueExpr: "DealerCode",
          displayExpr: "DealerCode",
          searchEnabled: true,
        },
      },
      {
        dataField: "Bank",
        caption: t("Bank"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: newBankDs ?? [],
          valueExpr: "BankCode",
          displayExpr: (e: any) => {
            return `${e.BankCode} - ${e.BankName}`;
          },
          searchEnabled: true,
        },
      },
      {
        dataField: "FlagHTC",
        caption: t("FlagHTC"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: [
            { text: "All", value: "" },
            { text: "HTV", value: "HTV" },
            { text: "HTC", value: "HTC" },
          ],
          valueExpr: "value",
          displayExpr: "text",
          searchEnabled: true,
        },
      },

      {
        dataField: "FlagDataWH",
        visible: true,
        caption: t("FlagDataWH"),
        editorType: "dxCheckBox",
      },
    ];
  }, [loadingKey, dealerDs, bankDs]);

  const handleSearch = (e: any) => {
    const data = formRef.current?.instance?.option("formData");
    onSearch?.(data);
    e.preventDefault();
  };
  const formRef = useRef<Form | null>(null);

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  return (
    <>
      <ScrollView>
        <Header enableColumnToggler={false} onCollapse={onClose} />
        <form className={"h-full"} onSubmit={handleSearch}>
          <Form
            ref={(r) => (formRef.current = r)}
            formData={data}
            labelLocation={"top"}
            height={windowSize.height - 200}
            colCount={1}
            className={"p-2 h-full"}
            scrollingEnabled
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
              />
            </ButtonItem>
            <ButtonItem horizontalAlignment={"center"} cssClass={"btn-search"}>
              <ButtonOptions
                text={"Detail Dealer"}
                icon={"fullscreen"}
                stylingMode={"contained"}
                width={"90%"}
                type={"default"}
                useSubmitBehavior={false}
                onClick={(e: any) => {
                  alert(" ! Chưa có thiết kế nhé !");
                }}
              />
            </ButtonItem>

            <ButtonItem horizontalAlignment={"center"} cssClass={"btn-search"}>
              <ButtonOptions
                text={"Chart"}
                icon={"chart"}
                stylingMode={"contained"}
                width={"90%"}
                type={"default"}
                useSubmitBehavior={false}
                onClick={(e: any) => {
                  console.log("bắn ra popup nè");
                  // showPopup(!true);
                  setIsShowChart(true);
                }}
              />
            </ButtonItem>
          </Form>
        </form>
      </ScrollView>
    </>
  );
};

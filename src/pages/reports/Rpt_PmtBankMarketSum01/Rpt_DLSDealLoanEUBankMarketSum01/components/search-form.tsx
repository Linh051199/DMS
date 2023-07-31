import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ColumnOptions } from "@/types";
import { Button, SelectBox } from "devextreme-react";
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
  const { t } = useI18n("RptPmtQuaranteeBankMarketSum01");
  //   console.log("data:", data);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const windowSize = useWindowSize();
  const listHTCV = [
    {
      title: "All",
      value: "",
    },
    {
      title: "HTC",
      value: "HTC",
    },
    {
      title: "HTV",
      value: "HTV",
    },
  ];

  const listGuaranteeType = [
    {
      title: "All",
      value: "",
    },
    {
      title: "Bảo lãnh",
      value: "BL",
    },
    {
      title: "LC trả chậm",
      value: "LCTC",
    },
    {
      title: "LC Upas",
      value: "LCUP",
    },
  ];
  const listGrtPaidStatus = [
    {
      title: "All",
      value: "",
    },
    {
      title: "Tất toán",
      value: "is not null",
    },
    {
      title: "Chưa tất toán",
      value: "is null",
    },
  ];
  const searchFields: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "OpenDateFrom",
        caption: t("OpenDateFrom"),
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
              // console.log("==event", e);
              if (data.OpenDateTo) {
                return !isAfter(e.value, data.OpenDateTo);
              }
              return true;
            },
            message: t("DateFromMustBeBeforeDateTo"),
          },
        ],
      },
      {
        dataField: "OpenDateTo",
        caption: t("OpenDateTo"),
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
              return !isBefore(value, data.OpenDateFrom);
            },
            message: t("DateToMustBeAfterDateFrom"),
          },
        ],
      },
      {
        dataField: "GuaranteeType",
        caption: t("GuaranteeType"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: listGuaranteeType ?? [],
          valueExpr: "value",
          displayExpr: "title",
          searchEnabled: true,
        },
      },
      {
        dataField: "Bank",
        caption: t("Bank"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: bankDs ?? [],
          valueExpr: "BankCode",
          displayExpr: "BankCode",
          searchEnabled: true,
        },
      },
      {
        dataField: "FlagHTC",
        caption: t("FlagHTC"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: listHTCV ?? [],
          valueExpr: "value",
          displayExpr: "title",
          searchEnabled: true,
        },
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
          // displayExpr: (e: any) => {
          //   return `${e.DealerCode} - ${e.DealerName}`;
          // },
          searchEnabled: true,
        },
      },
      {
        dataField: "GrtPaidStatus",
        caption: t("GrtPaidStatus"),
        visible: true,
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: listGrtPaidStatus ?? [],
          valueExpr: "value",
          displayExpr: "title",
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
      <Header enableColumnToggler={false} onCollapse={onClose} />
      <form className={"h-full"} onSubmit={handleSearch}>
        <Form
          ref={(r) => (formRef.current = r)}
          formData={data}
          labelLocation={"top"}
          colCount={1}
          className={"p-2 h-full"}
          height={windowSize.height - 200}
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
    </>
  );
};

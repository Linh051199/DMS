import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_PivotRetailContractParam } from "@/packages/api/clientgate/Rpt_PivotRetailContractApi";
import { RequiredField, requiredExcludeSpecialCharactersOnlyNumbers } from "@/packages/common/Validation_Rules";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { Mst_Area, Mst_Dealer } from "@/packages/types";
import { Header } from "@/packages/ui/search-panel";
import { getYear, set, subYears } from "date-fns";
import { Form, LoadIndicator, ScrollView } from "devextreme-react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useReducer, useRef, useState } from "react";

import {atom} from "jotai";
import { useVisibilityControl } from "@/packages/hooks";
import { ButtonItem, ButtonOptions, SimpleItem } from "devextreme-react/form";
import { ModalBox } from "@/packages/ui/modal";


export const searchConditionAtom = atom<Partial<Rpt_PivotRetailContractParam>>({})

export interface SearchFormProps {
  formData?: Partial<Rpt_PivotRetailContractParam>;
  dealerDs: any;
  areaDs: any;
  isGettingDealerDs: any;
  isGettingAreaDs: any;
}

const currentYear = getYear(new Date());
const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
  value: currentYear - x,
  text: (currentYear - x).toString(),
}));

export const SearchForm = React.memo(
  function SearchFormRaw({
    formData,
    dealerDs,
    areaDs,
    isGettingAreaDs,
    isGettingDealerDs,
  }: SearchFormProps) {
    const { t } = useI18n("Rpt_PivotRetailContract");
    const api = useClientgateApi();

    const now = new Date();
    const previousYear: number = getYear(subYears(Date.now(), 1));
    const firstDayOfMonth = set(now, { date: 1 });
    //
    const [searchCondition] = useState<Partial<Rpt_PivotRetailContractParam>>({
      CreatedDateFrom: firstDayOfMonth,
      MDDealerCodeConditionList: "",
      MAAreaCodeConditonList: "",
      DateBegin: previousYear,
      TypeReport: 0,
      CountTuan: "",
      FlagDataWH: 0,
      ...formData,
    });

    const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
    const onClose = () => {
      setSearchPanelVisible(false);
    };
    return (
      <div key={"search-form"}>
        <Header enableColumnToggler={false} onCollapse={onClose} />
        <LoadIndicator
          className={"my-auto"}
          visible={isGettingAreaDs || isGettingDealerDs}
        />
        <div id={"search-form-content"}>
          {!!areaDs && !!dealerDs && (
            <SearchFormContent
              areaDs={areaDs}
              dealerDs={dealerDs}
              data={searchCondition}
            />
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return true;
  }
);

const useSearchFields = ({ data, dealerDs, areaDs }: any) => {
  const { t } = useI18n("Rpt_PivotRetailContract");
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  return useMemo(() => {
    return [
      {
        dataField: "TypeReport",
        visible: true,
        caption: t("TypeReport"),
        validationRules: [RequiredField(t("TypeReportIsRequired"))],
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "text",
          valueExpr: "value",
          validationMessageMode: "always",
          validationGroup: "form",
          onValueChanged: (e: any) => {
            // change report type, have to re-render
            reloading();
          },
          dataSource: [
            {
              value: 0,
              text: t("Tuần"),
            },
            {
              value: 1,
              text: t("Tháng"),
            },
          ],
        },
      },
      {
        dataField: "DateBegin",
        visible: true,
        caption: t("DateBegin"),
        editorType: "dxSelectBox",
        validationRules: [RequiredField(t("DateBeginIsRequired"))],
        editorOptions: {
          displayExpr: "text",
          valueExpr: "value",
          items: yearDataSource ?? [],
        },
      },
      {
        dataField: "MAAreaCodeConditonList",
        visible: true,
        caption: t("MAAreaCodeConditonList"),
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: areaDs ?? [],
          displayExpr: "AreaName",
          valueExpr: "AreaCode",
          validationMessageMode: "always",
          searchEnabled: true,
        },
        // validationRules: [RequiredField(t("MAAreaCodeConditonListIsRequired"))],
      },

      {
        dataField: "CreatedDateFrom",
        // visible: data.TypeReport === 1 ? true : false,
        caption: t("CreatedDateFrom"),
        editorType: "dxDateBox",
        editorOptions: {
          displayFormat: "yyyy-MM-dd",
          // disabledDates: true
          DateType: "date",
        },
        validationRules: [RequiredField(t("CreatedDateFromIsRequired"))],
      },

      {
        caption: t("CountTuan"),
        dataField: "CountTuan",
        editorType: "dxTextBox",
        validationRules: [
          RequiredField(t("CountTuanIsRequired")),
          requiredExcludeSpecialCharactersOnlyNumbers,
        ],
        editorOptions: {
          placeholder: t("Input"),
        },
      },
      {
        dataField: "MDDealerCodeConditionList",
        visible: true,
        caption: t("MDDealerCodeConditionList"),
        editorType: "dxSelectBox",
        editorOptions: {
          validationMessageMode: "always",
          dataSource: dealerDs ?? [],
          displayExpr: "DealerName",
          valueExpr: "DealerCode",
          searchEnabled: true,
        },
        // validationRules: [RequiredField(t("MDDealerCodeConditionListIsRequired"))],
      },
      {
        dataField: "FlagDataWH",
        visible: true,
        caption: t("FlagDataWH"),
        editorType: "dxCheckBox",
        editorOptions: {},
        label: {
          location: "left",
        },
      },
    ];
  }, [dealerDs, areaDs, data.TypeReport]);
};

interface SearchFormContentProps {
  areaDs: Mst_Area[];
  dealerDs: Mst_Dealer[];
  data: Partial<Rpt_PivotRetailContractParam>;
}

const SearchFormContent = React.memo(
  ({ areaDs, dealerDs, data }: SearchFormContentProps) => {
    const { t } = useI18n("Rpt_PivotRetailContract");
    const searchFields = useSearchFields({ areaDs, dealerDs, data });

    const formRef = useRef<Form>(null);
    const setSearchCondition = useSetAtom(searchConditionAtom);
    const handleSearch = (e: any) => {
      const formData = formRef.current?.instance?.option("formData");
      // validate
      if (!formData.CreatedDateFrom) {
        alert(t("YearIsRequired"));
      } else {
        // if (formData.HRMonthFrom > formData.HRMonthTo) {
        //   alert(t("YearIsGreaterThan"));
        //  else {
        if (formData.FlagDataWH) {
          confirmBoxVisible.open();
        } else {
          setSearchCondition({ ...formData });
        }
        // }
      }
      e.preventDefault();
    };
    const searchWithFlagDataWH = useCallback(() => {
      const formData = formRef.current?.instance?.option("formData");
      setSearchCondition({ ...formData });
    }, []);
    const confirmBoxVisible = useVisibilityControl({ defaultVisible: false });

    return (
      <ScrollView>
        <form className={"h-full mb-auto"} onSubmit={handleSearch}>
          <Form
            ref={formRef}
            formData={data}
            labelLocation={"top"}
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
          </Form>
        </form>
        <ModalBox
          title={t("Search")}
          onYesClick={searchWithFlagDataWH}
          control={confirmBoxVisible}
        >
          <ModalBox.Slot name={"Bottom"}></ModalBox.Slot>
          <ModalBox.Slot name={"Content"}>
            {t("ConfirmFlagDataWH")}
          </ModalBox.Slot>
        </ModalBox>
      </ScrollView>
    );
  },
  (prev, next) => {
    return true;
  }
);

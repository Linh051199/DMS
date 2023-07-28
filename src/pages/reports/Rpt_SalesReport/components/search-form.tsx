// import { useI18n } from "@/i18n/useI18n";
// import { RequiredField } from "@/packages/common/Validation_Rules";
// import { useVisibilityControl } from "@/packages/hooks";
// import { useWindowSize } from "@/packages/hooks/useWindowSize";
// import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
// import {
//   Mst_CarModel,
//   Mst_Dealer,
//   RptSalesReportParamDto,
// } from "@/packages/types";
// import { ModalBox } from "@/packages/ui/modal/confirmation-box";
// import { Header } from "@/packages/ui/search-panel";
// import { format, set } from "date-fns";
// import { Form, ScrollView } from "devextreme-react";
// import {
//   ButtonItem,
//   ButtonOptions,
//   IItemProps,
//   SimpleItem,
// } from "devextreme-react/form";
// import { useSetAtom } from "jotai";
// import { nanoid } from "nanoid";
// import { useCallback, useMemo, useReducer, useRef } from "react";
// import { toast } from "react-toastify";

// export interface SearchFormProps {
//   dealerDs: Mst_Dealer[];
//   modelDs: Mst_CarModel[];
//   onSearch: (data: Partial<RptSalesReportParamDto>) => void;
//   data: Partial<RptSalesReportParamDto>;
// }

// type NullableDate = Date | null;
// export function generateMonthData(): NullableDate[] {
//   const startYear = 1990;
//   const startMonth = 0; // January (0-based index)
//   const currentYear = new Date().getFullYear();
//   const monthData: NullableDate[] = [null];

//   for (let year = currentYear; year >= startYear; year--) {
//     const start = year === startYear ? startMonth : 11;
//     for (let month = start; month >= 0; month--) {
//       const date = set(new Date(), {
//         year: year,
//         month: month,
//         date: 1,
//       });
//       if (date <= new Date()) {
//         monthData.push(date);
//       }
//     }
//   }
//   return monthData;
// }
// const monthYearDs = generateMonthData();

// export const SearchForm = ({
//   dealerDs,
//   modelDs,
//   onSearch,
//   data,
// }: SearchFormProps) => {
//   const { t } = useI18n("RptStatisticHTCStockOut02");
//   const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
//   const confirmBoxVisible = useVisibilityControl({ defaultVisible: false });
//   const windowSize = useWindowSize();
//   const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

//   const formRef = useRef<Form | null>(null);

//   const searchFields: ColumnOptions[] = useMemo(() => {
//     return [
//       {
//         dataField: "MonthReport",
//         visible: true,
//         caption: t("MonthReport"),
//         editorType: "dxSelectBox",
//         editorOptions: {
//           searchEnabled: true,
//           dataSource: monthYearDs,
//           showClearButton: true,
//           displayExpr: (item: Date | null) => {
//             // console.log('hehehe')
//             if (!!item) {
//               return format(item, "yyyy-MM");
//             } else return null;
//           },
//           validationRules: [RequiredField("IsRequired")],
//           validationMessageMode: "always",
//           validationGroup: "form",
//         },
//         // validationRules: [RequiredField(t("MonthReportIsRequired"))],
//       },
//       {
//         dataField: "ReportBy",
//         visible: true,
//         caption: t("ReportBy"),
//         validationRules: [RequiredField(t("ReportByIsRequired"))],
//         editorType: "dxSelectBox",
//         editorOptions: {
//           displayExpr: "text",
//           valueExpr: "value",
//           validationMessageMode: "always",
//           validationGroup: "form",
//           onValueChanged: (e: any) => {
//             // change report type, have to re-render
//             reloading();
//           },
//           dataSource: [
//             {
//               value: "D",
//               text: t("ByDealer"),
//             },
//             {
//               value: "M",
//               text: t("ByModel"),
//             },
//           ],
//         },
//       },
//       {
//         dataField: "DealerCodes",
//         visible: data.ReportBy === "D",
//         caption: t("DealerCodes"),
//         editorType: "dxTagBox",
//         editorOptions: {
//           multiline: true,
//           hideSelectedItems: true,
//           showSelectionControls: true,
//           showClearButton: true,
//           applyValueMode: "useButtons",
//           searchEnabled: true,
//           height: "auto", // để height auto thì đỡ bị vỡ giao diện
//           // height: 100,
//           dataSource: dealerDs ?? [],
//           displayExpr: "DealerCode",
//           valueExpr: "DealerCode",
//           validationGroup: "form",
//           validationMessageMode: "always",
//         },
//         validationRules: [RequiredField(t("DealerCodesAreRequired"))],
//       },

//       {
//         dataField: "ModelCodes",
//         visible: data.ReportBy === "M",
//         caption: t("ModelCodes"),
//         editorType: "dxTagBox",
//         editorOptions: {
//           multiline: true,
//           hideSelectedItems: true,
//           showSelectionControls: true,
//           applyValueMode: "useButtons",
//           searchEnabled: true,
//           height: "auto", // để height auto thì đỡ bị vỡ giao diện
//           dataSource: modelDs ?? [],
//           displayExpr: "ModelName",
//           valueExpr: "ModelCode",
//           validationMessageMode: "always",
//         },
//         validationRules: [RequiredField(t("ModelCodesAreRequired"))],
//       },
//       {
//         dataField: "FlagDataWH",
//         visible: true,
//         caption: t("FlagDataWH"),
//         editorType: "dxCheckBox",
//         editorOptions: {},
//         label: {
//           location: "right",
//         },
//       },
//     ];
//   }, [loadingKey, dealerDs, modelDs]);

//   //Heaeder
//   const onClose = () => {
//     setSearchPanelVisible(false);
//   };

//   // Handle
//   const handleSearch = (e: any) => {
//     const data = formRef.current?.instance?.option("formData");
//     if (!data.MonthReport) {
//       toast.error(t("MonthReportIsRequired"));
//     } else {
//       if (data.FlagDataWH) {
//         confirmBoxVisible.open();
//       } else {
//         onSearch?.(data);
//       }
//     }
//     e.preventDefault();
//   };

//   //ModalBox
//   const searchWithFlagDataWH = useCallback(() => {
//     const data = formRef.current?.instance?.option("formData");
//     onSearch?.(data);
//   }, []);
//   return (
//     <>
//       <Header enableColumnToggler={false} onCollapse={onClose} />
//       <ScrollView height={windowSize.height - 220}>
//         <form className={"h-full relative"} onSubmit={handleSearch}>
//           <Form
//             ref={(r) => (formRef.current = r)}
//             formData={data}
//             labelLocation={"top"}
//             colCount={1}
//             className={"p-2 h-full"}
//             scrollingEnabled
//             validationGroup={"form"}
//           >
//             {searchFields.map((item, idx) => {
//               return <SimpleItem key={idx} {...item} />;
//             })}
//             <ButtonItem horizontalAlignment={"center"} cssClass={"btn-search"}>
//               <ButtonOptions
//                 text={"Search"}
//                 icon={"search"}
//                 stylingMode={"contained"}
//                 width={"90%"}
//                 type={"default"}
//                 useSubmitBehavior={true}
//                 validationGroup={"form"}
//               />
//             </ButtonItem>
//           </Form>
//         </form>
//       </ScrollView>
//       <ModalBox
//         title={t("Search")}
//         onYesClick={searchWithFlagDataWH}
//         control={confirmBoxVisible}
//       >
//         <ModalBox.Slot name={"Bottom"}></ModalBox.Slot>
//         <ModalBox.Slot name={"Content"}>{t("ConfirmFlagDataWH")}</ModalBox.Slot>
//       </ModalBox>
//     </>
//   );
// };


import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { RequiredField } from "@packages/common/Validation_Rules";
import {
  Mst_CarModel,
  Mst_Dealer,
  RptSalesReportParamDto,
} from "@packages/types";
import { Header } from "@packages/ui/search-panel";
import { format, set } from "date-fns";
import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useReducer, useRef } from "react";
import ScrollView from "devextreme-react/scroll-view";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { ModalBox } from "@packages/ui/modal";
import { useVisibilityControl } from "@packages/hooks";
import {toast} from "react-toastify";

type NullableDate = Date | null
export function generateMonthData(): NullableDate[] {
  const startYear = 1990;
  const startMonth = 0; // January (0-based index)
  const currentYear = new Date().getFullYear();
  const monthData: NullableDate[] = [null];

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
  dealerDs: Mst_Dealer[];
  modelDs: Mst_CarModel[];
  onSearch: (data: Partial<RptSalesReportParamDto>) => void;
  data: Partial<RptSalesReportParamDto>;
}
// console.log(55, monthYearDs)
export const SearchForm = ({
  dealerDs,
  modelDs,
  onSearch,
  data,
}: SearchFormProps) => {
  const { t } = useI18n("RptStatisticHTCStockOut02");
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const searchFields: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "MonthReport",
        visible: true,
        caption: t("MonthReport"),
        editorType: "dxSelectBox",
        editorOptions: {
          searchEnabled: true,
          dataSource: monthYearDs,
          showClearButton: true,
          displayExpr: (item: Date | null) => {
            // console.log('hehehe')
            if (!!item) {
              return format(item, "yyyy-MM");
            } else
              return null
          },
          validationRules: [RequiredField("IsRequired")],
          validationMessageMode: "always",
          validationGroup: "form",
        },
        // validationRules: [RequiredField(t("MonthReportIsRequired"))],
      },
      {
        dataField: "ReportBy",
        visible: true,
        caption: t("ReportBy"),
        validationRules: [RequiredField(t("ReportByIsRequired"))],
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
              value: "D",
              text: t("ByDealer"),
            },
            {
              value: "M",
              text: t("ByModel"),
            },
          ],
        },
      },
      {
        dataField: "DealerCodes",
        visible: data.ReportBy === "D",
        caption: t("DealerCodes"),
        editorType: "dxTagBox",
        editorOptions: {
          multiline: true,
          hideSelectedItems: true,
          showSelectionControls: true,
          showClearButton: true,
          applyValueMode: "useButtons",
          searchEnabled: true,
          height: "auto", // để height auto thì đỡ bị vỡ giao diện
          // height: 100,
          dataSource: dealerDs ?? [],
          displayExpr: "DealerCode",
          valueExpr: "DealerCode",
          validationGroup: "form",
          validationMessageMode: "always",
        },
        validationRules: [RequiredField(t("DealerCodesAreRequired"))],
      },

      {
        dataField: "ModelCodes",
        visible: data.ReportBy === "M",
        caption: t("ModelCodes"),
        editorType: "dxTagBox",
        editorOptions: {
          multiline: true,
          hideSelectedItems: true,
          showSelectionControls: true,
          applyValueMode: "useButtons",
          searchEnabled: true,
          height: "auto", // để height auto thì đỡ bị vỡ giao diện
          dataSource: modelDs ?? [],
          displayExpr: "ModelName",
          valueExpr: "ModelCode",
          validationMessageMode: "always",
        },
        validationRules: [RequiredField(t("ModelCodesAreRequired"))],
      },
      {
        dataField: "FlagDataWH",
        visible: true,
        caption: t("FlagDataWH"),
        editorType: "dxCheckBox",
        editorOptions: {},
        label: {
          location: "right",
        },
      },
    ];
  }, [loadingKey, dealerDs, modelDs]);

  const handleSearch = (e: any) => {
    const data = formRef.current?.instance?.option("formData");
    if(!data.MonthReport) {
      toast.error(t("MonthReportIsRequired"))
    } else {
      if (data.FlagDataWH) {
        confirmBoxVisible.open();
      } else {
        onSearch?.(data);
      }
      
    }
    e.preventDefault();
  };
  const searchWithFlagDataWH = useCallback(() => {
    const data = formRef.current?.instance?.option("formData");
    onSearch?.(data);
  }, []);
  const formRef = useRef<Form | null>(null);

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const onClose = () => {
    setSearchPanelVisible(false);
  };
  const windowSize = useWindowSize();
  const confirmBoxVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <>
      <Header enableColumnToggler={false} onCollapse={onClose} />
      <ScrollView height={windowSize.height - 220}>
        <form className={"h-full relative"} onSubmit={handleSearch}>
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
      </ScrollView>
      <ModalBox
        title={t("Search")}
        onYesClick={searchWithFlagDataWH}
        control={confirmBoxVisible}
      >
        <ModalBox.Slot name={"Bottom"}></ModalBox.Slot>
        <ModalBox.Slot name={"Content"}>{t("ConfirmFlagDataWH")}</ModalBox.Slot>
      </ModalBox>
    </>
  );
};

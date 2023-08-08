import { useI18n } from "@/i18n/useI18n";
import { RequiredField, requiredStringType } from "@/packages/common/Validation_Rules";
import { IItemProps } from "devextreme-react/form";
import { useAtomValue } from "jotai";
import { searchConditionAtom } from "./store";
import { isAfter, isBefore } from "date-fns";

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const useSearchForm = () => {
  const { t } = useI18n("Rpt_ProfileGuaranteeEffect");

  const searchCondition = useAtomValue(searchConditionAtom);

  const searchFiled: IItemProps[] = [
    {
      caption: t("ApprovedDateFrom"),
      dataField: "ApprovedDateFrom",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        ...dateBoxOptions,
        max: new Date(),
      },
      validationRules: [
        RequiredField(t("ApprovedDateFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.ApprovedDateTo) {
              return !isAfter(value, searchCondition.ApprovedDateTo);
            }
            return true;
          },
          message: t("ApprovedDateFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("ApprovedDateTo"),
      dataField: "ApprovedDateTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: dateBoxOptions,
      validationRules: [
        // RequiredField(t("ApprovedDateToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.ApprovedDateFrom);
          },
          message: t("ApprovedDateToMustBeAfterApprovedDateFrom"),
        },
      ],
    },

    {
      caption: t("DateStartFrom"),
      dataField: "DateStartFrom",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        ...dateBoxOptions,
        max: new Date(),
      },
      validationRules: [
        // RequiredField(t("DateStartFromIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            if (searchCondition.DateStartTo) {
              return !isAfter(value, searchCondition.DateStartTo);
            }
            return true;
          },
          message: t("DateStartFromMustBeBeforeDateTo"),
        },
      ],
    },
    {
      caption: t("DateStartTo"),
      dataField: "DateStartTo",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: dateBoxOptions,
      validationRules: [
        // RequiredField(t("DateStartToIsRequired")),
        {
          type: "custom",
          ignoreEmptyValue: true,
          validationCallback: ({ value }: any) => {
            return !isBefore(value, searchCondition.DateStartFrom);
          },
          message: t("DateStartToMustBeAfterDateStartFrom"),
        },
      ],
    },

    {
      dataField: "CarId",
      caption: t("CarId"),
      visible: true,
      editorType: "dxTextBox",
      validationRules: [requiredStringType],
    },

    {
      dataField: "StatusMortageEnd", // tình trạng giao hồ sơ
      caption: t("StatusMortageEnd"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: [
          { title: "Đã giao", value: "A" },
          { title: "Chưa giao", value: "P" },
        ],
        valueExpr: "value",
        displayExpr: "title",
        searchEnabled: true,
      },
    },

    {
      caption: t("StatusMortageEnd"),
      dataField: "StatusMortageEnd",
      editorType: "dxDateBox",
      visible: true,
      editorOptions: dateBoxOptions,
    },

    {
      dataField: "FlagDataWH",
      visible: true,
      caption: t("FlagDataWH"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
      },
    },
  ];

  return searchFiled;
};

import { useI18n } from "@/i18n/useI18n";
import { isAfter, isBefore } from "date-fns";
import { Form } from "devextreme-react";
import {
  ButtonItem,
  ButtonOptions,
  CustomRule,
  Item,
  RequiredRule,
} from "devextreme-react/form";
import { useCallback, useMemo } from "react";

export interface IReportParam {
  Date_From?: Date;
  Date_To?: Date;
  FlagDataWH: boolean;
}

interface IHeaderProps {
  onSearch: (data: IReportParam) => void;
  data: IReportParam;
}

export const Header = ({ onSearch, data }: IHeaderProps) => {
  const { t } = useI18n("DealerStockStatistics");
  const handleSearch = useCallback((e: any) => {
    onSearch(data), (e.cancel = true), e.preventDefault();
  }, []);

  const dateFieldOptions = useMemo(
    () => ({
      validationMessageMode: "always",
      openOnFieldClick: true,
      showClearButton: true,
    }),
    []
  );
  return (
    <form onSubmit={handleSearch}>
      <Form
        labelLocation={"left"}
        colCount={2}
        formData={data}
        validationGroup={"all"}
      >
        <Item itemType={"group"}>
          <Item
            itemType={"simple"}
            dataField={"Date_Form"}
            editorOptions={dateFieldOptions}
            editorType={"dxDateBox"}
          >
            <RequiredRule message={t("FieldIsRequired")} />
            <CustomRule
              ignoreEmptyValue={true}
              type={"custom"}
              message={t("DateFromMustBeBeforeDateTo")}
              validationCallback={({ value }: any) => {
                if (data.Date_To) {
                  return isBefore(value, data.Date_To);
                }
                return true;
              }}
            />
          </Item>
          <Item
            itemType={"simple"}
            dataField={"Date_To"}
            editorType={"dxDateBox"}
            editorOptions={dateFieldOptions}
          >
            <RequiredRule message={t("FieldIsRequired")} />
            <CustomRule
              ignoreEmptyValue={true}
              type={"custom"}
              message={t("DateToMustBeGreaterThanDateFrom")}
              validationCallback={({ value }: any) => {
                if (data.Date_From) {
                  return isAfter(value, data.Date_From);
                }
                return true;
              }}
            />
          </Item>
        </Item>
        <Item
          itemType={"simple"}
          dataField={"FlagDataWH"}
          editorType={"dxCheckBox"}
        />
        <ButtonItem verticalAlignment={"center"} horizontalAlignment={"left"}>
          <ButtonOptions
            text={t("GetData")}
            stylingMode={"contained"}
            type="default"
            useSubmitBehavior={true}
          />
        </ButtonItem>
      </Form>
    </form>
  );
};

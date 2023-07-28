import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { showErrorAtom } from "@/packages/store";
import { Mst_Dealer, Mst_Dealer_Address } from "@/packages/types";
import { format } from "date-fns";
import { Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import { useSetAtom } from "jotai";
import { ForwardedRef, MutableRefObject, forwardRef, useState } from "react";

interface IHeaderFormEditProps {
  code: string;
  dealerList: Mst_Dealer[];
}

export const HeaderFormEdit = forwardRef(
  ({ code, dealerList }: IHeaderFormEditProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("DeliveryOrder");
    const api = useClientgateApi();

    const showError = useSetAtom(showErrorAtom);

    const [formData, setFormData] = useState({
      DeliveryOrderNo: code,
      CreatedDate: new Date(),
      DealerCode: undefined,
    });

    const [dealerAddresses, setDealerAddresses] = useState<
      Mst_Dealer_Address[]
    >([]);

    const handleDealerChanged = async (e: ValueChangedEvent) => {
      if (!ref) {
        return;
      }
      const formRef = ref as MutableRefObject<Form>;
      formRef.current?.instance.updateData("DealerCode", e.value);
      if (e.value !== e.previousValue) {
        formRef.current?.instance.updateData("DealerAddress", undefined);
      }

      // get dealer phone no
      const dealer = dealerList.find((d) => d.DealerCode === e.value);
      if (dealer) {
        formRef.current?.instance.updateData(
          "DealerPhoneNo",
          dealer.DealerPhoneNo
        );
      }
      const formData = formRef.current?.instance.option("formData");
      setFormData(formData);

      if (e.value) {
        // if have value, get addresses of selected dealer.
        const resp = await api.Mst_Dealer_DealerAddressGetByDealerCode(e.value);
        if (resp.isSuccess) {
          setDealerAddresses(resp.DataList ?? []);
        } else {
          showError({
            debugInfo: resp.debugInfo,
            errorInfo: resp.errorInfo,
            message: resp.errorCode,
          });
        }
      }
    };
    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={3}
          formData={formData}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("DeliveryOrderNo"),
              }}
              dataField={"DeliveryOrderNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("CreatedDate"),
              }}
              dataField={"CreatedDate"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={format(value, "yyyy-MM-dd")}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("Dealer"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Dealer")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"DealerCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    formInstance={formInstance}
                    dataField={dataField}
                    items={dealerList}
                    valueExpr={"DealerCode"}
                    displayExpr={(item: any) => {
                      if (!item) {
                        return "";
                      }
                      return `${item.DealerCode} - ${item.DealerName}`;
                    }}
                    onValueChanged={handleDealerChanged}
                    defaultValue={value}
                    validationRules={[RequiredField(t("Dealer"))]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("DeliveryAddress"),
              }}
              isRequired={true}
              dataField={"DeliveryAddress"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    formInstance={formInstance}
                    dataField={dataField}
                    items={dealerAddresses ?? []}
                    valueExpr={"DealerAddress"}
                    displayExpr={"DealerAddress"}
                    defaultValue={value}
                    validationRules={[RequiredField(t("DealerAddress"))]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("DealerPhoneNo"),
              }}
              dataField={"DealerPhoneNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);

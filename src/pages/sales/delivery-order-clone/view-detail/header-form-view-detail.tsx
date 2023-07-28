import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { CarDeliveryOrder } from "@/packages/types";
import { Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";

interface IHeaderFormViewProps {
  data: CarDeliveryOrder;
}

export const HeaderFormViewDeatil = ({ data }: IHeaderFormViewProps) => {
  const { t } = useI18n("DeliveryOrder");

  return (
    <div className={"p-2"}>
      <Form colCount={3} formData={data} labelLocation={"left"}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("DeliveryOrderNo"),
            }}
            dataField={"DeliveryOrderNo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span>{value}</span>;
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
              return <span>{value}</span>;
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("Dealer"),
            }}
            dataField={"DealerCode"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <span>
                  {value} - {formData["md_DealerName"]}
                </span>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("DeliveryAddress"),
            }}
            dataField={"DeliveryAddress"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span>{value}</span>;
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
              return <span>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("DeliveryOrderStatus"),
            }}
            dataField={"DeliveryOrderStatus"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <StatusValue status={value} />;
            }}
          ></SimpleItem>
        </GroupItem>
      </Form>
    </div>
  );
};

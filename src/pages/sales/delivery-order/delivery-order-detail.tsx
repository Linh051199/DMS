import {useI18n} from "@/i18n/useI18n";
import {useParams} from "react-router-dom";
import {DeliveryOrderCreateNew} from "@/pages/sales/delivery-order/create-new/create-new";
import {DeliveryOrderDetailView} from "@/pages/sales/delivery-order/view/view";
export const DeliveryOrderDetailPage = () => {
  const {t} = useI18n("DeliveryOrder");
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? <DeliveryOrderCreateNew /> : <DeliveryOrderDetailView />
};
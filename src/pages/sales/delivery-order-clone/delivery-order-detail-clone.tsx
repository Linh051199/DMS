import {useI18n} from "@/i18n/useI18n";
import {useParams} from "react-router-dom";
import { DeliveryOrderCloneCreateNew } from "./create-new/create-new";
import { DeliveryOrderCloneDetailView } from "./view-detail/view-detail";
export const DeliveryOrderDetailClonePage = () => {
  const {t} = useI18n("DeliveryOrder");
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? <DeliveryOrderCloneCreateNew /> : <DeliveryOrderCloneDetailView />
};

import {useI18n} from "@/i18n/useI18n";
import {useParams} from "react-router-dom";
import { StoTranspReqDetailView } from "./view/view";
import { Sto_TranspReqCreateNew } from "./create-new/create-new";
export const Sto_TranspReqDetailPage = () => {
  const {t} = useI18n("Sto_TranspReq");
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? <Sto_TranspReqCreateNew /> : <StoTranspReqDetailView />
};
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { useQuery } from "@tanstack/react-query";
import { LoadPanel } from "devextreme-react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useMemo, useReducer, useState } from "react";
import { ReportPageHeader } from "@/packages/ui/report-page-header";
import { SearchForm } from "../components/search-form";
import Toolbar from "devextreme-react/toolbar";
import { ResultReport } from "../components/result-report";

interface IReportParam {
  TypeReport: 0 | 1;
  CreatedDateFrom: Date | string | "";
  MDDealerCodeConditionList: string;
  MAAreaCodeConditonList: string;
  DateBegin: string | number;
  CountTuan: string;
  FlagDataWH: 1 | 0;
}

export const Rpt_PivotRetailContract = () => {
  const { t } = useI18n("Rpt_PivotRetailContract");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();

  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API

  const { data: dealerDs, isLoading: isGettingDealerDs } = useQuery(
    ["MstDealer", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "", DealerName: "Tất Cả" }, ...resp.DataList];
      }
    }
  );

  const { data: areaDs, isLoading: isGettingAreaDs } = useQuery(
    ["MstArea", "withAllOption"],
    async () => {
      const resp = await api.Mst_Area_GetAllActive();
      if (resp.DataList) {
        return [{ AreaCode: "", AreaName: "Tất Cả" }, ...resp.DataList];
      }
    }
  );

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const toolbarItems = useMemo(() => {
    return [
      {
        widget: "dxButton",
        location: "before",
        options: {
          icon: "search",
          onClick: handleToggleSearchPanel,
        },
      },
    ];
  }, [handleToggleSearchPanel]);

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <ReportPageHeader title={t("Rpt_PivotRetailContract")} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <LoadPanel visible={isGettingAreaDs || isGettingDealerDs} />
            <SearchForm
              formData={searchCondition}
              dealerDs={dealerDs}
              areaDs={areaDs}
              isGettingAreaDs={isGettingAreaDs}
              isGettingDealerDs={isGettingDealerDs}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <Toolbar items={toolbarItems} />
            <LoadPanel visible={false} />
            <ResultReport />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

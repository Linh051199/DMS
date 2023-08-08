import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Chart, LoadPanel } from "devextreme-react";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import { useReducer } from "react";
import { searchConditionAtom } from "./search-form";
import { useQuery } from "@tanstack/react-query";
import { logger } from "@/packages/logger";
import {
  ArgumentAxis,
  AxisLabel,
  ChartTitle,
  CommonAxisSettings,
  CommonSeriesSettings,
  Format,
  Grid,
  Point,
  Series,
  Size,
  Tooltip,
} from "devextreme-react/chart";

interface HRReportData {
  COLTUAN: string;
  COLTHANG: string;
  COLTONCUOICHUAGIAO: number;
  COLPHATSINHTRONGKY: number;
}

export const ResultReport = () => {
  const { t } = useI18n("Rpt_PivotRetailContract");
  const api = useClientgateApi();
  const searchCondition = useAtomValue(searchConditionAtom);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const {
    data,
    refetch,
    isLoading: isGettingData,
  } = useQuery(
    ["report", "Rpt_PivotRetailContract", JSON.stringify(searchCondition)],
    async () => {
      logger.debug("search Condition before search:", searchCondition);

      const resp = await api.Rpt_PivotRetailContract_Search({
        TypeReport: searchCondition.TypeReport,
        CreatedDateFrom: searchCondition.CreatedDateFrom,
        FlagDataWH: searchCondition.FlagDataWH,
        MDDealerCodeConditionList: searchCondition.MDDealerCodeConditionList,
        MAAreaCodeConditonList: searchCondition.MAAreaCodeConditonList,
        DateBegin: searchCondition.DateBegin,
        CountTuan: searchCondition.CountTuan,
      });

      if (
        resp.isSuccess &&
        resp.Data?.Lst_Rpt_DlrContract &&
        resp.Data?.Lst_Rpt_DlrContract.length > 0
      ) {
        const dataResp = resp.Data?.Lst_Rpt_DlrContract!;
        console.log("dataResp ", dataResp);
        const data = dataResp.reduce<HRReportData[]>(
          (acc: HRReportData[], curr: any) => {
            const existingDataIndex = acc.findIndex((d: any) =>
              searchCondition.TypeReport === 0
                ? d.COLTUAN === curr.COLTUAN
                : d.COLTHANG === curr.COLTHANG
            );
            if (existingDataIndex !== -1) {
              acc[existingDataIndex].COLTONCUOICHUAGIAO = parseInt(
                curr.COLTONCUOICHUAGIAO,
                10
              );
              acc[existingDataIndex].COLPHATSINHTRONGKY = parseInt(
                curr.COLPHATSINHTRONGKY,
                10
              );
              acc[existingDataIndex].COLTUAN = curr.COLTUAN;
              acc[existingDataIndex].COLTHANG = curr.COLTHANG;
            } else {
              acc.push({
                COLTONCUOICHUAGIAO: parseInt(curr.COLTONCUOICHUAGIAO, 10),
                COLPHATSINHTRONGKY: parseInt(curr.COLPHATSINHTRONGKY, 10),
                COLTUAN: curr.COLTUAN,
                COLTHANG: curr.COLTHANG,
              });
            }

            console.log("acc ", acc);

            return acc;
          },
          [] as HRReportData[]
        );
        console.log("data ", data);
        return data;
      }
      return [];
    }
  );

  console.log("🚀 ~ data:", data);

  return (
    <div>
      <LoadPanel visible={isGettingData} />
      {!!data && (
        <Chart className="ml-5" dataSource={data ?? []} width="90%">
          <Size width="90%" height={500} />
          <Tooltip enabled={true}>
            <Format type="fixedPoint" precision={2} />
          </Tooltip>
          <CommonAxisSettings color="#000" />
          <ChartTitle
            horizontalAlignment="center"
            text={t("Rpt_PivotRetailContract Chart")}
          />
          <CommonSeriesSettings
            argumentField={
              searchCondition.TypeReport === 0 ? "COLTUAN" : "COLTHANG"
            }
            type="line"
          />
          <Series
            key="COLTONCUOICHUAGIAO"
            color="green"
            width={0.5}
            name={t("COLTONCUOICHUAGIAO")}
            valueField="COLTONCUOICHUAGIAO"
          >
            <Point visible={true} />
          </Series>
          <Series
            key="COLPHATSINHTRONGKY"
            color="orange"
            width={0.5}
            name={t("COLPHATSINHTRONGKY")}
            valueField="COLPHATSINHTRONGKY"
          >
            <Point visible={true} />
          </Series>
          <ArgumentAxis allowDecimals={false} argumentType="string">
            <AxisLabel format="##" />
            <Grid visible={true} />
          </ArgumentAxis>
        </Chart>
      )}
    </div>
  );
};

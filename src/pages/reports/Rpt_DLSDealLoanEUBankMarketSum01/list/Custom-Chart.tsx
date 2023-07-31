import { useI18n } from "@/i18n/useI18n";
import { Chart } from "devextreme-react";
import { Legend, Margin } from "devextreme-react/bar-gauge";
import {
  ArgumentAxis,
  CommonAxisSettings,
  CommonSeriesSettings,
  Format,
  Grid,
  Series,
  Tooltip,
} from "devextreme-react/chart";
import { Export } from "devextreme-react/data-grid";
import { Label } from "devextreme-react/form";
import React from "react";

export const CustomChart = ({ dataSource }: { dataSource: any[] }) => {
  const { t } = useI18n("Rpt_DLSDealLoanEUBankMarketSum01");
  const listSeries = dataSource.reduce((prev: any, cur: any) => {
    const find = [...prev].some((c: any) => c.name === cur.BankCode);
    if (find) {
      return [...prev];
    } else {
      return [...prev, { value: "BankPercent", name: cur.BankCode }];
    }
  }, []);
  console.log("🚀 ~ listSeries:", listSeries)
  return (
    <React.Fragment>
      <Chart
        palette="Violet"
        dataSource={dataSource}
        title={t("Rpt_DLSDealLoanEUBankMarketSum01")}
      >
        <CommonSeriesSettings argumentField="DealMonth" type="spline" />
        <CommonAxisSettings>
          <Grid visible={true} />
        </CommonAxisSettings>
        {listSeries.map((item: any) => (
          <Series key={item.name} valueField={item.value} name={item.name} />
        ))}
        <Margin bottom={20} />
        <ArgumentAxis allowDecimals={false} axisDivisionFactor={100}>
          <Label>
            <Format type="decimal" />
          </Label>
        </ArgumentAxis>

        <Legend verticalAlignment="bottom" horizontalAlignment="Center" />
        <Export enabled={true} />
        <Tooltip enabled={true} />
      </Chart>
    </React.Fragment>
  );
};

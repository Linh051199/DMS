import PieChart, {
  Label,
  Legend,
  Series,
  Size,
} from "devextreme-react/pie-chart";
import { RptSalesReportRecord } from "@packages/types";

interface ModelChartProps {
  dataSource: RptSalesReportRecord[];
}

export const ModelChart = ({ dataSource }: ModelChartProps) => {
  return (
    <PieChart dataSource={dataSource} palette={"Soft Blue"}>
      <Size width={"50%"} height={400} />
      <Legend visible={false} />
      <Series
        tagField={"ModelName"}
        argumentField={"CVModelCode"}
        valueField={"Total"}
      >
        <Label
          visible={true}
          customizeText={({ percentText, point }: any) =>
            `${point.tag} (${percentText})`
          }
        />
      </Series>
    </PieChart>
  );
};

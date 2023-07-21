import { useI18n } from "@/i18n/useI18n";
import { Rpt_MasterRecord } from "@/packages/api/clientgate/Rpt_MasterApi";
import { uniqueFilterByDataField } from "@/packages/common";
import { ColumnOptions } from "@/types";

interface IUseReportColumnsProps {
  data: Rpt_MasterRecord[];
  columnsMonth?: any;
}

export const useReportColumns = ({
  data,
  columnsMonth,
}: IUseReportColumnsProps) => {
  const { t } = useI18n("Rpt_Master");

  return [
    {
      dataField: "INDEX",
      caption: t("INDEX"),
      visible: true,
      headerFilter: {
        visible: true,
        dataSource: uniqueFilterByDataField(data, "INDEX"),
      },
    },
    {
      visible: true,
      dataField: "CVMODELCODE",
      caption: t("CVMODELCODE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "CVMODELCODE"),
      },
    },
    {
      visible: true,
      dataField: "MODELNAME",
      caption: t("MODELNAME"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "MODELNAME"),
      },
    },
    {
      visible: true,
      dataField: "CVACTUALSPEC",
      caption: t("CVACTUALSPEC"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "CVACTUALSPEC"),
      },
    },
    {
      visible: true,
      dataField: "AC_SPECDESCRIPTION",
      caption: t("AC_SPECDESCRIPTION"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "AC_SPECDESCRIPTION"),
      },
    },
    {
      visible: true,
      dataField: "CVCOLORCODE",
      caption: t("CVCOLORCODE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "CVCOLORCODE"),
      },
    },
    {
      visible: true,
      dataField: "COLORNAME",
      caption: t("COLORNAME"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "COLORNAME"),
      },
    },
    ...columnsMonth,
  ] as ColumnOptions[];
};

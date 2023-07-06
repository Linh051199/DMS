import {useI18n} from "@/i18n/useI18n";
import {RptPaymentRecord} from "@packages/types";
import {ColumnOptions} from "@/types";
import {uniqueFilterByDataField} from "@packages/common";

interface UseRptPayment01ColumnsProps {
  data: RptPaymentRecord[]
}

export const useRptPayment01Columns = ({data}: UseRptPayment01ColumnsProps) => {
  const {t} = useI18n("RptPayment01")
  return [
    {
      caption: t('STT'),
      dataField: 'STT',
      cellRender:({rowIndex}) => {
        return <span>{rowIndex + 1}</span>
      },
      visible: true,
      alignment: 'center',
      allowSorting: false,
      allowFiltering: false
    },
    {
      dataField: "CARID",
      caption: t("CARID"),
      visible: true,
      headerFilter: {
        visible: true,
        dataSource: uniqueFilterByDataField(data, "CARID")
      }
    },
    {
      visible: true,
      dataField: "OSO_APPROVEDDATE2",
      caption: t("OSO_APPROVEDDATE2"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "OSO_APPROVEDDATE2")
      }
    },
    {
      visible: true,
      "dataField": "CARCANCELDATE",
      "caption": t("CARCANCELDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "CARCANCELDATE")
      }
    },
    {
      visible: true,
      "dataField": "PMG_BANKCODE",
      "caption": t("PMG_BANKCODE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PMG_BANKCODE")
      }
    },
    {
      visible: true,
      "dataField": "DUTYCOMPLETEDDATE",
      "caption": t("DUTYCOMPLETEDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DUTYCOMPLETEDDATE")
      }
    },
    {
      visible: true,
      "dataField": "DEALERCODE",
      "caption": t("DEALERCODE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DEALERCODE")
      }
    },
    {
      visible: true,
      "dataField": "DLRCTRNO",
      "caption": t("DLRCTRNO"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DLRCTRNO")
      }
    },
    {
      visible: true,
      "dataField": "FLAGDEALERCONTRACTDMS40",
      "caption": t("FLAGDEALERCONTRACTDMS40"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "FLAGDEALERCONTRACTDMS40")
      }
    },
    {
      visible: true,
      "dataField": "OSOD_DEPOSITDUTYENDDATE",
      "caption": t("OSOD_DEPOSITDUTYENDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "OSOD_DEPOSITDUTYENDDATE")
      }
    },
    {
      visible: true,
      "dataField": "PMG_BANKGUARANTEENO",
      "caption": t("PMG_BANKGUARANTEENO"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PMG_BANKGUARANTEENO")
      }
    },
    {
      visible: true,
      "dataField": "PMG_DATEOPEN",
      "caption": t("PMG_DATEOPEN"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PMG_DATEOPEN")
      }
    },
    {
      visible: true,
      "dataField": "PMGD_GUARANTEEVALUE",
      "caption": t("PMGD_GUARANTEEVALUE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PMGD_GUARANTEEVALUE", t("EmptyValue"))
      }
    },
    {
      visible: true,
      "dataField": "DEBTPOLICY_PAYMENTENDDATE",
      "caption": t("DEBTPOLICY_PAYMENTENDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "DEBTPOLICY_PAYMENTENDDATE", t("EmptyValue"))
      }

    },
    {
      visible: true,
      "dataField": "PMGD_DATESTART",
      "caption": t("PMGD_DATESTART"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PMGD_DATESTART", t("EmptyValue"))
      }
    },
    {
      visible: true,
      "dataField": "TOTALCOMPLETEDDATE",
      "caption": t("TOTALCOMPLETEDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "TOTALCOMPLETEDDATE")
      }
    },
    {
      visible: true,
      "dataField": "PM1_PAYMENTENDDATE",
      "caption": t("PM1_PAYMENTENDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PM1_PAYMENTENDDATE")
      }
    },
    {
      visible: true,
      "dataField": "PM2_PAYMENTENDDATE",
      "caption": t("PM2_PAYMENTENDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PM2_PAYMENTENDDATE")
      }
    },
    {
      visible: true,
      "dataField": "PM3_PAYMENTENDDATE",
      "caption": t("PM3_PAYMENTENDDATE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "PM3_PAYMENTENDDATE")
      }
    },
    {
      visible: true,
      "dataField": "PMGD_GUARANTEEPERCENT",
      "caption": t("PMGD_GUARANTEEPERCENT"),
    },
    {
      visible: true,
      "dataField": "SOCODE",
      "caption": t("SOCODE"),
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "SOCODE")
      }
    }
  ] as ColumnOptions[]
}
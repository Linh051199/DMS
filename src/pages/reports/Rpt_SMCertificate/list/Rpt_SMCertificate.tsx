import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Rpt_SMCertificateParam } from "@/packages/api/clientgate/Rpt_SMCertificateApi";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DataGrid, LoadPanel, PivotGrid, ScrollView } from "devextreme-react";
import {
  Column,
  HeaderFilter,
  Scrolling,
  Sorting,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/page-header";
interface IReportParam {
  HRMonth?: string;
  FlagDataWH: 1 | 0;
}

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

export const Rpt_SMCertificate = () => {
  const { t } = useI18n("Rpt_SMCertificate");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const [transformedOutput, setTransformedOutput] = useState([]);
  const [totalWithAreaCode, setTotalWithAreaCode] = useState([]);
  console.log("🚀 ~ totalWithAreaCode:", totalWithAreaCode);
  const [isGetingData, setGettingData] = useState(false);
  const [searchCondition, setSearchCondition] = useState<IReportParam>(
    {} as IReportParam
  );

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // Call API
  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_SMCertificate_SearchHQ",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        const resp = await api.Rpt_SMCertificate_SearchHQ({
          HRMonth: searchCondition.HRMonth ?? "",
          FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        } as Rpt_SMCertificateParam);
        return resp?.Data?.Lst_Rpt_SMCertificate;
      } else {
        return null;
      }
    },
  });
  console.log("🚀 ~ data:", data);

  //PageHeader
  const handleExportExcel = useCallback(async () => {
    const result = await api.Rpt_SMCertificate_ExportSearchHQ({
      HRMonth: searchCondition.HRMonth ?? "",
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);

  const handleExportExcelDetail = useCallback(async () => {
    const result = await api.Rpt_SMCertificate_ExportSearchDetailHQ({
      HRMonth: searchCondition.HRMonth ?? "",
      FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("DownloadSuccessfully"));
      window.location.href = result.Data;
    }
  }, []);

  const handletoggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  //SearchPanelV2
  const yearDs = useCallback(() => {
    const yearList = [];
    // Set the start and end dates
    const startDate = new Date("2019-01-01");
    const endDate = new Date();

    // Loop through the months from end to start in descending order
    for (
      let date = endDate;
      date >= startDate;
      date.setMonth(date.getMonth() - 1)
    ) {
      const year = date.getFullYear(); // Get the year
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month and pad with leading zero if needed
      const yearMonth = `${year}-${month}`; // Concatenate the year and month
      yearList.push({ year: yearMonth, text: yearMonth });
    }

    return yearList; // Return the generated yearList
  }, [searchCondition, data]);

  const searchFields: IItemProps[] = [
    {
      caption: t("HRMonth"),
      dataField: "HRMonth",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        dataSource: yearDs() ?? [],
        displayExpr: "text",
        valueExpr: "year",
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [RequiredField(t("TDateReportIsRequired"))],
    },
    {
      dataField: "FlagDataWH",
      visible: true,
      caption: t("FlagDataWH"),
      editorType: "dxCheckBox",
      label: {
        location: "left",
      },
    },
  ];

  const handleSearch = useCallback(async (data: IReportParam) => {
    setSearchCondition(searchCondition);
    setGettingData(true);
    reloading();
    // await refetch()
    setGettingData(false);
  }, []);

  useEffect(() => {
    if (data) {
      const newTransformedOutput: any = [];

      for (const item of data) {
        const outputObj = newTransformedOutput.find(
          (obj: any) =>
            obj.DealerCode === item.DealerCode && obj.HRMonth === item.HRMonth
        );

        if (!outputObj) {
          newTransformedOutput.push({
            Id: newTransformedOutput.length + 1,
            AreaCode: item.AreaCode,
            AreaName: item.AreaName,
            DealerCode: item.DealerCode,
            DealerName: item.DealerName,
            HRMonth: item.HRMonth,
            [`TotalQtySM_${item.SMType}`]: item.TotalQtySM,
            [`TotalQtySMOtherNone_${item.SMType}`]: item.TotalQtySMOtherNone,
            [`Rate_${item.SMType}`]: item.Rate,
          });
        } else {
          outputObj[`TotalQtySM_${item.SMType}`] = item.TotalQtySM;
          outputObj[`TotalQtySMOtherNone_${item.SMType}`] =
            item.TotalQtySMOtherNone;
          outputObj[`Rate_${item.SMType}`] = item.Rate;
        }
      }

      setTransformedOutput(newTransformedOutput);

      // =================================================================

      const groupedData: any = {};

      newTransformedOutput.forEach((obj: any) => {
        const key = obj.AreaCode + obj.AreaName;

        if (!groupedData[key]) {
          groupedData[key] = {
            Id: Object.keys(groupedData).length + 1,
            AreaCode: obj.AreaCode,
            AreaName: obj.AreaName,

            TotalQtySM_CVDV: 0,
            TotalQtySMOtherNone_CVDV: 0,
            Rate_CVDV: 0,

            TotalQtySM_KTVD: 0,
            TotalQtySMOtherNone_KTVD: 0,
            Rate_KTVD: 0,

            TotalQtySM_KTVS: 0,
            TotalQtySMOtherNone_KTVS: 0,
            Rate_KTVS: 0,

            TotalQtySM_KTVSCC: 0,
            TotalQtySMOtherNone_KTVSCC: 0,
            Rate_KTVSCC: 0,

            TotalQtySM_GVDTNB: 0,
            TotalQtySMOtherNone_GVDTNB: 0,
            Rate_GVDTNB: 0,

            TotalQtySM_TVBH: 0,
            TotalQtySMOtherNone_TVBH: 0,
            Rate_TVBH: 0,

            TotalQtySM_CSKH: 0,
            TotalQtySMOtherNone_CSKH: 0,
            Rate_CSKH: 0,

            count: 0,
          };
        }
        groupedData[key].TotalQtySM_CVDV += obj.TotalQtySM_CVDV || 0;
        groupedData[key].TotalQtySMOtherNone_CVDV +=
          obj.TotalQtySMOtherNone_CVDV || 0;
        groupedData[key].Rate_CVDV += obj.Rate_CVDV || 0;

        groupedData[key].TotalQtySM_KTVD += obj.TotalQtySM_KTVD || 0;
        groupedData[key].TotalQtySMOtherNone_KTVD +=
          obj.TotalQtySMOtherNone_KTVD || 0;
        groupedData[key].Rate_KTVD += obj.Rate_KTVD || 0;

        groupedData[key].TotalQtySM_KTVS += obj.TotalQtySM_KTVS || 0;
        groupedData[key].TotalQtySMOtherNone_KTVS +=
          obj.TotalQtySMOtherNone_KTVS || 0;
        groupedData[key].Rate_KTVS += obj.Rate_KTVS || 0;

        groupedData[key].TotalQtySM_KTVSCC += obj.TotalQtySM_KTVSCC || 0;
        groupedData[key].TotalQtySMOtherNone_KTVSCC +=
          obj.TotalQtySMOtherNone_KTVSCC || 0;
        groupedData[key].Rate_KTVSCC += obj.Rate_KTVSCC || 0;

        groupedData[key].TotalQtySM_GVDTNB += obj.TotalQtySM_GVDTNB || 0;
        groupedData[key].TotalQtySMOtherNone_GVDTNB +=
          obj.TotalQtySMOtherNone_GVDTNB || 0;
        groupedData[key].Rate_GVDTNB += obj.Rate_GVDTNB || 0;

        groupedData[key].TotalQtySM_TVBH += obj.TotalQtySM_TVBH || 0;
        groupedData[key].TotalQtySMOtherNone_TVBH +=
          obj.TotalQtySMOtherNone_TVBH || 0;
        groupedData[key].Rate_TVBH += obj.Rate_TVBH || 0;

        groupedData[key].TotalQtySM_CSKH += obj.TotalQtySM_CSKH || 0;
        groupedData[key].TotalQtySMOtherNone_CSKH +=
          obj.TotalQtySMOtherNone_CSKH || 0;
        groupedData[key].Rate_CSKH += obj.Rate_CSKH || 0;

        groupedData[key].count++;
      });

      const result: any = Object.values(groupedData).map((group: any) => {
        const {
          Id,
          AreaCode,
          AreaName,

          TotalQtySM_CVDV,
          TotalQtySMOtherNone_CVDV,
          Rate_CVDV,

          TotalQtySM_KTVD,
          TotalQtySMOtherNone_KTVD,
          Rate_KTVD,

          TotalQtySM_KTVS,
          TotalQtySMOtherNone_KTVS,
          Rate_KTVS,

          TotalQtySM_KTVSCC,
          TotalQtySMOtherNone_KTVSCC,
          Rate_KTVSCC,

          TotalQtySM_GVDTNB,
          TotalQtySMOtherNone_GVDTNB,
          Rate_GVDTNB,

          TotalQtySM_TVBH,
          TotalQtySMOtherNone_TVBH,
          Rate_TVBH,

          TotalQtySM_CSKH,
          TotalQtySMOtherNone_CSKH,
          Rate_CSKH,

          count,
        } = group;
        const averageRate_Rate_CSKH = Rate_CSKH / count;
        const averageRate_Rate_CVDV = Rate_CVDV / count;
        const averageRate_Rate_KTVD = Rate_KTVD / count;
        const averageRate_Rate_KTVS = Rate_KTVS / count;
        const averageRate_Rate_KTVSCC = Rate_KTVSCC / count;
        const averageRate_Rate_GVDTNB = Rate_GVDTNB / count;
        const averageRate_Rate_TVBH = Rate_TVBH / count;
        return {
          Id,
          AreaCode,
          AreaName,

          TotalQtySM_CVDV,
          TotalQtySMOtherNone_CVDV,
          Rate_CVDV: averageRate_Rate_CVDV,

          TotalQtySM_KTVD,
          TotalQtySMOtherNone_KTVD,
          Rate_KTVD: averageRate_Rate_KTVD,

          TotalQtySM_KTVS,
          TotalQtySMOtherNone_KTVS,
          Rate_KTVS: averageRate_Rate_KTVS,

          TotalQtySM_KTVSCC,
          TotalQtySMOtherNone_KTVSCC,
          Rate_KTVSCC: averageRate_Rate_KTVSCC,

          TotalQtySM_GVDTNB,
          TotalQtySMOtherNone_GVDTNB,
          Rate_GVDTNB: averageRate_Rate_GVDTNB,

          TotalQtySM_TVBH,
          TotalQtySMOtherNone_TVBH,
          Rate_TVBH: averageRate_Rate_TVBH,

          TotalQtySM_CSKH,
          TotalQtySMOtherNone_CSKH,
          Rate_CSKH: averageRate_Rate_CSKH,
        };
      });

      setTotalWithAreaCode(result);
    }
  }, [data]);
  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        caption: t(""),
        alignment: "center",
        visible: true,
        columns: [
          {
            caption: t("STT"),
            dataField: "Id",
          },

          {
            caption: t("DealerCode"),
            dataField: "DealerCode",
          },

          {
            caption: t("DealerName"),
            dataField: "DealerName",
          },

          {
            caption: t("AreaName"),
            dataField: "AreaName",
          },
        ],
      },

      {
        caption: t("TotalQtySM"),
        alignment: "center",
        columns: [
          {
            dataField: "TotalQtySM_CVDV",
            caption: t("TotalQtySM_CVDV"),
          },
          {
            dataField: "TotalQtySM_KTVD",
            caption: t("TotalQtySM_KTVD"),
          },
          {
            dataField: "TotalQtySM_KTVS",
            caption: t("TotalQtySM_KTVS"),
          },
          {
            dataField: "TotalQtySM_KTVSCC",
            caption: t("TotalQtySM_KTVSCC"),
          },
          {
            dataField: "TotalQtySM_GVDTNB",
            caption: t("TotalQtySM_GVDTNB"),
          },

          {
            dataField: "TotalQtySM_TVBH",
            caption: t("TotalQtySM_TVBH"),
          },
          {
            dataField: "TotalQtySM_CSKH",
            caption: t("TotalQtySM_CSKH"),
          },
        ],
      },

      {
        caption: t("TotalQtySMOtherNone"),
        alignment: "center",
        columns: [
          {
            dataField: "TotalQtySMOtherNone_CVDV",
            caption: t("TotalQtySMOtherNone_CVDV"),
          },

          {
            dataField: "TotalQtySMOtherNone_KTVD",
            caption: t("TotalQtySMOtherNone_KTVD"),
          },
          {
            dataField: "TotalQtySMOtherNone_KTVS",
            caption: t("TotalQtySMOtherNone_KTVS"),
          },

          {
            dataField: "TotalQtySMOtherNone_KTVSCC",
            caption: t("TotalQtySMOtherNone_KTVSCC"),
          },
          {
            dataField: "TotalQtySMOtherNone_GVDTNB",
            caption: t("TotalQtySMOtherNone_GVDTNB"),
          },
          {
            dataField: "TotalQtySMOtherNone_TVBH",
            caption: t("TotalQtySMOtherNone_TVBH"),
          },
          {
            dataField: "TotalQtySMOtherNone_CSKH",
            caption: t("TotalQtySMOtherNone_CSKH"),
          },
        ],
      },
      {
        caption: t("Rate"),
        alignment: "center",
        columns: [
          {
            dataField: "Rate_CVDV",
            caption: t("Rate_CVDV"),
          },

          {
            dataField: "Rate_KTVD",
            caption: t("Rate_KTVD"),
          },
          {
            dataField: "Rate_KTVS",
            caption: t("Rate_KTVS"),
          },

          {
            dataField: "Rate_KTVSCC",
            caption: t("Rate_KTVSCC"),
          },
          {
            dataField: "Rate_GVDTNB",
            caption: t("Rate_GVDTNB"),
          },
          {
            dataField: "Rate_TVBH",
            caption: t("Rate_TVBH"),
          },
          {
            dataField: "Rate_CSKH",
            caption: t("Rate_CSKH"),
          },
        ],
      },
    ],
    [isLoading]
  );

  const columnsWithAreaCode = columns.map((item: any) => {
    if (item.dataField === "DealerCode" || item.dataField === "DealerName") {
      return { ...item, visible: false };
    } else if (item.dataField === "AreaName") {
      return { ...item, width: 445 };
    } else {
      return { ...item, visible: true };
    }
  });

  useEffect(() => {
    searchCondition.HRMonth = "2023-03";
  }, []);

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExportExcelDetail={handleExportExcelDetail}
          onExportExcel={handleExportExcel}
          toggleSearchPanel={handletoggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_CarDeliveryOutButNotDutyComplete-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isGetingData || isLoading}
            />
            <div className={"w-full mt-4"}>
              <ScrollView height={windowSize.height - 120}>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={transformedOutput ?? []}
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
                  // columns={columns}
                  columnAutoWidth={true}
                  allowColumnResizing={false}
                  allowColumnReordering={false}
                  className={"mx-auto my-5"}
                  width={"100%"}
                  height={500}
                >
                  {columns.map((col: any) => (
                    <Column key={col.dataField} {...col} />
                  ))}
                  <HeaderFilter allowSearch={true} visible={true} />
                  <Scrolling showScrollbar={"always"} />
                  <Sorting mode={"none"} />
                </DataGrid>
                <DataGrid
                  id={"gridContainer"}
                  dataSource={totalWithAreaCode ?? []}
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
                  // columns={columnsWithAreaCode}
                  columnAutoWidth={true}
                  allowColumnResizing={true}
                  allowColumnReordering={false}
                  className={"mx-auto my-5"}
                  width={"100%"}
                  columnResizingMode="widget"

                  // height={500}
                >
                  {columnsWithAreaCode.map((col: any) => (
                    <Column key={col.dataField} {...col} />
                  ))}
                  <HeaderFilter allowSearch={true} visible={true} />
                  <Scrolling showScrollbar={"always"} />
                  <Sorting mode={"none"} />
                  <Summary>
                    <TotalItem summaryType="sum" column={"TotalQtySM_CVDV"} />
                    <TotalItem summaryType="sum" column={"TotalQtySM_KTVS"} />
                    <TotalItem summaryType="sum" column={"TotalQtySM_GVDTNB"} />
                    <TotalItem summaryType="sum" column={"TotalQtySM_KTVD"} />
                    <TotalItem summaryType="sum" column={"TotalQtySM_CSKH"} />
                    <TotalItem summaryType="sum" column={"TotalQtySM_TVBH"} />
                    <TotalItem summaryType="sum" column={"TotalQtySM_KTVSCC"} />

                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_CVDV"}
                    />
                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_KTVS"}
                    />
                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_GVDTNB"}
                    />
                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_KTVD"}
                    />
                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_CSKH"}
                    />
                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_TVBH"}
                    />
                    <TotalItem
                      summaryType="sum"
                      column={"TotalQtySMOtherNone_KTVSCC"}
                    />

                    <TotalItem summaryType="avg" column={"Rate_CVDV"} />
                    <TotalItem summaryType="avg" column={"Rate_KTVS"} />
                    <TotalItem summaryType="avg" column={"Rate_GVDTNB"} />
                    <TotalItem summaryType="avg" column={"Rate_KTVD"} />
                    <TotalItem summaryType="avg" column={"Rate_CSKH"} />
                    <TotalItem summaryType="avg" column={"Rate_TVBH"} />
                    <TotalItem summaryType="avg" column={"Rate_KTVSCC"} />
                  </Summary>
                </DataGrid>
              </ScrollView>
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

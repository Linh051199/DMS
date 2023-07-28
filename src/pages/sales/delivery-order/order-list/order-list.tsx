import { BusinessGrid } from "@/packages/components/business-grid";
import { SearchCarDeliveryOrderParam } from "@packages/types";
import { Link } from "@/packages/components/link/link";
import { ToolbarItemProps } from "@/types";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import { useI18n } from "@/i18n/useI18n";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useRef, useState } from "react";
import { StatusValue } from "@/packages/components/status-value/status-value";
import DataGrid from "devextreme-react/data-grid";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { match } from "ts-pattern";
import { LoadPanel } from "devextreme-react";
import { usePermissions } from "@packages/contexts/permission";
import { QueryNames } from "@/pages/sales/delivery-order/delivery-order-common";

interface OrderListProps {
  searchData: Partial<SearchCarDeliveryOrderParam>;
  onViewDetail: (code: string) => void;
}

export const OrderList = ({ searchData, onViewDetail }: OrderListProps) => {
  const { t } = useI18n("DeliveryOrder");
  const [searchCondition, setSearchCondition] = useState(searchData);
  const columns = [
    {
      dataField: "MyIdxSeq",
      visible: true,
      caption: t("STT"),
      cellRender: (e: any) => {
        return <span>{e.value + 1}</span>;
      },
    },
    {
      dataField: "DeliveryOrderNo",
      visible: true,
      caption: t("DeliveryOrderNo"),
      cellRender: (e: any) => {
        return <Link label={e.value} onClick={() => onViewDetail(e.value)} />;
      },
    },
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
    },
    {
      dataField: "md_DealerName",
      visible: true,
      caption: t("md_DealerName"),
    },
    {
      dataField: "CreatedDate",
      visible: true,
      caption: t("CreatedDate"),
    },
    {
      dataField: "ApprovedDate2",
      visible: true,
      caption: t("ApprovedDate2"),
    },
    {
      dataField: "DeliveryOrderStatus",
      visible: true,
      caption: t("DeliveryOrderStatus"),
      cellRender: (e: any) => {
        return <StatusValue status={e.value} />;
      },
    },
  ];
  const showError = useSetAtom(showErrorAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleExportExcelHCare = async () => {
    setIsProcessing(true);
    const resp = await api.CarDeliveryOrder_ExportForHcareHQ(searchCondition);
    setIsProcessing(false);
    if (resp.isSuccess) {
      toast.success(t("ExportExcelSuccess"));
      window.location.href = resp.Data!;
    } else {
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    }
  };
  const handleExportExcel = async () => {
    setIsProcessing(true);
    const resp = await api.CarDeliveryOrder_ExportHQ(searchCondition);
    setIsProcessing(false);
    if (resp.isSuccess) {
      toast.success(t("ExportExcelSuccess"));
      window.location.href = resp.Data!;
    } else {
      showError({
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
        message: resp.errorCode,
      });
    }
  };
  const toolbarItems: ToolbarItemProps[] = [
    {
      location: "before",
      render: () => <ExportExcelButton onClick={handleExportExcel} />,
    },
    {
      location: "before",
      render: () => (
        <BButton
          label={t("ExportExcelHCare")}
          onClick={handleExportExcelHCare}
        />
      ),
    },
  ];
  const { isHQ } = usePermissions();
  const { data, isLoading } = useQuery({
    queryKey: [
      QueryNames.DELIVERY_ORDER,
      QueryNames.LIST_DELIVERY_ORDER,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      const resp = await match(isHQ())
        .with(true, async () => {
          return await api.CarDeliveryOrder_SearchHQ(searchCondition);
        })
        .otherwise(async () => {
          return api.CarDeliveryOrder_SearchDL(searchCondition);
        });
      if (resp.isSuccess) {
        return resp;
      }
    },
  });
  const api = useClientgateApi();

  const handlePageChanged = (pageIndex: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageIndex: pageIndex,
    });
  };
  const handlePageSizeChanged = (pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageSize: pageSize,
    });
  };
  const gridRef = useRef<DataGrid>(null);
  return (
    <div>
      <LoadPanel
        visible={isLoading || isProcessing}
        showIndicator={true}
        showPane={true}
      />
      {!!data && (
        <BusinessGrid
          ref={gridRef}
          data={data.DataList ?? []}
          itemCount={data.ItemCount}
          pageCount={data.PageCount}
          pageIndex={data.PageIndex}
          pageSize={data.PageSize}
          columns={columns}
          toolbarItems={toolbarItems}
          onPageChanged={handlePageChanged}
          onPageSizeChanged={handlePageSizeChanged}
          storeKey={"delivery-order-list-order-list"}
        />
      )}
    </div>
  );
};

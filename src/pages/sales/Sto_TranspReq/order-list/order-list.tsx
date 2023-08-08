import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BusinessGrid } from "@/packages/components/business-grid";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import { Link } from "@/packages/components/link/link";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { usePermissions } from "@/packages/contexts/permission";
import { showErrorAtom } from "@/packages/store";
import { Sto_TranspReq_Search } from "@/packages/types/sales/Sto_TranspReq";
import { Alignment, ToolbarItemProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, LoadPanel } from "devextreme-react";
import { useSetAtom } from "jotai";
import React, { MutableRefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { QueryNames } from "../Sto_TranspReq-common";

interface OrderListProps {
  searchData: Partial<Sto_TranspReq_Search>;
  onViewDetail: (code: string) => void;
}
const DUMMY_DATA = {
  DataList: [
    {
      TranspReqNo: "NO1",
      TransporterCode: "Test1",
      CreatedDate: "2023-04-09",
      ApprovedDate: "2023-09-08",
      TranspReqStatus: "A",
    },
    {
      TranspReqNo: "NO2",
      TransporterCode: "Test2",
      CreatedDate: "2023-04-09",
      ApprovedDate: "2023-09-08",
      TranspReqStatus: "A1",
    },
    {
      TranspReqNo: "NO3",
      TransporterCode: "Test3",
      CreatedDate: "2023-04-09",
      ApprovedDate: "2023-09-08",
      TranspReqStatus: "P",
    },
    {
      TranspReqNo: "NO4",
      TransporterCode: "Test4",
      CreatedDate: "2023-04-09",
      ApprovedDate: "2023-09-08",
      TranspReqStatus: "R",
    },
  ],
  ItemCount: 2,
  PageCount: 1,
  PageIndex: 1,
  PageSize: 100,
};
const OrderList = ({ searchData, onViewDetail }: OrderListProps) => {
  const { t } = useI18n("StoTranspReq");
  const gridRef = useRef<DataGrid>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const showError = useSetAtom(showErrorAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const { isHQ } = usePermissions();
  const [searchCondition, setSearchCondition] = useState(searchData);

  // call data thông qua prop searchData
  const { data, isLoading } = useQuery({
    queryKey: [
      QueryNames.STO_TRANSP_REQ_ORDER,
      QueryNames.LIST_STO_TRANSP_REQ,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (searchCondition.FlagDataWH === true) {
        toast.info(
          `SearchStoTranspReq with API "/StoTranspReq/SearchWHHQ" ( FlagDataWH = ${searchCondition.FlagDataWH} )`
        );
      } else {
        toast.info(
          `SearchStoTranspReq with API  "/StoTranspReq/SearchHQ" ( FlagDataWH = ${searchCondition.FlagDataWH} )`
        );
      }
      /* 
    FlagDataWH = 1 => "/StoTranspReq/SearchWHHQ"
    FlagDataWH = 0 or others => "/StoTranspReq/SearchHQ" 
      */
      // const resp = await match(isHQ())
      //   .with(true, async () => {
      //     return await api.SearchHQ(searchCondition);
      //   })
      //   .otherwise(async () => {
      //     return api.CarDeliveryOrder_SearchDL(searchCondition);
      //   });
      // if (resp.isSuccess) {
      //   setSelectedRowKeys([]);
      //   return resp;
      // }

      // ============= TEST DATA ===============
      if (DUMMY_DATA) {
        // const resp = DUMMY_DATA.map((item, index) => {

        // })
        return DUMMY_DATA;
      } else {
        return null;
      }
    },
  });
  // columns cho table
  const columns = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "TranspReqNo",
      visible: true,
      caption: t("TranspReqNo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              onViewDetail(e.value);
            }}
          />
        );
      },
    },
    {
      dataField: "TransporterCode",
      visible: true,
      caption: t("TransporterCode"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "CreatedDate",
      visible: true,
      caption: t("CreatedDate"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "ApprovedDate",
      visible: true,
      caption: t("ApprovedDate"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "TranspReqStatus",
      caption: t("TranspReqStatus"),
      visible: true,
      width: 200,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <StatusValue status={e.value} />;
      },
    },
  ];

  //================== handle ================
  // export excel
  const handleExportExcel = async () => {
    toast.info(`Excute Export Excel`);
    // setIsProcessing(true);
    // const resp = await api.ExportHQ(searchCondition);
    // setIsProcessing(false);
    // if (resp.isSuccess) {
    //   toast.success(t("ExportExcelSuccess"));
    //   window.location.href = resp.Data!;
    // } else {
    //   showError({
    //     debugInfo: resp.debugInfo,
    //     errorInfo: resp.errorInfo,
    //     message: resp.errorCode,
    //   });
    // }
  };

  // handle print
  const handlePrint = async (transpReqNo: string) => {
    toast.info(`Print with TranspReqNo: ${transpReqNo}`);
    /* 
    FlagDataWH = 1 => "/StoTranspReq/PrintWHHQByTranspReqNo"
    FlagDataWH = 0 or others => "/StoTranspReq/PrintHQByTranspReqNo" 
    */
    // setIsProcessing(true);
    // const resp = await api.PrintTranspReqNo(transpReqNo, isHQ());
    // setIsProcessing(false);
  };
  // change page index => call lại api
  const handlePageChanged = (pageIndex: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageIndex: pageIndex,
    });
  };
  // change size => call lại api
  const handlePageSizeChanged = (pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageSize: pageSize,
    });
  };

  // check checkbox => set selected key
  const handleSelectionChanged = (e: any) => {
    setSelectedRowKeys(e.selectedRowKeys);
  };

  // toggle columns chooser
  const toolbarItems: ToolbarItemProps[] = [
    {
      location: "before",
      render: (gridRef: MutableRefObject<DataGrid>) => {
        return (
          <BButton
            visible={selectedRowKeys && selectedRowKeys.length === 1}
            label={t("Print")}
            onClick={() => handlePrint(selectedRowKeys[0])}
          />
        );
      },
    },
    {
      location: "before",
      render: (gridRef: any) => (
        <ExportExcelButton onClick={handleExportExcel} />
      ),
    },
  ];
  return (
    <div className={"h-full"}>
      <LoadPanel
        // visible={false}
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
          onSelectionChanged={handleSelectionChanged}
          keyExpr={"TranspReqNo"}
          storeKey={"transp-req-no-order-list"}
        />
      )}
    </div>
  );
};

export default OrderList;

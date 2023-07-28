import { useI18n } from "@/i18n/useI18n";
import { BusinessGrid } from "@/packages/components/business-grid";
import { ApiResponse, Car_CarForLXX } from "@/packages/types";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { LoadPanel } from "devextreme-react";
import { ForwardedRef, forwardRef } from "react";
import "./search-result.scss";

interface ISearchResultProps {
  result?: ApiResponse<Car_CarForLXX>;
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
}

export const SearchResults = forwardRef(
  (props: ISearchResultProps, ref: ForwardedRef<any>) => {
    const { t } = useI18n("Common");

    const {
      result = {} as ApiResponse<Car_CarForLXX>,
      toolbarItems,
      isLoading,
      onPageSizeChanged,
      onPageChanged,
    } = props;

    const columns: ColumnOptions[] = [
      {
        dataField: "MyIdxSeq",
        visible: true,
        caption: t("STT"),
        cellRender: ({ rowIndex }: any) => {
          return <span>{rowIndex + 1}</span>;
        },
      },
      {
        dataField: "CarId",
        visible: true,
        caption: t("CarId"),
      },
      {
        dataField: "DealerCode",
        visible: true,
        caption: t("DealerCode"),
      },
      {
        dataField: "OSOSOCode",
        visible: true,
        caption: t("OSOSOCode"),
      },
      {
        dataField: "OSODApprovedDate",
        visible: true,
        caption: t("OSODApprovedDate"),
      },
      {
        dataField: "VIN",
        visible: true,
        caption: t("VIN"),
      },
      {
        dataField: "ModelCode",
        visible: true,
        caption: t("ModelCode"),
      },
      {
        dataField: "ModelName",
        visible: true,
        caption: t("ModelName"),
      },
      {
        dataField: "SpecCode",
        visible: true,
        caption: t("SpecCode"),
      },
      {
        dataField: "SpecDescription",
        visible: true,
        caption: t("SpecDescription"),
      },
      {
        dataField: "VINColorCode",
        visible: true,
        caption: t("VINColorCode"),
      },
      {
        dataField: "VIN_Color_VN_Combined",
        visible: true,
        caption: t("VIN_Color_VN_Combined"),
      },
      {
        dataField: "STORAGECODECURRENT",
        visible: true,
        caption: t("STORAGECODECURRENT"),
      },
      {
        dataField: "UNITPRICEACTUAL",
        visible: true,
        caption: t("UNITPRICEACTUAL"),
      },
      {
        dataField: "PMPDAMOUNTTOTAL",
        visible: true,
        caption: t("PMPDAMOUNTTOTAL"),
      },
      {
        dataField: "Payment_Deposit_Percent",
        visible: true,
        caption: t("Payment_Deposit_Percent"),
      },
      {
        dataField: "Grt_Percent",
        visible: true,
        caption: t("Grt_Percent"),
      },
      {
        dataField: "Payment_Percent",
        visible: true,
        caption: t("Payment_Percent"),
      },
      {
        dataField: "DutyCompleted_Percent",
        visible: true,
        caption: t("DutyCompleted_Percent"),
      },
      {
        dataField: "DutyCompleted_Percent_AF",
        visible: true,
        caption: t("DutyCompleted_Percent_AF"),
      },
      {
        dataField: "CarCancelRemark",
        visible: true,
        caption: t("CarCancelRemark"),
      },
      {
        dataField: "MapVINDate",
        visible: true,
        caption: t("MapVINDate"),
      },
      {
        dataField: "SSR_REARRANGESTATUS",
        visible: true,
        caption: t("SSR_REARRANGESTATUS"),
      },
      {
        dataField: "OCNCode",
        visible: true,
        caption: t("OCNCode"),
      },
      {
        dataField: "CVEngineNo",
        visible: true,
        caption: t("CVEngineNo"),
      },
      {
        dataField: "DlrCtrNo",
        visible: true,
        caption: t("DlrCtrNo"),
      },
    ];

    //Handle actions
    const handlePageChanged = (pageIndex: number) => {
      onPageChanged?.(pageIndex);
    };
    const handlePageSizeChanged = (pageSize: number) => {
      onPageSizeChanged?.(pageSize);
    };

    return (
      <div className="search-results">
        <LoadPanel visible={isLoading} showIndicator={true} showPane={true} />
        {!isLoading && (
          <BusinessGrid
            isLoading={isLoading}
            ref={ref}
            data={result.DataList ?? []}
            columns={columns}
            toolbarItems={toolbarItems ?? []}
            itemCount={result.ItemCount}
            pageCount={result.PageCount}
            pageIndex={result.PageIndex}
            pageSize={result.PageSize}
            onPageChanged={handlePageChanged}
            onPageSizeChanged={handlePageSizeChanged}
            storeKey={"delivery-order-detail-car-search-result-list"}
          />
        )}
      </div>
    );
  }
);

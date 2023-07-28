import {Popup, Position, ToolbarItem} from "devextreme-react/popup";
import {useI18n} from "@/i18n/useI18n";
import {SearchForm} from "@/pages/sales/delivery-order/search-car/search-form";
import {WithSearchPanelLayout} from "@/packages/components/layout/layout-with-search-panel";
import {VisibilityControl} from "@packages/hooks";
import {useQuery} from "@tanstack/react-query";
import {useClientgateApi} from "@packages/api";
import {useCallback, useReducer, useRef, useState} from "react";
import {useSetAtom} from "jotai";
import {showErrorAtom} from "@packages/store";
import {Car_CarForLXX, Car_CarForLXXSearch} from "@packages/types";
import {SearchResults} from "@/pages/sales/delivery-order/search-car/search-result";
import {Button, DataGrid, LoadPanel} from "devextreme-react";
import {Icon} from "@packages/ui/icons";
import {useAuth} from "@packages/contexts/auth";
import {match} from "ts-pattern";
import {nanoid} from "nanoid";
import {usePermissions} from "@packages/contexts/permission";

interface SearchCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right"
  onHidding: () => void;
  onSelectedCars: (cars: Car_CarForLXX[]) => void;
}

export const SearchCar = (
  {
    visible,
    container,
    position,
    onHidding,
    onSelectedCars
  }: SearchCarProps) => {
  const {t} = useI18n("SearchCar");

  const [isLoading, setIsLoading] = useState(false)
  const handleSearch = async (data: any) => {
    setSearchCondition(data)
    setIsLoading(true)
    reloading()
    await refetch();
    setIsLoading(false)
  }
  const api = useClientgateApi()
  const {isHQ} = usePermissions()
  const showError = useSetAtom(showErrorAtom)
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const {data: carListResponse, refetch, remove: removeCache, isLoading: carListLoading, isRefetching} = useQuery({
    enabled: loadingKey !== "0",
    queryKey: ["DeliveryOrder", "carList", loadingKey],
    queryFn: async () => {
      const resp = await match(isHQ())
        .with(true, async () => await api.CarCar_SearchWHForLXXHQ(searchCondition))
        .otherwise(async () => {
          return await api.CarCar_SearchWHForLXXDL(searchCondition)
        })
      
      if (resp.isSuccess) {
        return resp
      } else {
        showError({
          debugInfo: resp.debugInfo,
          errorInfo: resp.errorInfo,
          message: resp.errorCode,
        })
      }
    }
  })

  const {data: dealerList} = useQuery({
    queryKey: ["DeliveryOrder", "dealerList"],
    queryFn: async () => {
      const resp = await api.Mst_Dealer_GetAllActive()
      if (resp.isSuccess) {
        return resp.DataList
      }
      return []
    }
  })
  const [searchCondition, setSearchCondition] = useState<Partial<Car_CarForLXXSearch>>({
    FlagMappedVIN: "",
    FlagCancelCar: "",
    FlagAbleToCreateDO: "",
    VIN: "",
    SOCode: "",
    DealerCode: "",
    FlagCQDate: "",
    FlagTaxPaymentDate: "",
    CarId: "",
    DealerContractNo: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    PaymentPercentFrom: "",
    PaymentPercentTo: "",
    MonthOrderFrom: "",
    MonthOrderTo: "",
    SOApprovedDateFrom: "",
    SOApprovedDateTo: ""
  })
  const renderSearchForm = useCallback((control: VisibilityControl) => {
    return <SearchForm
      data={searchCondition}
      onClose={() => control.close()}
      onSearch={handleSearch}
      dealerList={dealerList ?? []}
    />
  }, [dealerList, searchCondition])

  const handleSelect = async () => {
    const items = resultRef.current?.instance.getSelectedRowsData() as Car_CarForLXX[]
    onSelectedCars(items)
    resultRef.current?.instance.clearSelection()
    onHidding()
    await removeCache()
  }
  const handlePageChanged = async (pageIndex: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageIndex: pageIndex
    })
    if(loadingKey !== "0") {
      reloading()
    }
    
  }
  const handlePageSizeChanged = async (pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageSize: pageSize
    })
    if(loadingKey !== "0") {
      reloading()
    }
  }
  const resultRef = useRef<DataGrid>(null)
  return (
    <Popup
      visible={visible}
      title={t("SearchCar")}
      container={container}
      showCloseButton={true}
      onHiding={onHidding}
    >
      <Position
        at={`${position} top`}
        my={`${position} top`}
        of={`${container}`}
        offset={{x: 100, y: 100}}
      />
      <WithSearchPanelLayout
        searchPanelRender={renderSearchForm}
        contentPanelRender={(control: VisibilityControl) => (
          <div className={'flex h-full justify-center'}>
            <LoadPanel visible={isRefetching || carListLoading} showPane={true} showIndicator={true} />
            <SearchResults
              isLoading={isLoading}
              toolbarItems={[
                {
                  location: "before",
                  render: () => (
                    <Button
                      visible={!control.visible}
                      stylingMode={'text'}
                      onClick={() => control.toggle()}>
                      <Icon name={"search"}/>
                    </Button>
                  )
                }
              ]}
              ref={resultRef}
              result={carListResponse}
              onPageSizeChanged={handlePageSizeChanged}
              onPageChanged={handlePageChanged}
            />
          </div>
        )}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Select"),
          type: "default",
          stylingMode: "contained",
          onClick: handleSelect
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Cancel"),
          onClick: onHidding
        }}
      />
    </Popup>
  )
}
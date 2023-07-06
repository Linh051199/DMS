import { AxiosInstance } from "axios";
import {
  ApiResponse,
  CarDeliveryOrderResponse,
  CarDeliveryOrder,
  SearchCarDeliveryOrderParam,
  CarDeliveryOrderDetail,
} from "@packages/types";
import { formatDate } from "@packages/common/date_utils";


export const useCarDeliveryOrder = (apiBase: AxiosInstance) => {
  return {
    CarDeliveryOrder_Approve1ConfirmHQ: async (orderNo: string) => {
      return await apiBase.post<CarDeliveryOrderResponse, ApiResponse<string>>(
        "/CarDeliveryOrder/Approve1ConfirmHQ",
        {
          DeliveryOrderNo: orderNo
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
    },
    CarDeliveryOrder_Approve1RejectHQ: async (orderNo: string) => {
      return await apiBase.post<CarDeliveryOrderResponse, ApiResponse<string>>(
        "/CarDeliveryOrder/Approve1RejectHQ",
        {
          DeliveryOrderNo: orderNo
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
    },
    CarDeliveryOrder_Approve2ConfirmHQ: async (orderNo: string) => {
      return await apiBase.post<CarDeliveryOrderResponse, ApiResponse<string>>(
        "/CarDeliveryOrder/Approve2ConfirmHQ",
        {
          DeliveryOrderNo: orderNo
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
    },
    CarDeliveryOrder_Approve2RejectHQ: async (orderNo: string) => {
      return await apiBase.post<CarDeliveryOrderResponse, ApiResponse<string>>(
        "/CarDeliveryOrder/Approve2RejectHQ",
        {
          DeliveryOrderNo: orderNo
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
    },
    CarDeliveryOrder_DeleteDetailMultiHQ: async (order: CarDeliveryOrder, cars: CarDeliveryOrderDetail[]) => {
      return await apiBase.post<CarDeliveryOrderResponse, ApiResponse<string>>(
        "/CarDeliveryOrder/DeleteDetailMultiHQ",
        {
          strJson: JSON.stringify({
            Car_DeliveryOrder: {
              DeliveryOrderNo: order.DeliveryOrderNo
            },
            Lst_Car_DeliveryOrderDetail: cars.map(car => ({
              CarId: car.CarId
            }))
          })
        },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    },
    CarDeliveryOrder_ExportForHcareDL: async (param: Partial<SearchCarDeliveryOrderParam>) => {
      const searchParam = {
        ...param
      };
      if (param.CreatedDates) {
        searchParam.CreatedDateFrom = param.CreatedDates[0] ? formatDate(param.CreatedDates[0]) : "";
        searchParam.CreatedDateTo = param.CreatedDates[1] ? formatDate(param.CreatedDates[1]) : "";
      }
      delete searchParam.CreatedDates;
      return await apiBase.post<Partial<SearchCarDeliveryOrderParam>, ApiResponse<string>>(
        "/CarDeliveryOrder/ExportForHcareDL",
        {
          ...searchParam
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_ExportForHcareHQ: async (param: Partial<SearchCarDeliveryOrderParam>) => {
      const searchParam = {
        ...param
      };
      if (param.CreatedDates) {
        searchParam.CreatedDateFrom = param.CreatedDates[0] ? formatDate(param.CreatedDates[0]) : "";
        searchParam.CreatedDateTo = param.CreatedDates[1] ? formatDate(param.CreatedDates[1]) : "";
      }
      delete searchParam.CreatedDates;
      return await apiBase.post<Partial<SearchCarDeliveryOrderParam>, ApiResponse<string>>(
        "/CarDeliveryOrder/ExportForHcareHQ",
        {
          ...searchParam
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_ExportDL: async (param: Partial<SearchCarDeliveryOrderParam>) => {
      const searchParam = {
        ...param
      };
      if (param.CreatedDates) {
        searchParam.CreatedDateFrom = param.CreatedDates[0] ? formatDate(param.CreatedDates[0]) : "";
        searchParam.CreatedDateTo = param.CreatedDates[1] ? formatDate(param.CreatedDates[1]) : "";
      }
      delete searchParam.CreatedDates;
      return await apiBase.post<Partial<SearchCarDeliveryOrderParam>, ApiResponse<string>>(
        "/CarDeliveryOrder/ExportDL",
        {
          ...searchParam
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_ExportHQ: async (param: Partial<SearchCarDeliveryOrderParam>) => {
      const searchParam = {
        ...param
      };
      if (param.CreatedDates) {
        searchParam.CreatedDateFrom = param.CreatedDates[0] ? formatDate(param.CreatedDates[0]) : "";
        searchParam.CreatedDateTo = param.CreatedDates[1] ? formatDate(param.CreatedDates[1]) : "";
      }
      delete searchParam.CreatedDates;
      return await apiBase.post<Partial<SearchCarDeliveryOrderParam>, ApiResponse<string>>(
        "/CarDeliveryOrder/ExportHQ",
        {
          ...searchParam
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_CreateDL: async (order: any, selectedCars: any[]): Promise<ApiResponse<CarDeliveryOrderResponse>> => {
      const data = {
        Car_DeliveryOrder: {
          ...order,
          TransportCompanyName: "",
          TransportCompanyPhoneNo: "",
          TransportCompanyFaxNo: ""
        },
        Lst_Car_DeliveryOrderDetail: selectedCars.map((car) => ({
          CarId: car.CarId,
          StorageCode: car.STORAGECODECURRENT,
          DeliveryVIN: car.VIN
        }))
      }
      return await apiBase.post<any, ApiResponse<CarDeliveryOrderResponse>>(
        "/CarDeliveryOrder/CreateDL",
        {
          strJson: JSON.stringify(data)
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_SearchHQ: async (
      param: Partial<SearchCarDeliveryOrderParam>
    ): Promise<ApiResponse<CarDeliveryOrder>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0"
      };
      if (param.CreatedDates) {
        searchParam.CreatedDateFrom = param.CreatedDates[0] ? formatDate(param.CreatedDates[0]) : "";
        searchParam.CreatedDateTo = param.CreatedDates[1] ? formatDate(param.CreatedDates[1]) : "";
      }
      delete searchParam.CreatedDates;
      return await apiBase.post<Partial<SearchCarDeliveryOrderParam>, ApiResponse<CarDeliveryOrder>>(
        param.FlagDataWH ? "/CarDeliveryOrder/SearchWHHQ": "/CarDeliveryOrder/SearchHQ",
        {
          ...searchParam
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_SearchDL: async (
      param: Partial<SearchCarDeliveryOrderParam>
    ): Promise<ApiResponse<CarDeliveryOrder>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0"
      };
      if (param.CreatedDates) {
        searchParam.CreatedDateFrom = param.CreatedDates[0] ? formatDate(param.CreatedDates[0]) : "";
        searchParam.CreatedDateTo = param.CreatedDates[1] ? formatDate(param.CreatedDates[1]) : "";
      }
      delete searchParam.CreatedDates;
      return await apiBase.post<Partial<SearchCarDeliveryOrderParam>, ApiResponse<CarDeliveryOrder>>(
        param.FlagDataWH ? "/CarDeliveryOrder/SearchWHDL": "/CarDeliveryOrder/SearchDL",
        {
          ...searchParam
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    },
    CarDeliveryOrder_GetHQByDeliveryOrderNo: async (
      DeliveryOrderNo: string
    ): Promise<ApiResponse<CarDeliveryOrderResponse>> => {
      return await apiBase.post<string, ApiResponse<CarDeliveryOrderResponse>>(
        "/CarDeliveryOrder/GetHQByDeliveryOrderNo",
        {DeliveryOrderNo}
      ); 
    },
    CarDeliveryOrder_GetDLByDeliveryOrderNo: async (
      DeliveryOrderNo: string
    ): Promise<ApiResponse<CarDeliveryOrderResponse>> => {
      return await apiBase.post<string, ApiResponse<CarDeliveryOrderResponse>>(
        "/CarDeliveryOrder/GetDLByDeliveryOrderNo",
        {DeliveryOrderNo}
      );
    },
    CarDeliveryOrder_GetSeqForCarDeliveryOrder: async () => {
      return await apiBase.post<string, ApiResponse<string>>(
        "/CarDeliveryOrder/GetSeqForCarDeliveryOrder"
      );
    }
  };
};
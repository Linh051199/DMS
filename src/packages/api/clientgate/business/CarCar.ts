import { AxiosInstance } from "axios";
import {
  ApiResponse,
  Car_CarForLXXSearch, Car_CarForLXX,
} from "@packages/types";
import { formatDate } from "@packages/common/date_utils";


export const useCarCarService = (apiBase: AxiosInstance) => {
  return {
    CarCar_SearchWHForLXXDL: async (
      param: Partial<Car_CarForLXXSearch>
    ): Promise<ApiResponse<Car_CarForLXX>> => {
      const searchParam = {
        ...param
      };
      if (param.SOApprovedDates) {
        searchParam.SOApprovedDateFrom = param.SOApprovedDates[0] ? formatDate(param.SOApprovedDates[0]) : undefined;
        searchParam.SOApprovedDateTo = param.SOApprovedDates[1] ? formatDate(param.SOApprovedDates[1]) : undefined;
      }
      delete searchParam.SOApprovedDates;
      if(param.MonthOrders) {
        searchParam.MonthOrderFrom = param.MonthOrders[0] ? param.MonthOrders[0] : undefined;
        searchParam.MonthOrderTo = param.MonthOrders[1] ? param.MonthOrders[1] : undefined;
      }
      delete searchParam.MonthOrders;
      if(param.PaymentPercents) {
        searchParam.PaymentPercentFrom = param.PaymentPercents[0] ? param.PaymentPercents[0] : undefined;
        searchParam.PaymentPercentTo = param.PaymentPercents[1] ? param.PaymentPercents[1] : undefined;
      }
      delete searchParam.PaymentPercents;
      return await apiBase.post<Partial<Car_CarForLXXSearch>, ApiResponse<Car_CarForLXX>>(
        "/CarCar/SearchWHForLXXDL",
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
    CarCar_SearchWHForLXXHQ: async (
      param: Partial<Car_CarForLXXSearch>
    ): Promise<ApiResponse<Car_CarForLXX>> => {
      const searchParam = {
        ...param
      };
      if (param.SOApprovedDates) {
        searchParam.SOApprovedDateFrom = param.SOApprovedDates[0] ? formatDate(param.SOApprovedDates[0]) : undefined;
        searchParam.SOApprovedDateTo = param.SOApprovedDates[1] ? formatDate(param.SOApprovedDates[1]) : undefined;
      }
      delete searchParam.SOApprovedDates;
      if(param.MonthOrders) {
        searchParam.MonthOrderFrom = param.MonthOrders[0] ? param.MonthOrders[0] : undefined;
        searchParam.MonthOrderTo = param.MonthOrders[1] ? param.MonthOrders[1] : undefined;
      }
      delete searchParam.MonthOrders;
      if(param.PaymentPercents) {
        searchParam.PaymentPercentFrom = param.PaymentPercents[0] ? param.PaymentPercents[0] : undefined;
        searchParam.PaymentPercentTo = param.PaymentPercents[1] ? param.PaymentPercents[1] : undefined;
      }
      delete searchParam.PaymentPercents;
      
      return await apiBase.post<Partial<Car_CarForLXXSearch>, ApiResponse<Car_CarForLXX>>(
        "/CarCar/SearchWHForLXXHQ",
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
  }
};

import { ApiResponse, Mst_SalesManType } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_SalesManTypeApi = (apiBase: AxiosInstance) => {
  return {
    // -----------------TÌM KIẾM--------------------
    Mst_SalesManType_Search: async (
      params: Partial<Mst_SalesManType>
    ): Promise<ApiResponse<Mst_SalesManType>> => {
      return await apiBase.post<
        Partial<Mst_SalesManType>,
        ApiResponse<Mst_SalesManType>
      >("/MstSalesManType/Search", {
        ...params,
      });
    },
    // --------------------------GET ALL ACTIVE -----------------------
    Mst_SalesManType_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_SalesManType>,
        ApiResponse<Mst_SalesManType>
      >("/MstSalesManType/GetAllActive");
    },
  };
};

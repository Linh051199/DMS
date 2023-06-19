import { ApiResponse, Mng_Quota, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_SalesManTypeCertificate = (apiBase: AxiosInstance) => {
  return {
    Mst_SalesManTypeCertificate_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<SearchParam>> => {
      return await apiBase.post<SearchParam, ApiResponse<SearchParam>>(
        "/MstSalesManTypeCertificate/Search",
        {
          ...param,
        }
      );
    },
  };
};

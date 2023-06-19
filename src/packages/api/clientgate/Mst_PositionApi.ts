import { ApiResponse, Mng_Quota, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_Position = (apiBase: AxiosInstance) => {
  return {
    Mst_Position_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<SearchParam>> => {
      return await apiBase.post<SearchParam, ApiResponse<SearchParam>>(
        "/MstPosition/Search",
        {
          ...param,
        }
      );
    },
  };
};

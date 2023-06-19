import { ApiResponse, Mst_Marriage, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_MarriageApi = (apiBase: AxiosInstance) => {
    return {
        Mst_Marriage_Search: async (
            params: SearchParam
        ): Promise<ApiResponse<Mst_Marriage>> => {
            return await apiBase.post<SearchParam, ApiResponse<Mst_Marriage>>(
                "/MstMarriage/Search",
                {
                    ...params,
                }
            );
        },
    };
};

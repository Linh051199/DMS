import { AxiosInstance } from "axios";
import { ApiResponse } from "../types";
import { Sto_TranspReqResponse } from "../types/sales/Sto_TranspReq";

export const useCommonApi = (apiBase: AxiosInstance) => {
  return {
    // Get realtime 
    GetTime: async () => {
      return await apiBase.post<string, ApiResponse<Sto_TranspReqResponse>>(
        "/Common/GetDTime"
      );
    },
    // End get realtime
  }

}
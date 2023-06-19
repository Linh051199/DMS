import {
  ApiResponse,
  Sys_UserControl,
  SearchParam,
  SearchSys_UserControl,
} from "@packages/types";
import { AxiosInstance } from "axios";

interface Sys_UserControlData {
  DataList: Sys_UserControl[];
}

export const useSys_UserControl = (apiBase: AxiosInstance) => {
  return {
    Sys_UserControl_Search: async (
      param: SearchSys_UserControl
    ): Promise<ApiResponse<Sys_UserControlData>> => {
      return await apiBase.post<
        SearchSys_UserControl,
        ApiResponse<Sys_UserControlData>
      >("/SysGroup/SearchHQ", {
        ...param,
      });
    },

    Sys_UserControl_Delete: async (
      key: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post<string, ApiResponse<Sys_UserControl>>(
        "SysGroup/DeleteHQ",
        {
          GroupCode: key[0].GroupCode,
        }
      );
    },

    Sys_UserControl_Create: async (
      data: Partial<Sys_UserControl>
    ): Promise<ApiResponse<Partial<Sys_UserControl>>> => {
      return apiBase.post<
        Partial<Sys_UserControl>,
        ApiResponse<Sys_UserControl>
      >("SysGroup/CreateHQ", {
        strJson: JSON.stringify(data),
      });
    },

    Sys_UserControl_Update: async (
      key: any,
      data: Partial<Sys_UserControl>
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/SysGroup/UpdateHQ", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data),
      });
    },
    Sys_UserControl_GetByGroup: async (
      key: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSU/GetByGroupCodeHQ", {
        GroupCode: key,
      });
    },
    Sys_UserControl_GetByGroupMapSGSO: async (
      key: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSO/GetByGroupCodeHQ", {
        GroupCode: key,
      });
    },
    MapSGSU_Control_SaveHQ: async (
      key: any,
      value: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSU/SaveHQ", {
        strJson: JSON.stringify({
          GroupCode: key,
          Lst_Map_SG_SU:
            value.map((item: any) => ({
              UserCode: item.UserCode ?? "",
            })) ?? [],
        }),
      });
    },
    MapSGSO_Control_SaveHQ: async (
      key: any,
      value: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSO/SaveHQ", {
        strJson: JSON.stringify({
          GroupCode: key,
          Lst_Map_SG_SO:
            value.map((item: any) => ({
              GroupCode: key,
              ObjectCode: item.ObjectCode ?? "",
            })) ?? [],
        }),
      });
    },
  };
};

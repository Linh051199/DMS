import {
  ApiResponse,
  DeleteDealerParam,
  SearchTCGCarSalePriceParam,
  SearchParam,
  DeleteTCGCarSalePriceParam,
  Mst_TCGCarSalePriceParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_TCGCarSalePrice = (apiBase: AxiosInstance) => {
  return {
    // -----------------TÌM KIẾM--------------------
    Mst_TCGCarSalePrice_Search: async (
      params: Partial<Mst_TCGCarSalePriceParam>
    ): Promise<ApiResponse<Mst_TCGCarSalePriceParam>> => {
      return await apiBase.post<
        Partial<Mst_TCGCarSalePriceParam>,
        ApiResponse<Mst_TCGCarSalePriceParam>
      >("/MstTCGCarSalePrice/Search", {
        ...params,
      });
    },
    // --------------------------------------------------
    // --------------------------GET ALL ACTIVE -----------------------
    Mst_TCGCarSalePrice_GetAllActive_MstCarSpec: async (): Promise<
      ApiResponse<Mst_TCGCarSalePriceParam>
    > => {
      return await apiBase.post("/MstCarSpec/GetAllActive");
    },

    // -----------------------------GET ALL ACTIVE UNIQUE----------------
    // CÁCH 1:
    Mst_TCGCarSalePrice_GetAllActive: async (): Promise<
      ApiResponse<SearchTCGCarSalePriceParam>
    > => {
      return await apiBase.post("/MstTCGCarSalePrice/GetAllActive");
    },
    // CÁCH 2:
    Mst_TCGCarSalePrice_GetForCreate: async (): Promise<
      ApiResponse<Mst_TCGCarSalePriceParam>
    > => {
      return await apiBase.post("/MstTCGCarSalePrice/GetForCreate", {
        FlagActive: "1",
      });
    },
    // --------------------------------------------------
    // --------------------- TẠO MỚI ----------------------------
    Mst_TCGCarSalePrice_Create: async (
      values: Partial<Mst_TCGCarSalePriceParam>
    ) => {
      return await apiBase.post<
        DeleteDealerParam,
        ApiResponse<Mst_TCGCarSalePriceParam>
      >(
        "/MstTCGCarSalePrice/Create",
        {
          strJson: JSON.stringify({
            ...values,
            SpecCode: values.SpecCode,
            UnitPrice: values.UnitPrice,
          } as Mst_TCGCarSalePriceParam),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // -----------------------CẬP NHẬT----------------------

    Mst_TCGCarSalePrice_Update: async (
      code: Partial<Mst_TCGCarSalePriceParam>,
      values: Partial<Mst_TCGCarSalePriceParam>
    ) => {
      return await apiBase.post(
        "/MstTCGCarSalePrice/Update",
        {
          strJson: JSON.stringify({
            SpecCode: code,
            ...values,
          }),
          ColsUpd: Object.keys(values),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // -------------------------XÓA 1 BẢN GHI -------------------------
    Mst_TCGCarSalePrice_Delete: async (
      code: DeleteTCGCarSalePriceParam
    ): Promise<ApiResponse<SearchTCGCarSalePriceParam>> => {
      return await apiBase.post<
        DeleteTCGCarSalePriceParam,
        ApiResponse<SearchTCGCarSalePriceParam>
      >("/MstTCGCarSalePrice/Delete", {
        SpecCode: code,
      });
    },

    // ---------------------XÓA NHIỀU BẢN GHI--------------------
    Mst_TCGCarSalePrice_DeleteMultiple: async (
      key: DeleteTCGCarSalePriceParam[]
    ) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<SearchTCGCarSalePriceParam>
      >("/MstTCGCarSalePrice/DeleteMultiple", {
        strJson: JSON.stringify(
          key.map((SpecCode) => ({
            SpecCode,
          }))
        ),
      });
    },

    // -------------------DOWNLOAD TEMPLATE--------------
    Mst_TCGCarSalePrice_DowloadTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<SearchTCGCarSalePriceParam>,
        ApiResponse<string>
      >("/MstTCGCarSalePrice/ExportTemplate", {});
    },

    // ----------------EXPORT BẢN GHI ĐANG FLAGACTIVE = '1' ------------------------
    Mst_TCGCarSalePrice_Export: async (
      searchCondition: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_TCGCarSalePriceParam>>(
        "/MstTCGCarSalePrice/Export",
        {
          SpecCode: searchCondition.SpecCode,
        }
      );
    },
    // ----------------EXPORT TICK CHỌN BẢN GHI  ------------------------

    Mst_TCGCarSalePrice_ExportByListSpecCode: async (
      selectedCodes: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Mst_TCGCarSalePriceParam>>(
        "/MstTCGCarSalePrice/ExportByListCode",
        {
          ListSpecCode: selectedCodes.join(","),
        }
      );
    },
    // =-------------------------import file-------------------------
    Mst_TCGCarSalePrice_Import: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstTCGCarSalePrice/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};

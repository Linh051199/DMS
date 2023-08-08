import { Tid } from "@/utils/hash";
import { useUserApi } from "@packages/api/clientgate/user-api";
import { IUser } from "@packages/types";
import axios, { AxiosError } from "axios";
import { useAuth } from "../contexts/auth";
import { useGetForCurrentUser } from "./clientgate/Api_GetForCurrentUser";
import { useAuto_MapVIN_StorageRate } from "./clientgate/Auto_MapVIN_StorageRateApi";
import { useDlr_CA } from "./clientgate/Dlr_CAApi";
import { useDlr_StorageLocalApi } from "./clientgate/Dlr_StorageLocalApi";
import { useMng_Quota } from "./clientgate/Mng_QuotaApi";
import { useMst_AreaApi } from "./clientgate/Mst_AreaApi";
import { use_MstCabinCertificate } from "./clientgate/Mst_CabinCertificateApi";
import { useMst_CarCancelTypeApi } from "./clientgate/Mst_CarCancelTypeApi";
import { useMst_CarColorApi } from "./clientgate/Mst_CarColorApi";
import { useMst_CarInvoiceApi } from "./clientgate/Mst_CarInvoiceApi";
import { useMst_CarModelApi } from "./clientgate/Mst_CarModelApi";
import { useMst_CarOCNApi } from "./clientgate/Mst_CarOCNApi";
import { useMst_CarSpecApi } from "./clientgate/Mst_CarSpecApi";
import { useMst_ContractUpdateTypeApi } from "./clientgate/Mst_ContractUpdateType";
import { useMst_CustomerBase } from "./clientgate/Mst_CustomerBaseApi";
import { useDealerApi } from "./clientgate/Mst_Dealer-api";
import { useMst_DealerSalesGroupTypeApi } from "./clientgate/Mst_DealerSalesGroupTypeApi";
import { useMst_DealerSalesTypeApi } from "./clientgate/Mst_DealerSalesTypeApi";
import { useMst_DealerType } from "./clientgate/Mst_DealerTypeApi";
import { useMst_DelayTransports } from "./clientgate/Mst_DelayTransports";
import { useMst_DiscountApi } from "./clientgate/Mst_DiscountApi";
import { useMst_District } from "./clientgate/Mst_DistrictApi";
import { useMst_InsuranceCompany } from "./clientgate/Mst_InsuranceCompanyApi";
import { useMst_InsuranceFee } from "./clientgate/Mst_InsuranceFeeApi";
import { useMst_InsuranceType } from "./clientgate/Mst_InsuranceTypeApi";
import { useMst_PaymentTypeApi } from "./clientgate/Mst_PaymentTypeApi";
import { useMst_PlantApi } from "./clientgate/Mst_PlantApi";
import { useMst_PointRegisApi } from "./clientgate/Mst_PointRegisApi";
import { useMstPort } from "./clientgate/Mst_PortApi";
import { useMstPortTypeAPI } from "./clientgate/Mst_PortTypeApi";
import { useMst_Province_api } from "./clientgate/Mst_ProvinceApi";
import { useMst_SalesOrderTypeApi } from "./clientgate/Mst_SalesOrderTypeApi";
import { useMst_StorageApi } from "./clientgate/Mst_StorageApi";
import { useMst_StorageGlobalApi } from "./clientgate/Mst_StorageGlobalApi";
import { useMst_Transporter } from "./clientgate/Mst_TransporterApi";
import { useMst_TransporterCar } from "./clientgate/Mst_TransporterCarApi";
import { useMst_TransporterDriverApi } from "./clientgate/Mst_TransporterDriverApi";
import { useMst_UnitPriceGPS } from "./clientgate/Mst_UnitPriceGPSApi";
import { useRpt_PrincipleContractApi } from "./clientgate/Rpt_PrincipleContractApi";
import { useCarDeliveryOrder, useCarCarService } from "./clientgate/business";

// import { useMst_CostTypeApi } from "./clientgate/Mst_CostTypeApi";
import { FlagActiveConvertor } from "@packages/api/interceptors/flag-active-convertor";
import { useAuto_MapVIN_DistributionSumRate } from "./clientgate/Auto_Map_VINDistributionSumRateApi";
import { useMst_AmplitudeApprOrd } from "./clientgate/Mst_AmplitudeApprOrdApi";
import { useMst_BankAccount } from "./clientgate/Mst_BankAccountApi";
import { useMst_BankDealer } from "./clientgate/Mst_BankDealerApi";
import { useMst_CarPrice } from "./clientgate/Mst_CarPriceApi";
import { useMst_CarStdOptApi } from "./clientgate/Mst_CarStdOptApi";
import { useMst_CostTypeApi } from "./clientgate/Mst_CostTypeApi";
import { useMst_Department } from "./clientgate/Mst_DepartmentApi";
import { useMst_MinInventory } from "./clientgate/Mst_MinInventoryApi";
import { useMst_MngRateTonKhoBanHang } from "./clientgate/Mst_MngRateTonKhoBanHangApi";
import { useMst_Qualification } from "./clientgate/Mst_QualificationApi";
import { useMst_RateApprOrderModelMaxApi } from "./clientgate/Mst_RateApprOrderModelMaxApi";
import { useMst_RegistrationInfo } from "./clientgate/Mst_RegistrationInfoApi";
import { useMst_StorageAreaRate } from "./clientgate/Mst_StorageAreaRateApi";
import { useMst_UnitPriceAVN } from "./clientgate/Mst_UnitPriceAVNApi";
import { useMst_VINProductionYear_Actual } from "./clientgate/Mst_VINProductionYear_Actual";
import { useMst_WarrantyExpires } from "./clientgate/Mst_WarrantyExpiresApi";

import { useMst_InventoryCost } from "./clientgate/Mst_InventoryCostApi";

// import { useMst_TCGCarPriceApi } from "./clientgate/Mst_TCGCarPriceApi";

import { useMst_BankApi } from "./clientgate/Mst_BankApi";
import { useMst_InvoiceIDApi } from "./clientgate/Mst_InvoiceIDApi";
import { useMst_MarriageApi } from "./clientgate/Mst_MarriageApi";
import { useMst_Position } from "./clientgate/Mst_PositionApi";
import { useMst_Quota } from "./clientgate/Mst_QuotaApi";
import { useMst_SalesManTypeApi } from "./clientgate/Mst_SalesManTypeApi";
import { useMst_SalesManTypeCertificate } from "./clientgate/Mst_SalesManTypeCertificateApi";
import { useMst_TCGCarPriceApi } from "./clientgate/Mst_TCGCarPriceApi";
import { useMst_TCGCarSalePrice } from "./clientgate/Mst_TCGCarSalePrice";
import { useRptStatisticDealerStock21 } from "./clientgate/RptStatisticDealerStock21";

// report start
import { useRptHRSalesManApi } from "./clientgate/RptHRSalesManApi";
import { useRptPayment01Api } from "./clientgate/RptPayment01Api";
import { useRptSellCustomerDealer_ForSale_Mst } from "./clientgate/RptSellCustomerDealer_ForSale_MstApi";
import { useRptStatisticGrpDealer02 } from "./clientgate/RptStatisticGrpDealer02Api";
import { useRptStatisticHTCStockOut02Api } from "./clientgate/RptStatisticHTCStockOut02Api";
import { useRptStatistic_HTCStock03 } from "./clientgate/RptStatistic_HTCStock03Api";
import { useRptStatistic_HTC_CarDocReq } from "./clientgate/RptStatistic_HTC_CarDocReqApi";
import { useRpt_BusinessPlanSummaryApi } from "./clientgate/Rpt_BusinessPlanSummaryApi";
import { useRpt_DlrContractInstock } from "./clientgate/Rpt_DlrContractInstockApi";
import { useRptMasterData } from "./clientgate/Rpt_MasterDataApi";
import { useRpt_PivotTransPlan } from "./clientgate/Rpt_PivotTransPlanApi";
import { useRpt_PivotTransPlanF } from "./clientgate/Rpt_PivotTransPlanFApi";
import { useRptStatisticGrpDealer03 } from "./clientgate/Rpt_StatisticGrpDealer03Api";
import { useRptStatisticHTCStockOut01 } from "./clientgate/Rpt_StatisticHTCStockOut01";

import { useRptStatistic_DealerStock_ForSale_Mst } from "./clientgate/RptStatistic_DealerStock_ForSale_Mst";
import { useRptBaoCaoMoi } from "./clientgate/Rpt_BaoCaoMoiApi";
import { useRpt_CarDeliveryOrderExpectData } from "./clientgate/Rpt_CarDeliveryOrderExpectApi";
import { useRpt_DLSDealDetailLoanEUBankMarketSum01Api } from "./clientgate/Rpt_DLSDealDetailLoanEUBankMarketSum01";
import { useRpt_DLSDealLoanEUBankMarketSum01Api } from "./clientgate/Rpt_DLSDealLoanEUBankMarketSum01";
import { useRpt_PivotDlrCtmVisit } from "./clientgate/Rpt_PivotDlrCtmVisitApi";
import { useRpt_PivotDlrTestDriver } from "./clientgate/Rpt_PivotDlrTestDriverApt";
import { useRpt_PivotRearrangeCBParam } from "./clientgate/Rpt_PivotRearrangeCBApi";
import { useRptProfileGuaranteeEffect } from "./clientgate/Rpt_ProfileGuaranteeEffectApi";
import { useRpt_SPLSPSupportRetail } from "./clientgate/Rpt_SPLSPSupportRetailApi";
import { useRptSalesCtmCare01 } from "./clientgate/Rpt_SalesCtmCare01Api";
import { useRpt_ShareHTCStock03 } from "./clientgate/Rpt_ShareHTCStock03Api";
import { useRptStaticGrpDealerInSock02 } from "./clientgate/Rpt_StatisticGrpDealerInStock02Api";
import { useRpt_StatisticHTCBackOrderSpecCode01Pivot } from "./clientgate/Rpt_StatisticHTCBackOrderSpecCode01PivotApi";
import { useRptStatisticHTCStockOutOnWay } from "./clientgate/Rpt_StatisticHTCStockOutOnWayApi";
import { useSys_user } from "./clientgate/Sys_UserApi";
import { useRpt_PmtGuaranteeBankMarketSum01 } from "./clientgate/Rpt_PmtGuaranteeBankMarketSum01Api";
import { useRpt_PmtPaymentLoanBankMarketSum01 } from "./clientgate/Rpt_PmtPaymentLoanBankMarketSum01Api";
import { useSys_UserControl } from "./clientgate/Sys_UserControlApi";
import { useRptUpdSalesManByDelear } from "./clientgate/Rpt_UpdSalesManByDelearApi";
import { useRptSalesReportApi } from "./clientgate/Rpt_SalesReportApi";
import { useRptSaleBaoCaoTongHopGet } from "./clientgate/Rpt_SaleBaoCaoTongHopGetApi";
import { useRpt_TonHoSoNganHang } from "./clientgate/Rpt_TonHoSoNganHangApi";
import { useRpt_StatisticHTCStock01 } from "./clientgate/Rpt_StatisticHTCStock01Api";
import { useRpt_StockInHTC } from "./clientgate/Rpt_StockInHTCApi";
import { useRpt_DebitReport02New } from "./clientgate/Rpt_DebitReport02NewApi";
import { useRpt_StatisticGrpDealer01 } from "./clientgate/Rpt_StatisticGrpDealer01Api";
import { useRpt_StatisticHTCBackOrderDealer01 } from "./clientgate/Rpt_StatisticHTCBackOrderDealer01Api";
import { useRpt_StatisticHTCBackOrderSpecCode01 } from "./clientgate/Rpt_StatisticHTCBackOrderSpecCode01Api";
import { useRpt_GuaranteeDebit01 } from "./clientgate/Rpt_GuaranteeDebit01Api";
import { useRpt_SalesDelivery01 } from "./clientgate/Rpt_SalesDelivery01Api";
import { useRpt_NXTQuyenDoiNo } from "./clientgate/Rpt_NXTQuyenDoiNoApi";
import { useRpt_SalesPeriod01 } from "./clientgate/Rpt_SalesPeriod01Api";
import { useRpt_NhapXuatTonTrongKy } from "./clientgate/Rpt_NhapXuatTonTrongKyApi";
import { useRpt_XuatHoSo } from "./clientgate/Rpt_XuatHoSoApi";
import { useRpt_RevenueHTCInvoice } from "./clientgate/Rpt_RevenueHTCInvoiceApi";
import { useRpt_PivotRevenueBySpec } from "./clientgate/Rpt_PivotRevenueBySpecApi";
import { useRpt_CarColorChangeHistory } from "./clientgate/Rpt_CarColorChangeHistoryApi";
import { useRpt_PmtPaymentDtl_ByDealer } from "./clientgate/Rpt_PmtPaymentDtlByDealerApi";
import { useRpt_WOOrderAndSchedule01 } from "./clientgate/Rpt_WOOrderAndSchedule01Api";
import { useRpt_StatisticPIInStock } from "./clientgate/Rpt_StatisticPIInStockApi";
import { useRpt_CarDeliveryOutButNotDutyComplete } from "./clientgate/Rpt_CarDeliveryOutButNotDutyCompleteApi";
import { useRpt_PenaltyPmtDelay } from "./clientgate/Rpt_PenaltyPmtDelayApi";
import { useRpt_BaoCaoXeThieuBBBG } from "./clientgate/Rpt_BaoCaoXeThieuBBBGApi";
import { useRpt_Statistic_DMS40CarDeliveryOrder } from "./clientgate/Rpt_Statistic_DMS40CarDeliveryOrderApi";
import { useRpt_ReportCarDocReq } from "./clientgate/Rpt_ReportCarDocReqApi";
import { useRpt_BCSupportDealerSales } from "./clientgate/Rpt_BCSupportDealerSalesApi";
import { useRpt_MapVIN } from "./clientgate/Rpt_MapVINApi";
import { useRpt_CarAllocationByArea } from "./clientgate/Rpt_CarAllocationByAreaApi";
import { use_RptTheoDoiKiemTraDatHang } from "./clientgate/Rpt_TheoDoiKiemTraDatHangApi";
import { useRpt_DuBaoDatHang5THTMV } from "./clientgate/Rpt_DuBaoDatHang5THTMVApi";
import { useRpt_SalesExpectedTarget } from "./clientgate/Rpt_SalesExpectedTargetApi";
import { useRpt_DuKienDongTienTT_ChiTiet } from "./clientgate/Rpt_DuKienDongTienTT_ChiTietApi";
import { useRpt_Master } from "./clientgate/Rpt_MasterApi";
import { useRpt_BLDenHanThanhToan } from "./clientgate/Rpt_BLDenHanThanhToanApi";
import { useRpt_SMCertificate } from "./clientgate/Rpt_SMCertificateApi";
import { useRpt_StockAndSalesDealer } from "./clientgate/Rpt_StockAndSalesDealerApi";
import { useMst_Part } from "./clientgate/Mst_PartApi";
import { useMst_MaintainTaskItemApi } from "./clientgate/Mst_MaintainTaskItemApi";
import { useRpt_PivotRetailContractApi } from "./clientgate/Rpt_PivotRetailContractApi";
import { useMst_InvoiceIDHTCApi } from "./clientgate/Mst_InvoiceIDHTCApi";
import { useMst_CarAllocationByAreaApi } from "./clientgate/Mst_CarAllocationByArea";
import { useRpt_HMCReportV2 } from "./clientgate/Rpt_HMCReportV2Api";
import { useRpt_StatisticHTCStock02 } from "./clientgate/Rpt_StatisticHTCStock02Api";
import { useRpt_PivotPDI } from "./clientgate/Rpt_PivotPDIApi";
import { useRpt_PivotMnfPlanMnfSummary } from "./clientgate/Rpt_PivotMnfPlanMnfSummaryApi";
import { useRptPivotQLDatHangTraHang } from "./clientgate/Rpt_PivotQLDatHangTraHangApi";
import { useRpt_PivotKHSX } from "./clientgate/Rpt_PivotKHSXApi";
import { useRptTongHopXeDaiLy } from "./clientgate/Rpt_TongHopXeDaiLyApi";
import { useRptSalesBalanceOrder } from "./clientgate/Rpt_SalesBalanceOrderApi";
import { useRpt_EstimateDeliveryPlan } from "./clientgate/Rpt_EstimateDeliveryPlanApi";
import { useRptDelayguaranteePaymentRealTime } from "./clientgate/Rpt_DelayguaranteePaymentRealTime";
import { useRptMinimumSurvivalRealTime } from "./clientgate/Rpt_MinimumSurvivalRealTimeApi";
import { useSto_TranspReq } from "./clientgate/business/Sto_TranspReq";
import { useCommonApi } from "./common-api";
import { useRpt_OrdOrderPlanHTMV } from "./clientgate/Rpt_OrdOrderPlanHTMV";
import { useRpt_QuotaForDealer } from "./clientgate/Rpt_QuotaForDealer";

// report end

/**
 * Creates an axios instance for making requests to the ClientGate API.
 * @param {IUser} currentUser - The current user's information.
 * @param {string} clientGateDomain - The base URL for the ClientGate API.
 * @param {string} networkId - The ID of the network.
 * @param {string} orgId - The ID of the organization.
 * @return {AxiosInstance} An axios instance configured for the ClientGate API.
 */
export const createReportApiBase = (
  currentUser: IUser,
  clientGateDomain: string,
  networkId: string,
  orgId: string
) => {
  const api = axios.create({
    baseURL: clientGateDomain,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      AppAgent: import.meta.env.VITE_AGENT,
      GwUserCode: import.meta.env.VITE_GW_USER,
      GwPassword: import.meta.env.VITE_GW_USER_PW,
      AppVerCode: "V1",
      Tid: Tid(),
      AppTid: Tid(),
      AppLanguageCode: currentUser.Language,
      UtcOffset: currentUser.TimeZone,
      NetworkId: networkId,
      OrgId: orgId,
    },
  });
  api.interceptors.request.use(
    FlagActiveConvertor.beforeRequest,
    function (error) {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    function (response) {
      // with this API, it always falls to this case.
      const data = response.data;
      const result: any = {
        isSuccess: data.Data._strErrCode === "0" && !data.Data._excResult,
        debugInfo: data.Data._dicDebugInfo,
        errorInfo:
          data.Data._strErrCode === "0" ? undefined : data.Data._excResult,
        errorCode: data.Data._strErrCode,
      };
      if (result.isSuccess && !!data.Data._objResult) {
        if (data.Data._objResult.Data) {
          result.Data = data.Data._objResult.Data;
        } else {
          result.Data = data.Data._objResult;
        }
      } else {
      }
      return result;
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        location.href = "/login";
      }
      return Promise.reject(error.response?.data);
    }
  );
  return api;
};
/**
 * Creates an axios instance for making requests to the ClientGate API.
 * @param {IUser} currentUser - The current user's information.
 * @param {string} clientGateDomain - The base URL for the ClientGate API.
 * @param {string} networkId - The ID of the network.
 * @param {string} orgId - The ID of the organization.
 * @return {AxiosInstance} An axios instance configured for the ClientGate API.
 */
export const createClientGateApiBase = (
  currentUser: IUser,
  clientGateDomain: string,
  networkId: string,
  orgId: string
) => {
  const api = axios.create({
    baseURL: clientGateDomain,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      AppAgent: import.meta.env.VITE_AGENT,
      GwUserCode: import.meta.env.VITE_GW_USER,
      GwPassword: import.meta.env.VITE_GW_USER_PW,
      AppVerCode: "V1",
      Tid: Tid(),
      AppTid: Tid(),
      AppLanguageCode: currentUser.Language,
      UtcOffset: currentUser.TimeZone,
      NetworkId: networkId,
      OrgId: orgId,
    },
  });
  api.interceptors.request.use(
    FlagActiveConvertor.beforeRequest,
    function (error) {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    function (response) {
      // with this API, it always falls to this case.
      const data = response.data;
      const result: any = {
        isSuccess: data.Data._strErrCode === "0" && !data.Data._excResult,
        debugInfo: data.Data._dicDebugInfo,
        errorInfo:
          data.Data._strErrCode === "0" ? undefined : data.Data._excResult,
        errorCode: data.Data._strErrCode,
      };
      if (!!data.Data._objResult && !!data.Data._objResult.DataList) {
        result.DataList = data.Data._objResult.DataList.map((item: any) => {
          // if `item` has `FlagActive` property
          if (Object.keys(item).includes("FlagActive")) {
            item.FlagActive = item.FlagActive === "1";
          }
          return {
            ...item,
          };
        });

        result.ItemCount = data.Data._objResult.ItemCount;
        result.PageCount = data.Data._objResult.PageCount;
        result.PageIndex = data.Data._objResult.PageIndex;
        result.PageSize = data.Data._objResult.PageSize;
      } else {
        if (
          data.Data?._objResult &&
          typeof data.Data?._objResult !== "string"
        ) {
          if (data.Data?._objResult.Data) {
            result.Data = data.Data._objResult.Data;
          } else {
            result.Data = data.Data?._objResult.map((item: any) => {
              // if `item` has `FlagActive` property
              if (Object.keys(item).includes("FlagActive")) {
                item.FlagActive = item.FlagActive === "1";
              }
              return {
                ...item,
              };
            });
          }
        } else {
          result.Data = data.Data?._objResult;
        }
      }
      return result;
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        location.href = "/login";
      }
      return Promise.reject(error.response?.data);
    }
  );
  return api;
};

export const createClientGateApi = (
  currentUser: IUser,
  clientgateDomain: string,
  networkId: string,
  orgId: string
) => {
  const apiBase = createClientGateApiBase(
    currentUser,
    clientgateDomain,
    networkId,
    orgId
  );
  const reportApiBase = createReportApiBase(
    currentUser,
    clientgateDomain,
    networkId,
    orgId
  );
  const useCarDeliveryOrderApi = useCarDeliveryOrder(apiBase);
  const useCarCarApi = useCarCarService(apiBase);
  const getCurrentUserApis = useGetForCurrentUser(reportApiBase);
  const provinceApis = useMst_Province_api(apiBase);
  const dealerApis = useDealerApi(apiBase);
  const useStoTranspReq = useSto_TranspReq(apiBase);
  const CommonApi = useCommonApi(apiBase);

  const mstAreaApi = useMst_AreaApi(apiBase); // KhanhNB
  const mstSalesOrderType = useMst_SalesOrderTypeApi(apiBase); // KhanhNB
  const mstStorage = useMst_StorageApi(apiBase); // KhanhNB
  const mstPaymentType = useMst_PaymentTypeApi(apiBase); // KhanhNB
  const mstCarCancelType = useMst_CarCancelTypeApi(apiBase); // KhanhNB
  const mstPlant = useMst_PlantApi(apiBase); // KhanhNB
  const mstCarInvoice = useMst_CarInvoiceApi(apiBase); // KhanhNB
  const mstCarSpec = useMst_CarSpecApi(apiBase); // KhanhNB - getAllActive
  const mstDelaerSalesGroupType = useMst_DealerSalesGroupTypeApi(apiBase); // KhanhNB
  const mstDelaerSalesType = useMst_DealerSalesTypeApi(apiBase); // KhanhNB
  const mstDiscount = useMst_DiscountApi(apiBase); // KhanhNB - Mst02 - Chua ro
  const mstTransporterDriver = useMst_TransporterDriverApi(apiBase); // KhanhNB
  const mstCarModel = useMst_CarModelApi(apiBase); // KhanhNB
  const mstCarOCN = useMst_CarOCNApi(apiBase); // KhanhNB
  const rptPrincipleContract = useRpt_PrincipleContractApi(apiBase); // KhanhNB
  const mstStorageGlobal = useMst_StorageGlobalApi(apiBase); // KhanhNB
  const dlrStorageLocal = useDlr_StorageLocalApi(apiBase); // KhanhNB
  const mstContractUpdateType = useMst_ContractUpdateTypeApi(apiBase); // KhanhNB
  const mstCarColor = useMst_CarColorApi(apiBase);
  const mstCarStdOpt = useMst_CarStdOptApi(apiBase); // KhanhNB
  const mstRateApprOrderModelMax = useMst_RateApprOrderModelMaxApi(apiBase); // KhanhNB
  const rptDLSDealLoanEUBankMarketSum01 =
    useRpt_DLSDealLoanEUBankMarketSum01Api(reportApiBase); // KhanhNB
  const rptDLSDealDetailLoanEUBankMarketSum01 =
    useRpt_DLSDealDetailLoanEUBankMarketSum01Api(reportApiBase); // KhanhNB

  const mstPort = useMstPort(apiBase);
  const mstPortType = useMstPortTypeAPI(apiBase);
  const mstDealerType = useMst_DealerType(apiBase);
  const mstDistrict = useMst_District(apiBase);
  const userApis = useUserApi(apiBase);
  const useDlrCA = useDlr_CA(apiBase);
  const useMstTransporterCar = useMst_TransporterCar(apiBase);
  const useMstTransporter = useMst_Transporter(apiBase);
  const useMstPointRegisApi = useMst_PointRegisApi(apiBase);
  const useMngQuota = useMng_Quota(apiBase);
  const useMstInsuranceCompany = useMst_InsuranceCompany(apiBase);
  const useMstCabinCertificate = use_MstCabinCertificate(apiBase);
  const useCustomerBaseExportExcel = useMst_CustomerBase(apiBase);
  const useMstUnitPriceGPS = useMst_UnitPriceGPS(apiBase);
  const useMstInsuranceTypeApi = useMst_InsuranceType(apiBase);
  const useMstInsuranceFee = useMst_InsuranceFee(apiBase);
  const useMstDelayTransports = useMst_DelayTransports(apiBase);
  const useAutoMapVINStorageRate = useAuto_MapVIN_StorageRate(apiBase);
  const useMstCostTypeApi = useMst_CostTypeApi(apiBase);
  const useMstUnitPriceAVN = useMst_UnitPriceAVN(apiBase);
  const useMstStorageAreaRate = useMst_StorageAreaRate(apiBase);
  const useMstMinInventory = useMst_MinInventory(apiBase);
  const useMstVINProductionYearActual =
    useMst_VINProductionYear_Actual(apiBase);
  const useMstAmplitudeApprOrd = useMst_AmplitudeApprOrd(apiBase);
  const useMstRegistrationInfo = useMst_RegistrationInfo(apiBase);
  const useAutoMapVINDistributionSumRate =
    useAuto_MapVIN_DistributionSumRate(apiBase);
  const useMstMngRateTonKhoBanHang = useMst_MngRateTonKhoBanHang(apiBase);
  const useMstWarrantyExpires = useMst_WarrantyExpires(apiBase);
  const useMstSalesManType = useMst_SalesManTypeApi(apiBase); // ThangPV
  const useMstTCGCarSalePrice = useMst_TCGCarSalePrice(apiBase); // ThangPV
  const useMstBankAccount = useMst_BankAccount(apiBase); // ThangPV
  const useMstInvoiceIDHTC = useMst_InvoiceIDHTCApi(apiBase); // ThangPV

  const useMstCarPrice = useMst_CarPrice(apiBase);
  const useMstBankDealer = useMst_BankDealer(apiBase);
  const useMstDepartment = useMst_Department(apiBase);
  const useMstQualification = useMst_Qualification(apiBase);
  const useMstInventoryCost = useMst_InventoryCost(apiBase);
  const useMstSalesManTypeCertificate = useMst_SalesManTypeCertificate(apiBase);
  const useTCGCarPrice = useMst_TCGCarPriceApi(apiBase);
  const useMstPosition = useMst_Position(apiBase);
  const useMstCarColorApi = useMst_CarColorApi(apiBase);
  const useMstBankApi = useMst_BankApi(apiBase);
  const useMstMarriage = useMst_MarriageApi(apiBase);
  const useMstQuota = useMst_Quota(apiBase);
  const useRptPayment01 = useRptPayment01Api(reportApiBase);
  const mstInvoiceIDApi = useMst_InvoiceIDApi(apiBase);
  const mstPart = useMst_Part(apiBase);
  // report start
  const rptStatisticDealerStock21 = useRptStatisticDealerStock21(reportApiBase);

  const rptStatisticHTCStock03 = useRptStatistic_HTCStock03(reportApiBase);

  const rptHRSalesMan = useRptHRSalesManApi(reportApiBase);
  const rptStatisticHTCStockOut02Api =
    useRptStatisticHTCStockOut02Api(reportApiBase);
  const useRptStatisticHTCCarDocReq =
    useRptStatistic_HTC_CarDocReq(reportApiBase);
  const useRptBusinessPlanSummaryApi =
    useRpt_BusinessPlanSummaryApi(reportApiBase);
  const rptStatisticGrpDealer02 = useRptStatisticGrpDealer02(reportApiBase);
  const useRptPivotTransPlan = useRpt_PivotTransPlan(reportApiBase);
  const useRptPivotTransPlanF = useRpt_PivotTransPlanF(reportApiBase);
  const useRptDlrContractInstock = useRpt_DlrContractInstock(reportApiBase);
  const useRptSellCustomerDealerForSaleMst =
    useRptSellCustomerDealer_ForSale_Mst(reportApiBase);

  const RptStatisticDealerStockForSaleMstData =
    useRptStatistic_DealerStock_ForSale_Mst(reportApiBase);
  const rptStatisticHTCBackOrderSpecCode01Pivot =
    useRpt_StatisticHTCBackOrderSpecCode01Pivot(reportApiBase);
  const rptStatisticHTCStockOutOnWay =
    useRptStatisticHTCStockOutOnWay(reportApiBase);

  // DongNV
  const mstMaintainTaskItem = useMst_MaintainTaskItemApi(apiBase);
  const mstCarAllocationByArea = useMst_CarAllocationByAreaApi(apiBase);
  const rptStaticGrpDealerInSock02 =
    useRptStaticGrpDealerInSock02(reportApiBase);
  const rptMasterdata = useRptMasterData(reportApiBase);
  const useRptCarDeliveryOrderExpectData =
    useRpt_CarDeliveryOrderExpectData(reportApiBase);
  const rptDuBaoDatHang5THTMV = useRpt_DuBaoDatHang5THTMV(reportApiBase);
  const rptSaleExpectedTarget = useRpt_SalesExpectedTarget(reportApiBase);
  // DongNV end

  const rptStatisticHTCStockOut01 = useRptStatisticHTCStockOut01(reportApiBase); // ThangPV
  const rptStatisticGrpDealer03 = useRptStatisticGrpDealer03(reportApiBase); // ThangPV
  const rptPivotRearrangeCBParam = useRpt_PivotRearrangeCBParam(reportApiBase); //ThangPV
  const useRptProfileGuaranteeEffectt =
    useRptProfileGuaranteeEffect(reportApiBase); // ThangPV
  const useRptSPLSPSupportRetail = useRpt_SPLSPSupportRetail(reportApiBase); // ThangPV
  const useRptPmtGuaranteeBankMarketSum01 =
    useRpt_PmtGuaranteeBankMarketSum01(reportApiBase); // ThangPV
  const useRptPmtPaymentLoanBankMarketSum01 =
    useRpt_PmtPaymentLoanBankMarketSum01(reportApiBase); // ThangPV
  const rpt_PmtPaymentDtl_ByDealer =
    useRpt_PmtPaymentDtl_ByDealer(reportApiBase); // ThangPV
  const rpt_CarDeliveryOutButNotDutyComplete =
    useRpt_CarDeliveryOutButNotDutyComplete(reportApiBase); // ThangPV
  const rpt_ReportCarDocReq = useRpt_ReportCarDocReq(reportApiBase); // ThangPV
  const rpt_MapVIN = useRpt_MapVIN(reportApiBase); // ThangPV
  const rptTheoDoiKiemTraDatHang = use_RptTheoDoiKiemTraDatHang(reportApiBase); // ThangPV
  const rptDuKienDongTienTT_ChiTietData =
    useRpt_DuKienDongTienTT_ChiTiet(reportApiBase); // ThangPV
  const rpt_SMCertificate = useRpt_SMCertificate(reportApiBase); // ThangPV
  const rpt_PivotQLDatHangTraHang = useRptPivotQLDatHangTraHang(reportApiBase); // ThangPV
  const rpt_TongHopXeDaiLy = useRptTongHopXeDaiLy(reportApiBase); // ThangPV
  const rpt_SalesBalanceOrder = useRptSalesBalanceOrder(reportApiBase); // ThangPV
  const rpt_EstimateDeliveryPlan = useRpt_EstimateDeliveryPlan(reportApiBase); // LinhPV
  const rpt_MinimumSurvivalRealTime =
    useRptMinimumSurvivalRealTime(reportApiBase); // LinhPV
  const rpt_OrdOrderPlanHTMV = useRpt_OrdOrderPlanHTMV(reportApiBase); // LinhPV
  const rpt_QuotaForDealer = useRpt_QuotaForDealer(reportApiBase); // LinhPV
  const rpt_DelayguaranteePaymentRealTime =
    useRptDelayguaranteePaymentRealTime(reportApiBase); // LinhPV
  // report end
  const useRptShareHTCStock03 = useRpt_ShareHTCStock03(reportApiBase);
  const useRptPivotDlrCtmVisit = useRpt_PivotDlrCtmVisit(reportApiBase);
  const rptBaoCaoMoi = useRptBaoCaoMoi(reportApiBase);
  const useRptPivotDlrTestDriver = useRpt_PivotDlrTestDriver(reportApiBase);
  const rptSalesCtmCare01 = useRptSalesCtmCare01(reportApiBase);
  const rptUpdSalesManByDelear = useRptUpdSalesManByDelear(reportApiBase);
  const rptSalesReportApi = useRptSalesReportApi(reportApiBase);
  const rptSaleBaoCaoTongHopGet = useRptSaleBaoCaoTongHopGet(reportApiBase);
  const rptTonHoSoNganHang = useRpt_TonHoSoNganHang(reportApiBase);
  const rpt_StatisticHTCStock01 = useRpt_StatisticHTCStock01(reportApiBase);
  const rpt_StockInHTC = useRpt_StockInHTC(reportApiBase);
  const rpt_DebitReport02New = useRpt_DebitReport02New(reportApiBase);
  const rpt_StatisticGrpDealer01 = useRpt_StatisticGrpDealer01(reportApiBase);
  const rpt_StatisticHTCBackOrderDealer01 =
    useRpt_StatisticHTCBackOrderDealer01(reportApiBase);
  const rpt_StatisticHTCBackOrderSpecCode01 =
    useRpt_StatisticHTCBackOrderSpecCode01(reportApiBase);
  const rpt_SalesDelivery01 = useRpt_SalesDelivery01(reportApiBase);
  const rpt_GuaranteeDebit01 = useRpt_GuaranteeDebit01(reportApiBase);
  const rpt_NXTQuyenDoiNo = useRpt_NXTQuyenDoiNo(reportApiBase);
  const rpt_SalesPeriod01 = useRpt_SalesPeriod01(reportApiBase);
  const rpt_NhapXuatTonTrongKy = useRpt_NhapXuatTonTrongKy(reportApiBase);
  const rpt_XuatHoSo = useRpt_XuatHoSo(reportApiBase);
  const rpt_RevenueHTCInvoice = useRpt_RevenueHTCInvoice(reportApiBase);
  const rpt_PivotRevenueBySpec = useRpt_PivotRevenueBySpec(reportApiBase);
  const rpt_CarColorChangeHistory = useRpt_CarColorChangeHistory(reportApiBase);
  const rpt_WOOrderAndSchedule01 = useRpt_WOOrderAndSchedule01(reportApiBase);
  const rpt_StatisticPIInStock = useRpt_StatisticPIInStock(reportApiBase);
  const rpt_PenaltyPmtDelay = useRpt_PenaltyPmtDelay(reportApiBase);
  const rpt_BaoCaoXeThieuBBBG = useRpt_BaoCaoXeThieuBBBG(reportApiBase);
  const rpt_statistic_DMS40CarDeliveryOrder =
    useRpt_Statistic_DMS40CarDeliveryOrder(reportApiBase);
  const rpt_BCSupportDealerSales = useRpt_BCSupportDealerSales(reportApiBase);
  const rpt_CarAllocationByArea = useRpt_CarAllocationByArea(reportApiBase);
  const rpt_Master = useRpt_Master(reportApiBase);
  const sysuser = useSys_user(reportApiBase);
  const SysUserControl = useSys_UserControl(reportApiBase);
  const rpt_BLDenhanthanhtoan = useRpt_BLDenHanThanhToan(reportApiBase);
  const rpt_StockAndSalesDealer = useRpt_StockAndSalesDealer(reportApiBase);
  const rpt_PivotRetailContractApi =
    useRpt_PivotRetailContractApi(reportApiBase);
  const rpt_HMCReportV2 = useRpt_HMCReportV2(reportApiBase);
  const rpt_StatisticHTCStock02 = useRpt_StatisticHTCStock02(reportApiBase);
  const rpt_PivotPDI = useRpt_PivotPDI(reportApiBase);
  const rpt_PivotMnfPlanMnfSummary =
    useRpt_PivotMnfPlanMnfSummary(reportApiBase);
  const rpt_PivotKHSX = useRpt_PivotKHSX(reportApiBase);

  return {
    // report start
    // xin chao
    ...SysUserControl,
    ...sysuser,
    ...useRptSPLSPSupportRetail, // ThangPV
    ...useRptPmtGuaranteeBankMarketSum01, // ThangPV
    ...useRptPmtPaymentLoanBankMarketSum01, // ThangPV
    ...useRptProfileGuaranteeEffectt, // ThangPV
    ...rptPivotRearrangeCBParam, // ThangPV
    ...rptStatisticHTCStockOut01, // ThangPV
    ...rptStatisticGrpDealer03, // ThangPV
    ...rpt_PmtPaymentDtl_ByDealer, // ThangPV
    ...rpt_CarDeliveryOutButNotDutyComplete, // ThangPV
    ...rpt_ReportCarDocReq, // ThangPV
    ...rpt_MapVIN, // ThangPV
    ...rptTheoDoiKiemTraDatHang, // ThangPV
    ...rptDuKienDongTienTT_ChiTietData, // ThangPV
    ...rpt_SMCertificate, // ThangPV
    ...rpt_PivotQLDatHangTraHang, // ThangPV
    ...rpt_TongHopXeDaiLy, // ThangPV
    ...rpt_SalesBalanceOrder, // ThangPV
    ...rptStatisticHTCStock03,
    ...useRptPivotDlrTestDriver,
    ...RptStatisticDealerStockForSaleMstData,
    ...useRptPivotDlrCtmVisit,
    ...useRptShareHTCStock03,
    ...useRptDlrContractInstock,
    ...useRptPivotTransPlan,
    ...useRptSellCustomerDealerForSaleMst,
    ...useRptBusinessPlanSummaryApi,
    ...useRptStatisticHTCCarDocReq,
    ...rptStatisticDealerStock21,
    ...rptStaticGrpDealerInSock02,
    ...rptMasterdata,
    ...useRptCarDeliveryOrderExpectData,
    ...useRptPivotTransPlanF, // DongNV
    ...rpt_PenaltyPmtDelay, // DongNV
    ...rpt_statistic_DMS40CarDeliveryOrder, // DongNV
    ...rptDuBaoDatHang5THTMV, //DongNV
    ...rptSaleExpectedTarget, //DongNV
    ...rpt_BLDenhanthanhtoan, //DongNV
    ...rpt_StockAndSalesDealer, //DongNV
    ...mstCarAllocationByArea, //DongNV
    ...rpt_EstimateDeliveryPlan, //LinhPV
    ...rpt_DelayguaranteePaymentRealTime, //LinhPV
    ...rpt_MinimumSurvivalRealTime, //LinhPV
    ...rpt_OrdOrderPlanHTMV, //LinhPV
    ...rpt_QuotaForDealer, //LinhPV
    // report end
    ...useMstInvoiceIDHTC, // ThangPV
    ...mstInvoiceIDApi,
    ...useMstQuota,
    ...useMstCarColorApi,
    ...useMstPosition,
    ...useMstInventoryCost,
    ...useMstSalesManTypeCertificate,
    ...useMstBankAccount, // ThangPV
    ...useMstWarrantyExpires,
    ...useMstMngRateTonKhoBanHang,
    ...useMstAmplitudeApprOrd,
    ...useAutoMapVINDistributionSumRate,
    ...useMstRegistrationInfo,
    ...useMstVINProductionYearActual,
    ...useMstMinInventory,
    ...useMstStorageAreaRate,
    ...useMstUnitPriceAVN,
    ...useMstCostTypeApi,
    ...provinceApis,
    ...dealerApis,
    ...mstAreaApi,
    ...mstPort,
    ...mstPortType,
    ...mstDealerType,
    ...mstDistrict,
    ...userApis,
    ...useDlrCA,
    ...useMstTransporterCar,
    ...useMstTransporter,
    ...userApis,
    ...mstSalesOrderType,
    ...mstStorage,
    ...userApis,
    ...mstPart, //DongNV
    ...mstMaintainTaskItem, //DongNV
    ...mstPaymentType,
    ...mstCarCancelType,
    ...mstPlant,
    ...mstCarInvoice,
    ...mstCarSpec,
    ...mstDelaerSalesGroupType,
    ...mstDelaerSalesType,
    ...mstDiscount,
    ...useMstPointRegisApi,
    ...mstTransporterDriver,
    ...mstCarModel,
    ...mstCarOCN,
    ...mstStorageGlobal,
    ...rptPrincipleContract,
    ...useMstInsuranceCompany,
    ...dlrStorageLocal,
    ...useMngQuota,
    ...mstContractUpdateType,
    ...useMstCabinCertificate,
    ...useCustomerBaseExportExcel,
    ...useMstUnitPriceGPS,
    ...useMstInsuranceTypeApi,
    ...useMstInsuranceFee,
    ...useMstDelayTransports,
    ...useAutoMapVINStorageRate,
    ...mstCarColor,
    ...mstCarStdOpt,
    ...mstRateApprOrderModelMax,
    ...useMstCarPrice,
    ...useMstBankDealer,
    ...useMstDepartment,
    ...useMstQualification,
    ...useTCGCarPrice, // ThangPV
    ...useMstTCGCarSalePrice,
    ...useMstSalesManType,
    ...useMstBankApi,
    ...useMstMarriage,
    ...useRptPayment01,
    ...rptHRSalesMan,
    ...rptStatisticHTCStockOut02Api,
    ...rptStatisticGrpDealer02,
    ...rptStatisticHTCBackOrderSpecCode01Pivot,
    ...rptStatisticHTCStockOutOnWay,
    ...rptBaoCaoMoi,
    ...rptDLSDealLoanEUBankMarketSum01,
    ...getCurrentUserApis,
    ...rptDLSDealDetailLoanEUBankMarketSum01,
    ...rptSalesCtmCare01,
    ...rptUpdSalesManByDelear,
    ...rptSalesReportApi,
    ...rptSaleBaoCaoTongHopGet,
    ...rptTonHoSoNganHang,
    ...rpt_StatisticHTCStock01,
    ...rpt_StockInHTC,
    ...rpt_DebitReport02New,
    ...rpt_StatisticGrpDealer01,
    ...rpt_StatisticHTCBackOrderDealer01,
    ...rpt_StatisticHTCBackOrderSpecCode01,
    ...rpt_GuaranteeDebit01,
    ...rpt_SalesDelivery01,
    ...rpt_NXTQuyenDoiNo,
    ...rpt_SalesPeriod01,
    ...rpt_NhapXuatTonTrongKy,
    ...rpt_XuatHoSo,
    ...rpt_RevenueHTCInvoice,
    ...rpt_PivotRevenueBySpec,
    ...rpt_CarColorChangeHistory,
    ...rpt_WOOrderAndSchedule01,
    ...rpt_StatisticPIInStock,
    ...rpt_BaoCaoXeThieuBBBG,
    ...rpt_BCSupportDealerSales,
    ...rpt_CarAllocationByArea,
    ...rpt_Master,
    ...useCarDeliveryOrderApi,
    ...useCarCarApi,
    ...useStoTranspReq,
    ...rpt_PivotRetailContractApi,
    ...rpt_HMCReportV2,
    ...rpt_StatisticHTCStock02,
    ...rpt_PivotPDI,
    ...rpt_PivotMnfPlanMnfSummary,
    ...rpt_PivotKHSX,
    ...CommonApi,
  };
};

export const useClientgateApi = () => {
  const {
    auth: { currentUser, networkId, orgData, clientGateUrl },
  } = useAuth();
  return createClientGateApi(
    currentUser!,
    clientGateUrl!,
    networkId,
    orgData?.Id!
  );
};

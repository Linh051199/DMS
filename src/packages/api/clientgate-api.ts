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
import { useRptStatisticHTCBackOrderSpecCode01 } from "./clientgate/Rpt_StatisticHTCBackOrderSpecCode01Api";
import { useRptStatisticHTCStockOutOnWay } from "./clientgate/Rpt_StatisticHTCStockOutOnWayApi";
import { useSys_user } from "./clientgate/Sys_UserApi";
import { useRpt_PmtGuaranteeBankMarketSum01 } from "./clientgate/Rpt_PmtGuaranteeBankMarketSum01Api";
import { useRpt_PmtPaymentLoanBankMarketSum01 } from "./clientgate/Rpt_PmtPaymentLoanBankMarketSum01Api";
import { useSys_UserControl } from "./clientgate/Sys_UserControlApi";
import { useRptUpdSalesManByDelear } from "./clientgate/Rpt_UpdSalesManByDelearApi";
import { useRptSalesReportApi } from "./clientgate/Rpt_SalesReportApi";
import { useRptSaleBaoCaoTongHopGet } from "./clientgate/Rpt_SaleBaoCaoTongHopGetApi";
import { useRpt_TonHoSoNganHang } from "./clientgate/Rpt_TonHoSoNganHangApi";
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
      if (
        result.isSuccess &&
        !!data.Data._objResult &&
        !!data.Data._objResult.DataList
      ) {
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
        if (typeof data.Data?._objResult !== "string") {
          result.Data = data.Data?._objResult?.map((item: any) => {
            // if `item` has `FlagActive` property
            if (Object.keys(item).includes("FlagActive")) {
              item.FlagActive = item.FlagActive === "1";
            }
            return {
              ...item,
            };
          });
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
  const getCurrentUserApis = useGetForCurrentUser(reportApiBase);
  const provinceApis = useMst_Province_api(apiBase);
  const dealerApis = useDealerApi(apiBase);

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
  const useMstBankAccount = useMst_BankAccount(apiBase);
  const useMstCarPrice = useMst_CarPrice(apiBase);
  const useMstBankDealer = useMst_BankDealer(apiBase);
  const useMstDepartment = useMst_Department(apiBase);
  const useMstQualification = useMst_Qualification(apiBase);
  const useMstInventoryCost = useMst_InventoryCost(apiBase);
  const useMstSalesManTypeCertificate = useMst_SalesManTypeCertificate(apiBase);
  const useTCGCarPrice = useMst_TCGCarPriceApi(apiBase);
  const useMstTCGCarSalePrice = useMst_TCGCarSalePrice(apiBase);
  const useMstSalesManType = useMst_SalesManTypeApi(apiBase);
  const useMstPosition = useMst_Position(apiBase);
  const useMstCarColorApi = useMst_CarColorApi(apiBase);
  const useMstBankApi = useMst_BankApi(apiBase);
  const useMstMarriage = useMst_MarriageApi(apiBase);
  const useMstQuota = useMst_Quota(apiBase);
  const useRptPayment01 = useRptPayment01Api(reportApiBase);
  const mstInvoiceIDApi = useMst_InvoiceIDApi(apiBase);
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
  const rptStatisticHTCBackOrderSpecCode01 =
    useRptStatisticHTCBackOrderSpecCode01(reportApiBase);
  const rptStatisticHTCStockOutOnWay =
    useRptStatisticHTCStockOutOnWay(reportApiBase);

  // DongNV
  const rptStaticGrpDealerInSock02 =
    useRptStaticGrpDealerInSock02(reportApiBase);
  const rptMasterdata = useRptMasterData(reportApiBase);
  const useRptCarDeliveryOrderExpectData =
    useRpt_CarDeliveryOrderExpectData(reportApiBase);

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
  // report end
  const useRptShareHTCStock03 = useRpt_ShareHTCStock03(reportApiBase);
  const useRptPivotDlrCtmVisit = useRpt_PivotDlrCtmVisit(reportApiBase);
  const rptBaoCaoMoi = useRptBaoCaoMoi(reportApiBase);
  const useRptPivotDlrTestDriver = useRpt_PivotDlrTestDriver(reportApiBase);
  const rptSalesCtmCare01 = useRptSalesCtmCare01(reportApiBase);
  const rptUpdSalesManByDelear =useRptUpdSalesManByDelear(reportApiBase)
  const rptSalesReportApi =useRptSalesReportApi(reportApiBase)
  const rptSaleBaoCaoTongHopGet = useRptSaleBaoCaoTongHopGet(reportApiBase);
  const rptTonHoSoNganHang = useRpt_TonHoSoNganHang(reportApiBase);
  const sysuser = useSys_user(reportApiBase);
  const SysUserControl = useSys_UserControl(reportApiBase);


  return {
    // report start
    ...SysUserControl,
    ...sysuser,
    ...useRptSPLSPSupportRetail, // ThangPV
    ...useRptPmtGuaranteeBankMarketSum01, // ThangPV
    ...useRptPmtPaymentLoanBankMarketSum01, // ThangPV
    ...useRptProfileGuaranteeEffectt, // ThangPV
    ...rptPivotRearrangeCBParam, // ThangPV
    ...rptStatisticHTCStockOut01, // ThangPV
    ...rptStatisticGrpDealer03, // ThangPV
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
    ...useRptPivotTransPlanF,
    // report end
    ...mstInvoiceIDApi,
    ...useMstQuota,
    ...useMstCarColorApi,
    ...useMstPosition,
    ...useMstInventoryCost,
    ...useMstSalesManTypeCertificate,
    ...useMstBankAccount,
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
    ...useTCGCarPrice,
    ...useMstTCGCarSalePrice,
    ...useMstSalesManType,
    ...useMstBankApi,
    ...useMstMarriage,
    ...useRptPayment01,
    ...rptHRSalesMan,
    ...rptStatisticHTCStockOut02Api,
    ...rptStatisticGrpDealer02,
    ...rptStatisticHTCBackOrderSpecCode01,
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

export interface ClientGateInfo {
  SolutionCode: string;
  NetworkID: string;
  NetworkName: string;
  GroupNetworkID: string;
  CoreAddr: string | null;
  PingAddr: string | null;
  XSysAddr: string | null;
  WSUrlAddr: string;
  WSUrlAddrLAN: string;
  DBUrlAddr: string | null;
  DefaultVersion: string;
  MinVersion: string;
  FlagActive: string;
  LogLUDTime: string;
  LogLUBy: string;
}

export interface ClientGateInfoResponse {
  Data: {
    _strTId: string;
    _strAppTId: string;
    _objTTime: string;
    _strType: string;
    _strErrCode: string;
    _objResult?: ClientGateInfo[];
    _excResult: any;
    _dicDebugInfo: {
      strTid: string;
      strAppTId: string;
      "dataInput.SolutionCode": string;
      "dataInput.NetworkIDSearch": string;
    };
  };
}
export interface DeleteBankAccountParam {
  AccountNo: string;
  BankCode: string;
}
export interface Mst_Dealer {
  DealerCode: string;
  DealerType: string;
  ProvinceCode: string;
  BUCode: string;
  BUPattern: string;
  DealerName: string;
  FlagDirect: string;
  FlagActive: string;
  DealerScale: string;
  DealerPhoneNo: string;
  DealerFaxNo: string;
  CompanyName: string;
  CompanyAddress: string;
  ShowroomAddress: string;
  GarageAddress: string | null;
  GaragePhoneNo: string | null;
  GarageFaxNo: string | null;
  DirectorName: string | null;
  DirectorPhoneNo: string | null;
  DirectorEmail: string | null;
  SalesManagerName: string | null;
  SalesManagerPhoneNo: string | null;
  SalesManagerEmail: string;
  GarageManagerName: string | null;
  GarageManagerPhoneNo: string | null;
  GarageManagerEmail: string | null;
  TaxCode: string;
  ContactName: string;
  Signer: string | null;
  SignerPosition: string | null;
  CtrNoSigner: string | null;
  CtrNoSignerPosition: string | null;
  HTCStaffInCharge: string | null;
  Remark: string;
  DealerAddress01: string | null;
  DealerAddress02: string | null;
  DealerAddress03: string | null;
  DealerAddress04: string | null;
  DealerAddress05: string | null;
  FlagTCG: string;
  FlagAutoLXX: string;
  FlagAutoMapVIN: string;
  FlagAutoSOAppr: string;
}

export interface Mst_TransporterCar {
  TransporterCode: string;
  PlateNo: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_UnitPriceAVN {
  AVNCode: string;
  EffDateTime: string;
  UnitPriceAVN: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Transporter {
  TransporterCode: string;
  TransporterName: string;
  FlagActive: number;
  TransportContractNo: string;
  Address: string;
  PhoneNo: string;
  FaxNo: string;
  DirectorFullName: string;
  DirectorPhoneNo: string;
  ContactorFullName: string;
  ContactorPhoneNo: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Auto_MapVIN_StorageRate {
  StorageCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBTVal: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_DelayTransports {
  StorageCode: string;
  StorageName: string;
  DealerCode: string;
  DealerName: string;
  DelayTransport: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InsuranceType {
  InsCompanyCode: string;
  InsTypeCode: string;
  EffectiveDate: string;
  InsTypeName: string;
  Rate: string;
  FlagActive: number;
  Remark: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_UnitPriceGPS {
  ContractNo: string;
  UnitPrice: string;
  EffStartDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InsuranceFee {
  InsuranceContractNo: string;
  InsurancePercent: string;
  EffStartDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Dlr_CA {
  AutoId: string;
  DealerCode: string;
  CAIssuer: string;
  CASubject: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Port {
  PortCode: string;
  PortName: string;
  ProvinceCode: string;
  PortAddress: string;
  PortType: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_PortType {
  PortType: string;
  PortTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_InsuranceCompany {
  InsCompanyCode: string;
  InsCompanyName: string;
  FlagActive: number;
  Remark: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_District {
  DistrictCode: string;
  ProvinceCode: string;
  DistrictName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_DealerType {
  DealerType: string;
  DealerTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}



export interface CGResult<T> {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  ItemCount: number;
  DataList: T[];
}

export interface CGResponse<T> {
  Data: {
    _strTId: string;
    _strAppTId: string;
    _objTTime: string;
    _strType: string;
    _strErrCode: string;
    _objResult: CGResult<T> | T;
    _excResult: any;
    _dicDebugInfo: {
      strTid: string;
      strAppTId: string;
    };
  };
  isSuccess?: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  errorCode: string;
  errorInfo?: object;
  debugInfo: object;
  DataList?: T[];
  Data?: T;
  ItemCount?: number;
  PageCount?: number;
  PageIndex?: number;
  PageSize?: number;
}

export enum FlagActiveEnum {
  Active = "1",
  Inactive = "0",
  All = "",
}

export interface SearchParam {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}
export interface SearchSys_UserControl {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
  GroupCode: string;
  GroupName: string;
}

export interface Search_Mst_Quota extends SearchParam {
  DealerCode: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
}

export interface Search_Mst_Bank extends SearchParam {
  BankCode: string;
  BankName: string;
  FlagPaymentBank: FlagActiveEnum;
  FlagMonitorBank: FlagActiveEnum;
  FlagMortageBank: FlagActiveEnum;
}

export interface Search_Mst_Quota_Param extends SearchParam {
  DealerCode: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
}

export interface Search_Mst_Transporter extends SearchParam {
  TransporterCode: string;
  TransporterName: string;
}
export interface Search_Mst_TCGCarPrice extends SearchParam {
  SOType: string;
  SpecCode: string;
}

export interface SearchDealerParam extends SearchParam {
  DealerCode: string;
  DealerName: string;
  FlagAutoLXX: FlagActiveEnum;
  FlagAutoMapVIN: FlagActiveEnum;
  FlagAutoSOAppr: FlagActiveEnum;
}

export interface Search_Mst_BankAccount extends SearchParam {
  DealerCode?: string;
  AccountNo?: string;
}

export interface Search_Mst_BankDealer extends SearchParam {
  DealerCode?: string;
  BankCode?: string;
}
// TCGCarSalesPrice
export interface SearchTCGCarSalePriceParam extends SearchParam {
  SpecCode: string;
}

export interface DeleteTCGCarSalePriceParam {
  SpecCode: string;
}

export interface Mst_TCGCarSalePriceParam {
  SpecCode: string;
  SpecDescription: string;
  UnitPrice: number;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface Mst_InvoiceIDSearch {
  InvoiceIDCode?: string;
  CreatedDateFrom?: string;
  CreatedDateTo?: string;
  FlagActive?: any;
  Ft_PageSize?: number;
  Ft_PageIndex?: number;
}
// Mst_SalesManType
export interface Mst_SalesManType extends SearchParam {
  DepartmentCode: string;
  SMType: string;
  SMTypeName: string;
  FlagEmail: string;
  FlagActive: any;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface DeleteDealerParam {
  DealerCode: string;
}

export interface Mst_WarrantyExpires {
  ModelCode: string;
  WarrantyExpires: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  WarrantyKM: string;
  mcm_ModelName: string;
}

export interface Mst_MngRateTonKhoBanHang {
  DealerCode: string;
  ModelCode: string;
  NguongBH: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Bank {
  BankCode: string;
  BankCodeParent: string;
  BankName: string;
  BankBUCode: string;
  BankBUPattern: string;
  FlagPaymentBank: string;
  FlagMortageBank: string;
  FlagActive: string;
  PhoneNo: string;
  FaxNo: string;
  Address: string;
  PICName: string;
  PICPhoneNo: string;
  PICEmail: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FlagMonitorBank: string;
  ProvinceCode: string;
  ProvinceName: string;
  BenBankCode: string;
  NumberOfGuaranteeExt: string;
}

export interface Mst_BankAccount {
  AccountNo: string;
  KeyWord: string;
  BankCode: string;
  DealerCode: string;
  AccountName: string;
  FlagAccGrtClaim: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  AccountNoHTC: string;
  md_DealerName: string;
  mb_BankName: string;
}

// export interface Mst_BankAccount {
//   AccountNo?: string;
//   KeyWord?: string;
//   BankCode?: string;
//   DealerCode?: string;
//   AccountName?: string;
//   FlagAccGrtClaim?: string;
//   FlagActive?: string;
//   LogLUDateTime?: string;
//   LogLUBy?: string;
//   AccountNoHTC?: string;
//   md_DealerName?: string;
//   mb_BankName?: string;
// }

export interface Mst_AmplitudeApprOrd {
  DealerCode: string;
  ModelCode: string;
  AmplitudeOrdMax: string;
  AmplitudePlanMax: string;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm_ModelName: string;
}
export interface Sys_UserControl {
  DataList: {
    GroupCode: string;
    GroupName: string;
    FlagActive: string;
    LogLUDTimeUTC: string;
    LogLUBy: string;
    MST: string;
  };
}
export interface Sys_UserControlData {
  GroupCode: string;
  GroupName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
  MST: string;
}

export interface Mng_Quota {
  DealerCode: string;
  SpecCode: string;
  QtyQuota: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  UpdateBy: string;
  UpdateDTime: string;
  md_DealerName: string;
  mcm_ModelCode: string;
  mcm_ModelName: string;
  mcs_SpecDescription: string;
}

export interface Mst_Area {
  AreaCode: string;
  AreaName: string;
  AreaRootCode: string;
  Level: string;
  FlagActive?: FlagActiveEnum;
  LogLUDTimeUTC?: string;
  LogLUBy: string;
}

// Quản lý địa điểm nhận xe của Đại lý
export interface Mst_PointRegis {
  PointRegisCode: string; // Mã địa điểm
  DealerCode: string; // Mã đại lý
  PointRegisName: string; // Địa chỉ giao xe
  MapLongitude: string; // Kinh độ
  MapLatitude: string; // Vĩ độ
  Radius: string; // Bán kính
  Remark: string; // Ghi chú
  FlagActive: string; // Trạng thái
  LogLUDateTime?: string;
  LogLUBy: string;
  md_DealerName: string; // Tên đại lý
}

export interface User {
  UserCode: string;
  SUDealerCode: string;
  SUBankCode: string;
  UserName: string;
  UserPassword: string;
  FlagSysAdmin: string;
  FlagSysViewer: string;
  SUFlagActive: string;
  SUTransporterCode?: string;
  SUInsCompanyCode: string;
  NetworkID?: string;
  UserPasswordNew?: string;
  PhoneNo?: string;
  EMail?: string;
  MST?: string;
  OrganCode?: string;
  DepartmentCode?: string;
  Position?: string;
  VerificationCode?: string;
  Avatar?: string;
  UUID?: string;
  FlagDLAdmin?: string;
  FlagNNTAdmin?: string;
  OrgID?: string;
  CustomerCodeSys?: string;
  CustomerCode?: string;
  CustomerName?: string;
  FlagActive: string;
  LogLUDTimeUTC?: string;
  LogLUBy: string;
  ACId?: string;
  ACAvatar?: string;
  ACEmail?: string;
  ACLanguage?: string;
  ACName?: string;
  ACPhone?: string;
  ACTimeZone?: string;
  mo_OrganCode?: string;
  mo_OrganName?: string;
  mdept_DepartmentCode?: string;
  mdept_DepartmentName?: string;
  mnnt_DealerType?: string;
  ctitctg_CustomerGrpCode?: string;
}

export interface Mst_SalesOrderType {
  SOType: string;
  SOTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Storage {
  StorageCode: string;
  StorageName: string;
  ProvinceCode: string;
  StorageAddress: string;
  StorageType: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_VINProductionYear_Actual {
  AssemblyStatus: string;
  VINCharacters: string;
  ProductionYear: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_MinInventory {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  QtyInv: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_PaymentType {
  PaymentType: string;
  PaymentTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CarCancelType {
  CarCancelType: string;
  CarCancelTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Plant {
  PlantCode: string;
  PlantName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CarInvoice {
  SpecCode: string;
  VehiclesType: string;
  NumberOfSeats: string;
  CarType: string;
  VAT: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CabinCertificate {
  CabinCertificateNo: string;
  CarType: string;
  FlagActive: number;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_StorageAreaRate {
  StorageCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBTVal: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Auto_MapVIN_DistributionSumRate {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_RegistrationInfo {
  RegistYear: string;
  ProvinceCode: string;
  ProvinceName: string;
  Qty: string;
  RegistPercent: string;
  TotalAmount: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InventoryCost {
  StorageCode: string;
  StorageName: string;
  CostTypeCode: string;
  CostTypeName: string;
  UnitPrice: string;
  FlagActive: number;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CustomerBase {
  CustomerBaseCode: string;
  CustomerBaseName: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLuBy: string;
}

export interface Mst_CarSpec {
  ModelCode: string;
  RootSpec: string;
  SpecCode: string;
  SpecDescription: string;
  StdOptCode: string;
  OCNCode: string;
  GradeCode: string;
  AssemblyStatus: string;
  FlagAmbulance: string;
  FlagInvoiceFactory: string;
  NumberOfSeats: string;
  QuotaDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_DealerSalesGroupType {
  SalesGroupType: string;
  SalesGroupTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_DealerSalesType {
  SalesType: string;
  SalesGroupType: string;
  SalesTypeName: string;
  SalesTypeNameVN: string;
  SalesTypeDescription: string;
  SalesTypeDescriptionVN: string;
  FlagActive: string;
  FlagActiveLogLUDTimeUTC: string;
  LogLUBy: string;
}
export interface Mst_InvoiceIDType {
  InvoiceIDCode: string;
  InvoiceIDType: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagActive: string;
  LogLUDTimeUTC: null;
  LogLUBy: string;
}

export interface Mst_Discount {
  EffectiveDate: string;
  EffectiveDateEnd: string;
  DiscountPercent: string;
  PenaltyPercent: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FnExpPercent: string;
  PmtDsTCGPercent: string;
}

export interface Mst_TransporterDriver {
  TransporterCode: string;
  DriverId: string;
  DriverFullName: string;
  DriverLicenseNo: string;
  DriverPhoneNo: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarModel {
  ModelCode: string;
  ModelProductionCode: string;
  ModelName: string;
  SegmentType: string;
  QuotaDate: string;
  FlagBusinessPlan: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarOCN {
  ModelCode: string;
  OCNCode: string;
  OCNDescription: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Rpt_PrincipleContract {
  DealerCode: string;
  PrincipleContractNo: string;
  PrincipleContractDate: string | Date;
  BankInfo: string;
  Representative: string;
  JobTitle: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_StorageGlobal {
  StorageCode: string;
  StorageName: string;
  ModelCode: string;
  ModelName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Dlr_StorageLocal {
  StorageCode: string;
  StorageName: string;
  DealerCode: string;
  DealerName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CostType {
  CostTypeCode: string;
  CostTypeName: string;
  FlagActive: number;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_ContractUpdateType {
  ContractUpdateType: string;
  ContractUpdateTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}
export interface DeleteCarColorParam {
  ModelCode: string;
  ColorCode: string;
}
export interface SearchCarColor {
  KeyWord: string;
  FlagActive?: FlagActiveEnum;
  Ft_PageIndex?: number;
  ModelCode: string;
  ColorCode: string;
  ColorExtNameVN: string;
  ColorIntNameVN: string;
  Ft_PageSize?: number;
}

export interface Mst_Quota {
  QuotaCode: string;
  DealerCode: string;
  QuotaName: string;
  ModelCondition: string;
  ModelPromotion: string;
  SpecCodeCondition: string;
  SpecCodePromotion: string;
  QtyCondition: string;
  QtyPromotion: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm1_ModelNameCondition: string;
  mcm2_ModelNamePromotion: string;
  mcs1_SpecDescriptionCondition: string;
  mcs2_SpecDescriptionPromotion: string;
}

export interface Mst_CarColor {
  ModelCode: string;
  ColorCode: string;
  ColorExtType: string;
  ColorExtCode: string;
  ColorExtName: string;
  ColorExtNameVN: string;
  ColorIntCode: string;
  ColorIntName: string;
  ColorIntNameVN: string;
  ColorFee: string;
  FlagActive?: any;
  Remark: string;
}

export interface Mst_CarStdOpt {
  ModelCode: string;
  StdOptCode: string;
  GradeCode: string;
  StdOptDescription: string;
  GradeDescription: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchMst_CarSpecParam extends SearchParam {
  SpecCode: string;
  SpecDescription: string;
  FlagActive: FlagActiveEnum;
  AssemblyStatus: string;
}

export interface SearchMst_CarStdOptParam extends SearchParam {
  ModelCode: string;
  StdOptCode: string;
  StdOptDescription: string;
}

export interface Mst_RateApprOrderModelMax {
  DealerCode: string;
  ModelCode: string;
  RateApprMax: string;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm_ModelName: string;
}

// DongNV

export interface Mst_Marriage {
  MarriageCode: string;
  Description: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface SearchSysUser {
  UserName: string;
  KeyWord: string;
  UserCode: string;
  DealerCode: string;
  BankCode: string;
  TransporterCode: string;
  InsCompanyCode: string;
  FlagActive: string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface SearchBankParam extends SearchParam {
  BankCode: string;
  BankName: string;
  FlagPaymentBank: FlagActiveEnum;
  FlagMortageBank: FlagActiveEnum;
  FlagMonitorBank: FlagActiveEnum;
}

export interface DeleteTCGCarPriceParam {
  SOType: string;
  SpecCode: string;
  EffectiveDate: string;
}

export interface Mst_TCGCarPrice {
  SOType: string;
  SpecCode: string;
  SpecDescription: string;
  EffectiveDate: any;
  UnitPrice: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchTCGCarPriceParam extends SearchParam {
  SOType: string;
  SpecCode: string;
}

export interface DeleteBankParam {
  BankCode: string;
  BankName: string;
}

// ===================================

export interface SearchTCGCarPriceParam extends SearchParam {
  SOType: string;
  SpecCode: string;
}

export interface Mst_Qualification {
  QualificationCode: string;
  QualificationName: string;
  Remark: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_BankDealer {
  DealerCode: string;
  BankName: string;
  DealerName: string;
  BankCode: string;
  FlagActive: string;
  FlagBankGrt: FlagActiveEnum;
  FlagBankPmt: FlagActiveEnum;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchBankDealerParam {
  // KeyWord: string;
  FlagActive: FlagActiveEnum;
  BankCode: string;
  DealerCode: string;
  FlagBankPmt: FlagActiveEnum;
  FlagBankGrt: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface Mst_CarPrice {
  SOType: string;
  SpecCode: string;
  SpecDescription: string;
  EffectiveDate: string;
  UnitPrice: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchCarPriceParam {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  SOType: string;
  SpecCode: string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}
export interface RptPaymentParam {
  GrtNo: string;
  VIN: string;
  DateOpenFrom: Date | string;
  DateOpenTo: Date | string;
  SoCode: string;
  ModelCode: string;
  OSODAppDateFrom: Date | string;
  OSODAppDateTo: Date | string;
  Status: string;
  DealDateFrom: Date | string;
  DealDateTo: Date | string;
  PMGDateEndFrom: Date | string;
  PMGDateEndTo: Date | string;
  DealerCode: string;
  CPTCStatus: string;
  FlagEarlyCancel: string;
  FlagisHTC: string;
  FlagDataWH: string | boolean;
}
export interface RptPaymentRecord {
  CARID: string;
  OSO_APPROVEDDATE2: string;
  CARCANCELDATE: string | null;
  PMG_BANKCODE: string;
  DUTYCOMPLETEDDATE: string;
  DEALERCODE: string;
  DLRCTRNO: string;
  FLAGDEALERCONTRACTDMS40: string;
  OSOD_DEPOSITDUTYENDDATE: string;
  PMG_BANKGUARANTEENO: string;
  PMG_DATEOPEN: string;
  PMGD_GUARANTEEVALUE: number;
  DEBTPOLICY_PAYMENTENDDATE: string;
  PMGD_DATESTART: string;
  TOTALCOMPLETEDDATE: string;
  PM1_PAYMENTENDDATE: string;
  PM2_PAYMENTENDDATE: string | null;
  PM3_PAYMENTENDDATE: string | null;
  PMGD_GUARANTEEPERCENT: number;
  SOCODE: string;
  PMG_TERMACTUAL: number;
  PM1_DISCOUNTDAYS: number;
  PM2_DISCOUNTDAYS: number | null;
  PM3_DISCOUNTDAYS: number | null;
  PM1_PMTDTLAMOUNT: number;
  PM2_PMTDTLAMOUNT: number | null;
  PM3_PMTDTLAMOUNT: number | null;
  GUARANTEEDISCOUNT: number;
  SPECCODE: string;
  GUARANTEECOMPLETEDAMOUNT: number;
  TOTALCOMPLETEDAMOUNT: number;
  PM1_DISCOUNTPERCENT: number;
  PM2_DISCOUNTPERCENT: number | null;
  PM3_DISCOUNTPERCENT: number | null;
  UNITPRICEACTUAL: number;
  VIN: string;
  PMGD_DATEEXPIRED: string;
  PM1_DISCOUNTVALUE: number;
  PM2_DISCOUNTVALUE: number | null;
  PM3_DISCOUNTVALUE: number | null;
  COCONLY_COMPLETEDDATE: string;
  PMG_APPROVEDDATE: string;
  CMP1_AMOUNTACCUM_CBU30_CKD15: number;
  CMP1_PAYMENTENDDATE_CBU30_CKD15: string;
  PMGD_DATEEND: string;
  CPTCSTATUS: string;
  OSO_FLAGPMTDELAYDONE: string;
  OSOD_GRTENDDATE: string;
  CMP1_60_PAYMENTENDDATE: string;
  CDOAPPROVEDDATE2: string;
  CDODDELIVERYENDDATE: string;
  CDODDELIVERYOUTDATE: string;
  MYCOLORCODE: string;
  MYMODELCODE: string;
  MYSPECCODE: string;
  OSOD_APPROVEDDATE: string;
  MD_DEALERNAME: string;
  DISCOUNTVALUE: number;
  FLAGEARLYCANCEL: string;
  PM1_CREATEDDATE: string;
  PM2_CREATEDDATE: string | null;
  PM3_CREATEDDATE: string | null;
  PM1_TOTALAMOUNT: number;
  PM2_TOTALAMOUNT: number | null;
  PM3_TOTALAMOUNT: number | null;
}

export interface RptPayment01Data {
  Lst_RptPayment_01_Mst: RptPaymentRecord[];
}

export interface RptHRSalesManParam {
  DealerCodeInput: string;
  AreaCode: string;
  SMType: string;
  HRMonthFrom: string;
  HRMonthTo: string;
  FlagDataWH: number;
}

export interface RptHRSalesManParamDto
  extends Omit<RptHRSalesManParam, "HRMonthFrom" | "HRMonthTo" | "FlagDataWH"> {
  ReportBy: "A" | "D";
  HRMonthFrom: number;
  HRMonthTo: number;
  FlagDataWH: boolean;
}
export interface MonthData {
  year: number;
  month: number;
}

export interface RptStatisticHTCStockOut02Param {
  MonthReport: string;
  FlagDataWH: 0 | 1;
  DealerCodes?: string;
  ModelCodes?: string;
}

export interface RptSalesReportParam {
  MonthReport: string;
  FlagDataWH: 0 | 1;
  DealerCodes?: string;
  ModelCodes?: string;
}

export interface RptStatisticHTCStockOut02ParamDto {
  ReportBy?: "M" | "D";
  MonthReport: Date;
  FlagDataWH: boolean;
  DealerCodes?: string[];
  ModelCodes?: string[];
}

export interface RptSalesReportParamDto {
  ReportBy: "M" | "D";
  MonthReport: Date;
  FlagDataWH: boolean;
  DealerCodes?: string[];
  ModelCodes?: string[];
}

export interface RptHRSalesManByDealerRecord {
  DEALERCODE: string;
  HRMONTH: string;
  QUY: number;
  YEAR: number;
  SMTYPE: string;
  TOTALQTYSMWORKING: number;
  TOTALQTYSMNOWORKING: number;
}
export interface RptHRSalesManByAreaRecord {
  AREACODE: string;
  HRMONTH: string;
  QUY: number;
  YEAR: number;
  SMTYPE: string;
  TOTALQTYSMWORKING: number;
  TOTALQTYSMNOWORKING: number;
}

export type RptHRSalesManRecord =
  | RptHRSalesManByDealerRecord
  | RptHRSalesManByAreaRecord;
export interface RptStatisticHTCStockOut02ByModelRecord {
  CVModelCode: string;
  Total: number;
  Level: number;
  ModelName: string;
  ModelProductionCode: string;
  Day01: number;
  Day02: number;
  Day03: number;
  Day04: number;
  Day05: number;
  Day06: number;
  Day07: number;
  Day08: number;
  Day09: number;
  Day10: number;
  Day11: number;
  Day12: number;
  Day13: number;
  Day14: number;
  Day15: number;
  Day16: number;
  Day17: number;
  Day18: number;
  Day19: number;
  Day20: number;
  Day21: number;
  Day22: number;
  Day23: number;
  Day24: number;
  Day25: number;
  Day26: number;
  Day27: number;
  Day28: number;
  Day29: number;
  Day30: number;
  Day31: number;
}
export interface RptStatisticHTCStockOut02ByDealerRecord {
  DealerCode: string;
  DealerName: string;
  Total: number;
  Level: number;
  Day01: number;
  Day02: number;
  Day03: number;
  Day04: number;
  Day05: number;
  Day06: number;
  Day07: number;
  Day08: number;
  Day09: number;
  Day10: number;
  Day11: number;
  Day12: number;
  Day13: number;
  Day14: number;
  Day15: number;
  Day16: number;
  Day17: number;
  Day18: number;
  Day19: number;
  Day20: number;
  Day21: number;
  Day22: number;
  Day23: number;
  Day24: number;
  Day25: number;
  Day26: number;
  Day27: number;
  Day28: number;
  Day29: number;
  Day30: number;
  Day31: number;
}

export type RptStatisticHTCStockOut02Record =
  | RptStatisticHTCStockOut02ByDealerRecord
  | RptStatisticHTCStockOut02ByModelRecord;


  export type RptSalesReportRecord =
  | RptSalesReportByDealerRecord
  | RptSalesReportByModelRecord;

  export interface RptSalesReportByDealerRecord {
    DealerCode: string;
    DealerName: string;
    Total: number;
    Level: number;
    Day01: number;
    Day02: number;
    Day03: number;
    Day04: number;
    Day05: number;
    Day06: number;
    Day07: number;
    Day08: number;
    Day09: number;
    Day10: number;
    Day11: number;
    Day12: number;
    Day13: number;
    Day14: number;
    Day15: number;
    Day16: number;
    Day17: number;
    Day18: number;
    Day19: number;
    Day20: number;
    Day21: number;
    Day22: number;
    Day23: number;
    Day24: number;
    Day25: number;
    Day26: number;
    Day27: number;
    Day28: number;
    Day29: number;
    Day30: number;
    Day31: number;
  }

  export interface RptSalesReportByModelRecord {
    CVModelCode: string;
    Total: number;
    Level: number;
    ModelName: string;
    ModelProductionCode: string;
    Day01: number;
    Day02: number;
    Day03: number;
    Day04: number;
    Day05: number;
    Day06: number;
    Day07: number;
    Day08: number;
    Day09: number;
    Day10: number;
    Day11: number;
    Day12: number;
    Day13: number;
    Day14: number;
    Day15: number;
    Day16: number;
    Day17: number;
    Day18: number;
    Day19: number;
    Day20: number;
    Day21: number;
    Day22: number;
    Day23: number;
    Day24: number;
    Day25: number;
    Day26: number;
    Day27: number;
    Day28: number;
    Day29: number;
    Day30: number;
    Day31: number;
  }
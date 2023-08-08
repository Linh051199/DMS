import { atom } from "jotai";

export interface IReportParam {
  ApprovedDateFrom: any;
  ApprovedDateTo: any;
  StatusMortageEnd: any;
  TypeReport: any;
  MortageEndDateFrom: any;
  MortageEndDateTo: any;
  GrtBankCode: any;
  DateStartFrom: any;
  DateStartTo: any;
  DateEndFrom: any;
  DateEndTo: any;
  DocumentsStatus: any;
  PaymentEndDateTo: any;
  VIN: any;
  CarId: any;
  DealerCodeInput: any;
  DlrCtrNo: any;
  SOCode: any;
  BankGuaranteeNo: any;
  FlagDataWH: 1 | 0;
}

export const searchConditionAtom = atom<Partial<IReportParam>>({
  ApprovedDateTo: new Date(),
} as IReportParam);

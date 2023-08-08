// Yêu cầu vận tải
export interface Sto_TranspReq {
  TranspReqNo: string; //	Số yêu cầu vận tải
  DealerCode: string; // Mã đại lý
  TransporterCode: string; //	Đơn vị vận tải
  TransportContractNo: string; // Số hợp đồng vận tải
  CreatedDate: Date | null; //	Ngày tạo
  ApprovedDate: Date | null; //	Ngày xác nhận
  TranspReqStatus: string; //		Trạng thái
}

export interface Sto_TranspReqDtl {
  CarID: string; //	Mã xe
  VIN: string; //	VIN
  SpecDescription: string; //	Đặc tả xe
  AC_SpecDescription: string; // Đặc tả thực tế
  SerialNo: string; // Số Serial
  CVEngineNo: string; // Số máy
  ColorCode: string; //	Mã màu
  DealerCode: string; // Mã đại lý
  RefOrdNo: string; // Số Lệnh xuất xe
  StorageCode: string; //	Mã kho xuất
  TranspReqDtlStatus: string; // Trạng thái chi tiết
}

export interface Sto_TranspReqResponse {
  Lst_Sto_TranspReq: Sto_TranspReq[];
  Lst_Sto_TranspReqDtl: Sto_TranspReqDtl[];
}

export interface Sto_TranspReq_Search {
  TranspReqNo: string; // Số yêu cầu vận tải
  CarId: string; // Mã xe
  VIN: string; // Số VIN
  TranspReqDtlStatus: string; // Trạng i
  RefOrdNo: string; // Số Lệnh xuất xe
  TransporterCode: string; // Đơn vị vận tải
  CreatedDateFrom: string; // Ngày tạo từ
  CreatedDateTo: string; // Ngày tạo đến
  TranspReqType: string; // Loại YCVT // Mặc đinh truyền: CARTRANSPORT
  Ft_PageIndex: number;
  Ft_PageSize: number;
  FlagDataWH: boolean; // Lấy dữ liệu lịch sử
  CreatedDateFromTo: Date[]; //  thêm theo chuẩn frame của anh Đức => DateRangeBox custom
}

// End yêu cầu vận tải

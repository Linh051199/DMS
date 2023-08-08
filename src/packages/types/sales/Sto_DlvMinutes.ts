export interface Sto_DlvMinutes_Search {
  DlvMnNo: string; // Số Biên bản giao nhận
  TransporterCode: string; // Đơn vị vận tải
  VIN: string; // Số VIN
  FDlvMnStatus: string; // Trạng thái
  ModelCode: string; // Model
  FStorageCode: string; // Nơi xuất
  TStorageCode: string; // Nơi nhận

  CreatedDateFrom: string; // Ngày tạo từ
  CreatedDateTo: string; // Ngày tạo đến
  CreatedDateFromTo: Date[];

  DlvEndDateFrom: string; // Ngày nhận xe từ
  DlvEndDateTo: string; // Ngày nhận xe đến
  DlvEndDateFromTo: Date[];

  Ft_PageIndex: number;
  Ft_PageSize: number;
  FlagDataWH: boolean; // Lấy dữ liệu lịch sử Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

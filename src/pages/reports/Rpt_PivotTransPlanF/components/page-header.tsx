import { useI18n } from "@/i18n/useI18n";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import { Button } from "devextreme-react";

interface IPageHeader {
  toggleSearchPanel: () => void;
  onExportExcelDetail: () => void;
  onExportExcel: () => void;
}

export const PageHeader = ({
  onExportExcel,
  onExportExcelDetail,
  toggleSearchPanel,
}: IPageHeader) => {
  const { t } = useI18n("Rpt_StatisticGrpDealer03");
  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">
          Báo cáo Pivot kế hoạch vận tải (ĐVTT xác nhận)
        </div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          stylingMode={"text"}
          icon={"/images/icons/search.svg"}
          type="default"
          hoverStateEnabled={true}
          focusStateEnabled={false}
          activeStateEnabled={false}
          text={t("Search")}
          onClick={toggleSearchPanel}
          className={"mx-1"}
        />
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcelDetail")}
          onClick={onExportExcelDetail}
          className={"mx-1"}
        />
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcel")}
          onClick={onExportExcel}
          className={"mx-1"}
        />
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};

import { useI18n } from "@/i18n/useI18n";
import { format } from "date-fns";
import { Popup } from "devextreme-react";
import { useLayoutEffect } from "react";

interface IProp {
  showWaringDateFrom: boolean;
  onCloseWarning: (e: any) => void;
}

export const ShowWarning = ({ onCloseWarning, showWaringDateFrom }: IProp) => {
  const { t } = useI18n("Rpt_DuKienDongTienTT_ChiTiet");

  useLayoutEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseWarning(event);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onCloseWarning]);

  return (
    <>
      <Popup
        visible={showWaringDateFrom}
        onHiding={(e) => onCloseWarning(e.cancel)}
        dragEnabled={false}
        hideOnOutsideClick={true}
        showCloseButton={true}
        showTitle={true}
        title={t("Warning")}
        width={300}
        height={100}
      >
        <b>
          {t("TDate_FromIsDefaultCurrentDateNow ")}{" "}
          {format(Date.now(), "yyyy-MM-dd")}{" "}
        </b>
      </Popup>
    </>
  );
};

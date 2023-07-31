import { useI18n } from "@/i18n/useI18n";
import { Tabs } from "devextreme-react";
import { useState } from "react";
import { RptPmtGuaranteeBankMarketSum01 } from "./Rpt_DLSDealLoanEUBankMarketSum01/list/Rpt_DLSDealLoanEUBankMarketSum01";
import { RptPmtPaymentLoanBankMarketSum01 } from "./Rpt_DLSDealDetailLoanEUBankMarketSum01/list/Rpt_DLSDealDetailLoanEUBankMarketSum01";
import { Item } from "devextreme-react/form";

export const Rpt_PmtBankMarketSum01 = () => {
  const { t } = useI18n("Rpt_DLSDealLoanEUBankMarketSum01");

  const list = [
    {
      key: 0,
      render: <RptPmtGuaranteeBankMarketSum01 />,
      title: t("RptPmtGuaranteeBankMarketSum01"),
    },
    {
      key: 1,
      render: <RptPmtPaymentLoanBankMarketSum01 />,
      title: t("RptPmtPaymentLoanBankMarketSum01"),
    },
  ];

  const [currentTab, setCurrentTab] = useState<any>(list[0]);

  return (
    <>
      <Tabs
        selectedIndex={currentTab?.key}
        onSelectedIndexChange={(value: any) => {
          setCurrentTab(list.find((item: any) => item.key == value));
        }}
      >
        {list.map((item: any) => (
          <Item text={item.title}></Item>
        ))}
      </Tabs>

      {currentTab?.render}
    </>
  );
};

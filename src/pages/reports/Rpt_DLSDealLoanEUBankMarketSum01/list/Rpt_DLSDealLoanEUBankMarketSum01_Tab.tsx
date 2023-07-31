import { useI18n } from "@/i18n/useI18n";
import { Tabs } from "devextreme-react";
import { Item } from "devextreme-react/tabs";
import { useState } from "react";
import { Rpt_DLSDealLoanEUBankMarketSum01 } from "./Rpt_DLSDealLoanEUBankMarketSum01";
import { Rpt_DLSDealDetailLoanEUBankMarketSum01 } from "../../Rpt_DLSDealDetailLoanEUBankMarketSum01/list/Rpt_DLSDealDetailLoanEUBankMarketSum01";

const Rpt_DLSDealLoanEUBankMarketSum01_Tabs = () => {
  const { t } = useI18n("Rpt_DLSDealLoanEUBankMarketSum01");

  const list = [
    {
      key: 0,
      render: <Rpt_DLSDealLoanEUBankMarketSum01 />,
      title: t("Rpt_DLSDealLoanEUBankMarketSum01"),
    },
    {
      key: 1,
      render: <Rpt_DLSDealDetailLoanEUBankMarketSum01/>,
      title: t("Rpt_DLSDealDetailLoanEUBankMarketSum01"),
    },
  ];

  const [currentTab, setCurrentTab] = useState<any>(list[0]);

  return (
    <>
      <Tabs
        style={{ width: 650, margin: 10 }}
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

export default Rpt_DLSDealLoanEUBankMarketSum01_Tabs;

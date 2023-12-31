export const zip = (first: any[], second: any[]) =>
  first.reduce((acc, current, index) => {
    acc = acc.concat(current);
    if (second[index]) {
      acc = acc.concat(second[index]);
    } else {
      acc = acc.concat({});
    }
    return acc;
  }, []);

// a function that returns an array of unique AreaCode and count of each AreaCode
export const uniqueFilterByDataField = <T, K extends keyof T>(
  data: T[] | undefined,
  dataField: K,
  emptyValuePlaceholder?: string
) => {
  if (data) {
    return data
      .reduce((acc: any, cur: T | any) => {
        const value = cur[dataField] ?? emptyValuePlaceholder;
        const existingItem = acc.find((item: any) => item.key === value);
        if (!existingItem) {
          acc.push({ key: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { key: string; count: number }[])
      .sort((a: any, b: any) => {
        if(!a.key) {
          return -1;
        }
        if(typeof a.key !== 'string') {
          return a.key.toString().localeCompare(b.key.toString());
        }
        return a.key.localeCompare(b.key);
      })
      .map((item: any) => ({
        text: `${item.key} (${item.count})`,
        value: item.key,
      }));
  } else {
    return [];
  }
};

export const filterByFlagActive = <T>(
  data: T[] | undefined,
  displayTexts: { [key: string]: string } = {
    true: "Active",
    false: "Inactive",
  }
) => {
  if (data) {
    return data
      .reduce((acc: any, cur: T | any) => {
        const value = cur.FlagActive;
        const existingItem = acc.find((item: any) => item.key === value);
        if (!existingItem) {
          acc.push({ key: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { key: string; count: number }[])
      .map((item: any) => ({
        text: `${displayTexts[item.key]} (${item.count})`,
        value: item.key,
      }));
  } else {
    return [];
  }
};
const areaCodeFilter = <T, K = keyof T>(data: T[], dataField: K) => {};

// a convert function: "2023-05-02T17:00:00.000Z" -> "2023-05-02"
export const convertDateToString = (utcDateString: string) => {
  return new Date(utcDateString).toISOString().slice(0, 10);
};

export const flagEditorOptions = {
  searchEnabled: true,
  valueExpr: "value",
  displayExpr: "text",
  items: [
    {
      value: "1",
      text: "Active",
    },
    {
      value: "0",
      text: "Inactive",
    },
  ],
};

export const flagEditorOptionsSearch = {
  searchEnabled: true,
  valueExpr: "value",
  displayExpr: "text",
  items: [
    {
      value: "",
      text: "All",
    },
    {
      value: "1",
      text: "Active",
    },
    {
      value: "0",
      text: "Inactive",
    },
  ],
};

export const convertDate = (param: Date) => {
  var date = new Date(param);
  var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  return dateString;
};

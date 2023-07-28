import DataGrid, {
  Column,
  Item as ToolbarItem,
  Toolbar,
  Selection,
  Pager,
  Paging,
  ColumnFixing, Scrolling
} from "devextreme-react/data-grid";
import {ColumnOptions, ToolbarItemProps} from "@/types";
import {Button, LoadPanel} from "devextreme-react";
import {Icon} from "@packages/ui/icons";
import {useAtom} from "jotai";
import {searchPanelVisibleAtom} from "@layouts/content-searchpanel-layout";
import {ForwardedRef, forwardRef, useCallback, useEffect, useReducer, useRef} from "react";
import {useI18n} from "@/i18n/useI18n";
import {match, P} from "ts-pattern";
import {PageSize} from "@packages/ui/page-size";
import {PageNavigator} from "@packages/ui/page-navigator";
import {nanoid} from "nanoid";
import {PagerSummary} from "@packages/ui/pager-summary";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import {useVisibilityControl} from "@packages/hooks";
import {useSavedState} from "@packages/ui/base-gridview/components";


interface BusinessGridProps {
  columns: ColumnOptions[],
  toolbarItems: ToolbarItemProps[],
  data: any[];
  onPageChanged: (pageIndex: number) => void;
  itemCount?: number;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPageSizeChanged: (pageSize: number) => void;
  storeKey: string
  isLoading?: boolean;
}

export const BusinessGrid = forwardRef((
  {
    columns, toolbarItems, data,
    onPageChanged,
    itemCount = 0,
    pageCount = 0,
    pageIndex = 0,
    pageSize = 100,
    onPageSizeChanged,
    storeKey,
    isLoading
  }: BusinessGridProps, ref: ForwardedRef<any>) => {
  const {t} = useI18n("Common");
  const datagridRef = useRef<DataGrid>(null);
  const [searchPanelVisible, setSearchPanelVisible] = useAtom(searchPanelVisibleAtom);
  const summaryText = t("{0}-{1} in {2}")

  const allToolbarItems = [...toolbarItems];
  const onChangePageSize = (pageSize: number) => {
    datagridRef.current?.instance.pageSize(pageSize);
    onPageSizeChanged(pageSize)
  };

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: storeKey,
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        column.visible = filterResult ? filterResult.visible : false;
        return {
          ...column,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
  }, []);

  const onHiding = useCallback(() => {
    chooserVisible.close();
  }, []);
  const onApply = useCallback(
    (changes: any) => {
      // we need check the order of column from changes set
      const latest = [...changes];
      realColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      setColumnsState(latest);
      chooserVisible.close();
    },
    [setColumnsState]
  );

  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => chooserVisible.toggle(),
      },
    });
  }, []);

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <DataGrid
      ref={ref}
      dataSource={data}
      id="gridContainer"
      columnAutoWidth
      showBorders
      showRowLines
      showColumnLines
      onToolbarPreparing={onToolbarPreparing}
    >
      <LoadPanel visible={isLoading} />
      <Scrolling showScrollbar={'always'} />
      <ColumnFixing enabled={true}/>
      <Paging enabled={true} defaultPageSize={pageSize}/>
      <Pager visible={false}/>
      <Selection
        mode="multiple"
        showCheckBoxesMode="always"
        selectAllMode="page"
      />
      <Toolbar>
        <ToolbarItem location="before" visible={!searchPanelVisible}>
          <Button
            stylingMode={'text'}
            onClick={() => setSearchPanelVisible(true)}>
            <Icon name={"search"}/>
          </Button>
        </ToolbarItem>
        {!!allToolbarItems &&
          allToolbarItems.map((item, index) => {
            return (
              <ToolbarItem key={index} location={item.location}>
                {
                  match(item.render)
                    .with(P.nullish, () => null)
                    .otherwise(() => item.render?.())
                }
              </ToolbarItem>
            );
          })}
        <ToolbarItem location="after">
          <PageSize
            title={t("Showing")}
            onChangePageSize={onChangePageSize}
            allowdPageSizes={[100, 200, 500, 1000]}
            showAllOption={true}
            showAllOptionText={t("ShowAll")}
            defaultPageSize={pageSize}
          />
        </ToolbarItem>
        <ToolbarItem location={"after"}>
          <PagerSummary
            summaryTemplate={summaryText}
            currentPage={pageIndex}
            pageSize={pageSize}
            totalCount={itemCount}
          />
        </ToolbarItem>
        <ToolbarItem location="after">
          <PageNavigator
            itemCount={itemCount}
            currentPage={pageIndex}
            onPageChanged={onPageChanged}
            pageSize={datagridRef.current?.instance.pageSize() ?? 0}
            pageCount={pageCount ?? 0}
          />
        </ToolbarItem>
        <ToolbarItem location={"after"}>
          <CustomColumnChooser
            title={t("ToggleColumn")}
            applyText={t("Apply")}
            cancelText={t("Cancel")}
            selectAllText={t("SelectAll")}
            container={".dx-viewport"}
            button={"#myColumnChooser"}
            visible={chooserVisible.visible}
            columns={columns}
            onHiding={onHiding}
            onApply={onApply}
            actualColumns={realColumns}
          />
        </ToolbarItem>

      </Toolbar>

      {realColumns.map((column: ColumnOptions) => {
          return (
            <Column
              key={nanoid()}
              {...column}
            />
          );
        }
      )}
    </DataGrid>
  );
});
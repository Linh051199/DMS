import {ForwardedRef, forwardRef, MutableRefObject, useCallback, useEffect, useMemo, useReducer, useState} from "react";
import DataGrid, {
  Button as DxButton,
  Column,
  Editing,
  Item as ToolbarItem,
  IToolbarItemProps,
  Selection,
  Toolbar
} from "devextreme-react/data-grid";
import "src/packages/components/sub-grid/sub-grid.scss"
import {ColumnOptions} from "@/types";
import {useVisibilityControl} from "@packages/hooks";
import {useSavedState} from "@packages/ui/base-gridview/components";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import {useI18n} from "@/i18n/useI18n";
import { DeleteMultipleConfirmationBox } from "src/packages/components/delete-confirm-box";

const noop = (e: any) => {
}

interface SubGridProps {
  toolbarItems: IToolbarItemProps[]
  dataSource: any[],
  columns: ColumnOptions[]
  onSelectionChanged?: (e: any) => void
  showActions?: boolean;
  storeKey?: string;
  onDeleteRows?: (keys: any[]) => void
  onStartDelete?: (key: any) => void
  keyExpr?: string
}

export const SubGrid = forwardRef((
  {
    toolbarItems, dataSource,
    columns,
    onSelectionChanged = noop,
    showActions = true,
    storeKey,
    onDeleteRows = noop,
    onStartDelete,
    keyExpr
  }: SubGridProps, ref: ForwardedRef<DataGrid>) => {
  const {t} = useI18n("Common");
  const chooserVisible = useVisibilityControl({defaultVisible: false});

  const {saveState, loadState} = useSavedState<ColumnOptions[]>({
    storeKey: storeKey ?? "empty",
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
        return column;
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
  const renderColumnChooser = useCallback(() => {
    return (
      <CustomColumnChooser
        title={t("ToggleColum")}
        applyText={t("Apply")}
        cancelText={t("Cancel")}
        selectAllText={t("SelectAll")}
        container={"#root"}
        button={"#myColumnChooser"}
        visible={chooserVisible.visible}
        columns={columns}
        onHiding={onHiding}
        onApply={onApply}
        actualColumns={realColumns}
      />
    );
  }, [chooserVisible, realColumns, columns]);
  const allToolbarItems: IToolbarItemProps[] = useMemo(() => {
    return [
      ...(toolbarItems || []),
      {
        location: "after",
        render: renderColumnChooser,
      },
    ];
  }, [chooserVisible, realColumns, columns]);

  const [deletingId, setDeletingId] = useState<any>(null);
  const deleteConfirmationVisible = useVisibilityControl({
    defaultVisible: false,
  })
  const innerSavingRowHandler = useCallback((e: any) => {
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const {type} = e.changes[0];
      if (type === "remove") {
        // set selected keys, then open the confirmation
        setDeletingId(e.changes[0].key);
        
        // show the confirmation box of Delete single case
        if(onStartDelete && onStartDelete !== noop) {
          onStartDelete(e.changes[0].key)
        } else {
          deleteConfirmationVisible.open();
        }

        // this one to clear `changes` set from grid.
        (ref as MutableRefObject<DataGrid>).current?.instance.cancelEditData();
        e.cancel = true;
      }
    }
  }, []);
  const onDeleteConfirmed = () => {
    if(onDeleteRows) {
      onDeleteRows?.([deletingId])
    } else {
      
    }
    deleteConfirmationVisible.close()
  }
  const onCancelDelete = () => {
    deleteConfirmationVisible.close()
  }

  return (
    <div className={"sub-grid"}>
      <DataGrid
        ref={ref}
        dataSource={dataSource}
        id="gridContainer"
        keyExpr={keyExpr}
        columnAutoWidth
        showBorders
        showColumnLines
        showRowLines
        onSelectionChanged={onSelectionChanged}
        onToolbarPreparing={onToolbarPreparing}
        onSaving={innerSavingRowHandler}
      >
        <Selection mode={'multiple'} showCheckBoxesMode={"always"} selectAllMode={"page"}/>
        <Editing
          mode={'row'}
          allowUpdating={false}
          allowDeleting={true}
          allowAdding={false}
          confirmDelete={false}
        />
        <Column
          visible={showActions}
          type="buttons"
          width={60}
          fixed={false}
          allowResizing={false}
        >
          <DxButton
            cssClass={"mx-1 cursor-pointer"}
            name="edit"
            icon={"/images/icons/edit.svg"}
          />
          <DxButton
            cssClass={"mx-1 cursor-pointer"}
            name="delete"
            icon={"/images/icons/trash.svg"}
          />
          <DxButton
            cssClass={"mx-1 cursor-pointer"}
            name="save"
            icon={"/images/icons/save.svg"}
          />
          <DxButton
            cssClass={"mx-1 cursor-pointer"}
            name="cancel"
            icon={"/images/icons/refresh.svg"}
          />
        </Column>
        <Toolbar>
          {allToolbarItems.map((item, idx) => (
            <ToolbarItem key={idx} {...item} />
          ))}
        </Toolbar>
        {realColumns.map((item, idx) => (
          <Column key={idx} {...item} />
        ))}
      </DataGrid>

      <DeleteMultipleConfirmationBox
        title={t("Delete")}
        message={t("DeleteMultipleConfirmationMessage")}
        onYesClick={onDeleteConfirmed}
        visible={deleteConfirmationVisible.visible}
        onNoClick={onCancelDelete}
      />
    </div>
  )
})
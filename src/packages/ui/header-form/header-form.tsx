import Button from "devextreme-react/button";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import TextBox from "devextreme-react/text-box";
import { atom, useAtom } from "jotai";

import { useI18n } from "@/i18n/useI18n";
import { logger } from "@/packages/logger";
import { useVisibilityControl } from "@packages/hooks";
import { ExportConfirmBox } from "@packages/ui/modal";
import { useLayoutEffect, useState } from "react";
import { UploadDialog } from "../upload-dialog/upload-dialog";
import "./header-form.scss";
import {Icon} from "@packages/ui/icons";
import {BButton} from "@packages/components/buttons";

const keywordAtom = atom("");

export interface HeaderFormProps {
  onAddNew?: () => void;
  onSearch: (keyword: string) => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onExportExcel?: (selectedOnly: boolean) => void;
  onDownloadTemplate?: () => void;
  selectedItems?: string[];
  placeholder? : string;
}

export const HeaderForm = ({
  onAddNew,
  onSearch,
  onUploadFile,
  onExportExcel,
  onDownloadTemplate,
  selectedItems,
  placeholder
}: HeaderFormProps) => {
  const { t } = useI18n("Common");
  const [keyword, setKeyword] = useAtom(keywordAtom);
  const handleSearch = () => {
    onSearch(keyword);
  };
  useLayoutEffect(() => {}, [selectedItems]);
  const [uploadDialogVisible, showUploadDialog] = useState(false);
  const controlExportBoxVisible = useVisibilityControl({
    defaultVisible: false,
  });
  const onImportExcelFile = () => {
    showUploadDialog(true);
  };
  const handleUploadFiles = async (files: File[]) => {
    logger.debug("files", files);
    if (files && files.length > 0) {
      onUploadFile?.(files[0]);
    }
  };
  const handleExportExcel = () => {
    controlExportBoxVisible.open();
  };
  return (
    <div className="headerform w-full">
      <div className="headerform__search w-1/3">
        <TextBox
          className={"search-field"}
          showClearButton
          stylingMode={"outlined"}
          value={keyword}
          onFocusOut={handleSearch}
          onEnterKey={handleSearch}
          onPaste={handleSearch}
          onValueChanged={(e) => setKeyword(e.value)}
          placeholder={placeholder}
          inputAttr={{
            class: "search-field__input"
          }}
          
        >
          <Button
            hoverStateEnabled={false}
            activeStateEnabled={false}
            focusStateEnabled={false}
            className={"border-none"}
            stylingMode={"outlined"}
          >
            <Icon name={"search"} size={14} className={"search-icon"} />
          </Button>
        </TextBox>
      </div>
      <div className="headerform__button">
        <BButton
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          label={t("AddNew")}
          onClick={onAddNew}
        />
      </div>
      <div className="headerform__menu">
        <DropDownButton
          showArrowIcon={false}
          keyExpr={"id"}
          className="menu-items"
          displayExpr={"text"}
          wrapItemText={false}
          dropDownOptions={{
            width: 200,
            wrapperAttr: {
              class: "headerform__menuitems",
            },
          }}
          elementAttr={{
            class: "showmore-button",
          }}
          icon={"/images/icons/more.svg"}
        >
          <DropDownButtonItem
            render={(item: any) => {
              return (
                <div>
                  <Button
                    stylingMode="text"
                    hoverStateEnabled={false}
                    onClick={onImportExcelFile}
                    text={t("ImportExcel")}
                  />
                </div>
              );
            }}
          />
          <DropDownButtonItem
            render={(item: any) => {
              return (
                <div>
                  <Button
                    stylingMode="text"
                    hoverStateEnabled={false}
                    onClick={handleExportExcel}
                    text={t("ExportExcel")}
                  />
                </div>
              );
            }}
          />
        </DropDownButton>
        <UploadDialog
          visible={uploadDialogVisible}
          onDownloadTemplate={onDownloadTemplate}
          onCancel={() => showUploadDialog(false)}
          onUpload={handleUploadFiles}
        />
        <ExportConfirmBox
          selectedItems={selectedItems ?? []}
          control={controlExportBoxVisible}
          title={t("ExportExcel")}
          onYesClick={(value: number) => {
            onExportExcel?.(value === 0);
          }}
        />
      </div>
    </div>
  );
};

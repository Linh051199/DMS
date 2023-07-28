import Button from "devextreme-react/button";
import React from "react";
import {sidebarAtom} from "@packages/store";
import {useAtomValue, useSetAtom} from "jotai";

import './toggle-sidebar-button.scss'
import {Icon} from "@packages/ui/icons";
export const ToggleSidebarButton = () => {
  const isOpen = useAtomValue(sidebarAtom)
  const setSidebarOpen = useSetAtom(sidebarAtom)
  const toggleSidebar = () => {
    setSidebarOpen(true)
  }
  return (
    <Button hoverStateEnabled={false} activeStateEnabled={false} focusStateEnabled={false} 
            visible={!isOpen} className={'toggle-sidebar'} stylingMode={'text'} 
            onClick={toggleSidebar} >
      <Icon name={'menu'} width={12} height={12} />
    </Button>
  )
}
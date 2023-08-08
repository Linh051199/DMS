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
    <div className={'dms-sidebar__toolbar'}>
      <Icon 
        className={'cursor-pointer'} 
        name={'menu'} 
        width={12} 
        height={12} 
        onClick={toggleSidebar}
      />
    </div>
  )
}
import React from "react";
import { ReactComponent as RemoveIcon } from './svg/remove.svg'
import { ReactComponent as EditIcon } from './svg/edit.svg'
import { ReactComponent as AddIcon } from './svg/add.svg'
import { ReactComponent as TrashIcon } from './svg/trash.svg'
import { ReactComponent as PlusIcon } from './svg/plus-circle.svg'
import { ReactComponent as SearchIcon } from './svg/search.svg'
import { ReactComponent as DoneIcon } from './svg/done.svg'
import { ReactComponent as MenuIcon } from './svg/menu.svg'
import { ReactComponent as SettingIcon } from './svg/settings.svg'
import { ReactComponent as CollapseLeftIcon } from './svg/collapse-left.svg'
import { ReactComponent as ChevronRightIcon } from './svg/chevron-right.svg'

export type Dict = {
  [key: string]: any;
};
const ICONS = {
  remove: RemoveIcon,
  add: AddIcon,
  edit: EditIcon,
  trash: TrashIcon,
  plus: PlusIcon,
  search: SearchIcon,
  done: DoneIcon,
  menu: MenuIcon,
  setting: SettingIcon,
  collapseLeft: CollapseLeftIcon,
  chevronRight: ChevronRightIcon,
}
export type IconName = keyof typeof ICONS;

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  name: IconName;
  style?: Dict;
};

export const Icon = ({name, size = 10, className, style, ...restProps}: IconProps) => {
  const Component = ICONS[name];
  return (
    <Component className={className} width={size} height={size} {...restProps} style={style}/>
  );
};

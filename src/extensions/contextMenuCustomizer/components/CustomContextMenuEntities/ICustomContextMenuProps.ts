import { ICustomMenuItem } from "./ICustomMenuItem";

export interface ICustomContextMenuProps {
  defaultMenuItems: ICustomMenuItem[];
  additionalMenuItems: ICustomMenuItem[];
}

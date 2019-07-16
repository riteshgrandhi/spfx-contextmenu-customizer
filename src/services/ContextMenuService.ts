import {
  CustomContextMenuConstants as Constants,
  ICustomMenuItem
} from "../extensions/contextMenuCustomizer/components/CustomContextMenuEntities";

export interface IContextMenuServiceData {
  codeCustomMenuItems: ICustomMenuItem[];
}

export class ContextMenuService {
  /**
   * private service data instance
   */
  private _serviceData: IContextMenuServiceData;

  /**
   * init service
   */
  constructor() {
    this._serviceData = {
      codeCustomMenuItems: []
    };
    this.updateWindowServiceData();
  }

  private updateWindowServiceData() {
    window[Constants.ServiceDataKey] = this._serviceData;
  }

  public addMenuItems(items: ICustomMenuItem[], componentName: string) {
    this._serviceData.codeCustomMenuItems = this._serviceData.codeCustomMenuItems.concat(
      items
    );
    this.updateWindowServiceData();
  }
}

import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  CustomContextMenuConstants as Constants,
  ICustomMenuItem
} from "../components/CustomContextMenuEntities";
import { CustomContextMenu } from "../components/CustomContextMenu";
import { EditPanel } from "../components/EditPanel";
import { IContextMenuServiceData } from "../../../services/ContextMenuService";
import { UserItemStorageHelper } from "./UserItemStorageHelper";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";

class ContextMenuServiceDataHelper {
  public static getServiceData() {
    return window[Constants.ServiceDataKey] as IContextMenuServiceData;
  }
}

export class DomHelper {
  public static OpenEditPanel() {
    var newDomElem: HTMLElement;
    newDomElem = document.createElement("div");
    newDomElem.id = Constants.EditPaneContainerId;
    var oldELem = document.getElementById(Constants.EditPaneContainerId);
    if (!oldELem) {
      document.body.appendChild(newDomElem);
    } else {
      document.body.replaceChild(newDomElem, oldELem);
    }

    var elem = React.createElement(EditPanel);
    ReactDOM.render(elem, newDomElem);
  }

  public async initialize() {
    (await this.waitForElement(".SPPageChrome")).oncontextmenu = async (
      event: MouseEvent
    ) => {
      event.preventDefault();

      var newDomElem: HTMLElement;
      newDomElem = document.createElement("div");
      newDomElem.id = Constants.ContextMenuContainerId;
      var oldELem = document.getElementById(Constants.ContextMenuContainerId);
      if (!oldELem) {
        document.body.appendChild(newDomElem);
      } else {
        document.body.replaceChild(newDomElem, oldELem);
      }

      var elem = await this.createReactComponents(event);
      ReactDOM.render(elem, newDomElem);

      var clickButton = newDomElem.querySelector("button");
      clickButton.click();

      this.waitForElement(
        ".ms-Callout.ms-ContextualMenu-Callout > div > ." +
          Constants.ContextMenuClassName
      ).then(async e => {
        var cmElem = e.parentNode.parentNode as HTMLElement;
        cmElem.style.display = "none";
        setTimeout(() => {
          //   cmElem.style.pointerEvents = "visibleFill";
          cmElem.style.display = "block";
          cmElem.style.left = event.clientX + "px";
          cmElem.style.top = event.clientY + "px";
        }, 100);
      });
    };
  }

  private async waitForElement(selector: string): Promise<HTMLElement> {
    while (document.querySelector(selector) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector) as HTMLElement;
  }

  private filterScopedItems(
    items: ICustomMenuItem[],
    clickedElement?: Element
  ) {
    return items.filter(item => {
      var scopeFlag: boolean = !item.scopeNode;

      if (item.scopeNode && clickedElement) {
        scopeFlag = item.scopeNode.contains(clickedElement);
      }

      var subScopeFlag: boolean = !item.subScopeSelector;
      if (item.subScopeSelector && clickedElement) {
        subScopeFlag = clickedElement.matches(item.subScopeSelector);
      }

      var onSelectionFlag: boolean = !item.onSelectionOnly;
      if (item.onSelectionOnly) {
        onSelectionFlag = !!window.getSelection().toString();
      }

      return scopeFlag && subScopeFlag && onSelectionFlag;
    });
  }

  private async createReactComponents(event: MouseEvent) {
    var _additionalItems: ICustomMenuItem[] = [];

    //get codeCustomMenuItems
    var _serviceData = ContextMenuServiceDataHelper.getServiceData();
    if (_serviceData) {
      _additionalItems = _serviceData.codeCustomMenuItems || [];
    }

    //get uiCustomMenuItems
    var _storageHelper = new UserItemStorageHelper();
    var _storedItems = await _storageHelper.getStoredItems();

    _additionalItems = this.filterScopedItems(
      _additionalItems,
      event.target as Element
    );

    _storedItems = this.filterScopedItems(
      _storedItems,
      event.target as Element
    );
    
    if (_storedItems.length > 0) {
      _storedItems.unshift({
        key: "divider",
        itemType: ContextualMenuItemType.Divider
      });
    }
    _additionalItems = _additionalItems.concat(_storedItems);

    var _defaultMenuItems = this.filterScopedItems(Constants.DefaultMenuItems);

    return React.createElement(CustomContextMenu, {
      defaultMenuItems: _defaultMenuItems,
      additionalMenuItems: _additionalItems
    });
  }
}

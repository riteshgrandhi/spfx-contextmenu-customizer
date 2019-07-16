import { ICustomMenuItem } from "./ICustomMenuItem";
import { DomHelper } from "../../Helpers/DomHelper";

export class CustomContextMenuConstants {
  public static readonly ContextMenuClassName = "CustomContextMenu_0827";
  public static readonly EditPaneContainerId = "EditPaneContainer_0827";
  public static readonly ContextMenuContainerId =
    "CustomContextMenuContainer_0827";
  public static readonly ServiceDataKey = "CustomContextMenuServiceData_0827";

  public static readonly DefaultActionsList: { [id: string]: (any) => any } = {
    copyAction: () => {
      var selection: string = window.getSelection().toString();
      if (!selection) {
        return;
      }
      const el = document.createElement("textarea");
      el.value = selection;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    openLinkAction: (event: Event) => {
      var link: string;
      if (event.target instanceof HTMLImageElement) {
        link = event.target.src;
      }
      if (event.target instanceof HTMLAnchorElement) {
        link = event.target.href;
      }
      console.log("openLinkAction:" + link);
      window.location.assign(link as string);
    },
    openLinkNewTabAction: (event: Event) => {
      var link: string;
      if (event.target instanceof HTMLImageElement) {
        link = event.target.src;
      }
      if (event.target instanceof HTMLAnchorElement) {
        link = event.target.href;
      }
      console.log("openLinkAction:" + link);
      console.log("openLinkNewTabAction:" + link);
      window.open(link as string, "_blank");
    }
  };

  public static readonly DefaultMenuItems: ICustomMenuItem[] = [
    {
      key: "copy",
      name: "Copy",
      iconProps: {
        iconName: "Copy"
      },
      defaultActionName: "copyAction",
      onClick: CustomContextMenuConstants.DefaultActionsList.copyAction,
      onSelectionOnly: true
    },
    {
      key: "back",
      name: "Back",
      iconProps: {
        iconName: "Back"
      },
      onClick: () => {
        window.history.back();
      }
    },
    {
      key: "reloadpage",
      name: "Reload",
      iconProps: {
        iconName: "Refresh"
      },
      onClick: () => {
        window.location.reload();
      }
    },
    {
      key: "editpage",
      name: "Edit Page",
      secondaryText: "(WIP)",
      iconProps: {
        iconName: "PageEdit"
      },
      disabled: window.location.search.indexOf("Mode") >= 0,
      onClick: () => {
        // window.location.search = "?Mode=Edit";
        var editButton = document.querySelector(
          ".ms-CommandBar .ms-CommandBar-secondaryCommand button[data-automation-id='pageCommandBarEditButton']"
        ) as HTMLElement;
        if (editButton) {
          editButton.click();
        }
      }
    }
  ];

  public static readonly EditPanelMenuItem: ICustomMenuItem = {
    key: "editContextMenu",
    name: "Edit Context Menu",
    iconProps: {
      iconName: "Edit"
    },
    onClick: () => {
      console.log("Edit clicked");
      DomHelper.OpenEditPanel();
    }
  };
}

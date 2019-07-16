import * as React from "react";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import {
  ICustomContextMenuProps,
  CustomContextMenuConstants as Constants,
  ICustomContextMenuState,
  ICustomMenuItem
} from "./CustomContextMenuEntities";

export class CustomContextMenu extends React.Component<
  ICustomContextMenuProps,
  ICustomContextMenuState
> {
  constructor(props: ICustomContextMenuProps) {
    super(props);
    var _additionalItems = this.props.additionalMenuItems || [];

    var items: ICustomMenuItem[] = [];
    items = items.concat(
      this.props.defaultMenuItems,
      [{ key: "divider", itemType: ContextualMenuItemType.Divider }],
      _additionalItems,
      [{ key: "divider", itemType: ContextualMenuItemType.Divider }]
    );

    items.push(Constants.EditPanelMenuItem);

    this.state = {
      menuItems: items
    };
  }

  public render(): JSX.Element {
    return (
      <DefaultButton
        text="Click"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "none"
        }}
        menuProps={{
          className: Constants.ContextMenuClassName,
          shouldFocusOnMount: true,
          items: this.state.menuItems
        }}
      />
    );
  }
}

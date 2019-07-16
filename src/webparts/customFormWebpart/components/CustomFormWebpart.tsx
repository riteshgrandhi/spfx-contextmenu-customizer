import * as React from "react";
import styles from "./CustomFormWebpart.module.scss";
import { ICustomFormWebpartProps } from "./ICustomFormWebpartProps";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

export default class CustomFormWebpart extends React.Component<
  ICustomFormWebpartProps,
  {}
> {
  /**
   *
   */
  constructor(props) {
    super(props);
    // add items to menu
    this.props.contextMenuService.addMenuItems(
      [
        {
          key: "formWebpartItem4",
          name: "Sub Menu",
          secondaryText: "selector scoped",
          subMenuProps: {
            items: [
              {
                key: "subItem1",
                name: "Sub Item 1",
                onClick: () => {
                  alert("Selector Scoped Item");
                }
              },
              {
                key: "subItem2",
                name: "Sub Item 2",
                onClick: () => {
                  alert("Selector Scoped Item");
                }
              }
            ]
          },
          scopeNode: this.props.webpartDomElement || null,
          subScopeSelector: `.${styles.formBox} textarea`
        }
      ],
      "FormWebpartReactComponent"
    );
  }
  public render(): React.ReactElement<ICustomFormWebpartProps> {
    return (
      <div className={`ms-Grid ${styles.container}`}>
        <div>
          <TextField label="Title" />
        </div>
        <div className={styles.formBox}>
          <TextField label="Description" multiline rows={3} />
        </div>
        <br />
        <div>
          <PrimaryButton text="Submit" />
        </div>
      </div>
    );
  }
}

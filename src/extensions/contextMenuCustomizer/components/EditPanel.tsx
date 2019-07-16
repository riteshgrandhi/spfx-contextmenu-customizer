import * as React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import {
  ICustomMenuItem,
  CustomContextMenuConstants as Constants
} from "./CustomContextMenuEntities";
import { UserItemStorageHelper } from "../Helpers/UserItemStorageHelper";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import {
  IconButton,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";

export interface IEditPanelState {
  showPanel: boolean;
  newItems: ICustomMenuItem[];
}

export interface IEditPanelProps {}

export class EditPanel extends React.Component<
  IEditPanelProps,
  IEditPanelState
> {
  private _defaultActionOptions: IDropdownOption[];

  constructor(props) {
    super(props);
    this.state = {
      showPanel: false,
      newItems: []
    };

    this._defaultActionOptions = [];

    for (var actionKey in Constants.DefaultActionsList) {
      var option: IDropdownOption = {
        key: actionKey,
        text: actionKey
      };
      this._defaultActionOptions.push(option);
    }

    this._addItem = this._addItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._showPanel = this._showPanel.bind(this);
    this._hidePanel = this._hidePanel.bind(this);
    this._saveItems = this._saveItems.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  public componentWillMount() {
    this._showPanel();
  }

  public render() {
    return (
      <Panel
        isOpen={this.state.showPanel}
        onDismiss={this._hidePanel}
        type={PanelType.custom}
        customWidth="888px"
        headerText="Edit Context Menu"
      >
        <p style={{ color: "#dd0000" }}>
          <b>Note:</b> This is a Work In Progress. UI is functional, Default
          Actions are not functional
        </p>
        <form>
          <table className="ms-Table">
            <thead>
              <tr className="ms-Table-row">
                <td className="ms-Table-cell">
                  <label>Name*</label>
                </td>
                <td className="ms-Table-cell">
                  <label>Secondary Text</label>
                </td>
                <td className="ms-Table-cell">
                  <label>Action*</label>
                </td>
                <td className="ms-Table-cell">
                  <label>Sub Scope Selector</label>
                </td>
                <td className="ms-Table-cell">
                  <label>Show on Text Selection Only</label>
                </td>
                <td className="ms-Table-cell" />
              </tr>
            </thead>
            <tbody>
              {this.state.newItems.map((item, i) => {
                return (
                  <tr className="ms-Table-row">
                    <td className="ms-Table-cell">
                      <TextField
                        value={item.name}
                        required
                        onChanged={n => {
                          this._handleChange(i, "name", n);
                        }}
                      />
                    </td>
                    <td className="ms-Table-cell">
                      <TextField
                        value={item.secondaryText}
                        onChanged={n => {
                          this._handleChange(i, "secondaryText", n);
                        }}
                      />
                    </td>
                    <td className="ms-Table-cell">
                      <Dropdown
                        required
                        placeHolder="Select an Action"
                        options={this._defaultActionOptions}
                        defaultSelectedKey={item.defaultActionName || ""}
                        onChanged={o => {
                          this._handleChange(i, "defaultActionName", o.key);
                        }}
                      />
                    </td>
                    <td className="ms-Table-cell">
                      <TextField
                        value={item.subScopeSelector}
                        onChanged={n => {
                          this._handleChange(i, "subScopeSelector", n);
                        }}
                      />
                    </td>
                    <td className="ms-Table-cell">
                      <Checkbox
                        defaultChecked={item.onSelectionOnly}
                        onChange={(ev, isChecked) => {
                          this._handleChange(i, "onSelectionOnly", isChecked);
                        }}
                      />
                    </td>
                    <td className="ms-Table-cell">
                      <IconButton
                        iconProps={{ iconName: "ChromeClose" }}
                        onClick={() => {
                          this._deleteItem(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="ms-Table-row">
                <td className="ms-Table-cell">
                  <PrimaryButton
                    text="Add"
                    iconProps={{ iconName: "Add" }}
                    onClick={this._addItem}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="ms-Table">
            <tr className="ms-Table-row">
              <td className="ms-Table-cell">
                <PrimaryButton text="Save" onClick={this._saveItems} />
              </td>
              <td className="ms-Table-cell">
                <DefaultButton text="Cancel" onClick={this._hidePanel} />
              </td>
            </tr>
          </table>
        </form>
      </Panel>
    );
  }

  private _handleChange(index: number, prop: string, newVal: any) {
    var items = this.state.newItems;
    var item = items[index];
    item[prop] = newVal;
    items[index] = item;
    this.setState({ newItems: items });
  }

  private _deleteItem(item) {
    var items = this.state.newItems;
    var i = items.indexOf(item);
    console.log(i);
    console.log(items);
    if (i > 0) {
      items.splice(i + 1, 1);
    }
    console.log(items);
    this.setState({ newItems: items });
  }

  private _addItem() {
    var items = this.state.newItems;
    var item: ICustomMenuItem = {
      key: "uiItem_" + Math.floor(Math.random() * 10000)
    };
    items.push(item);
    this.setState({ newItems: items });
  }

  private _showPanel() {
    var _storageHelper: UserItemStorageHelper = new UserItemStorageHelper();
    _storageHelper.getStoredItems().then(_newItems => {
      this.setState({ showPanel: true, newItems: _newItems });
    });
  }

  private _hidePanel() {
    this.setState({ showPanel: false });
  }

  private _saveItems() {
    var _storageHelper: UserItemStorageHelper = new UserItemStorageHelper();
    _storageHelper.setStoredItems(this.state.newItems).then(() => {
      this._hidePanel();
    });
  }
}

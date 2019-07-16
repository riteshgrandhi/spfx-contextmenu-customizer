import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "CustomFormWebpartWebPartStrings";
import CustomFormWebpart from "./components/CustomFormWebpart";
import { ICustomFormWebpartProps } from "./components/ICustomFormWebpartProps";

// import service
import { ContextMenuService } from "../../services/ContextMenuService";
import { override } from "@microsoft/decorators";

export interface ICustomFormWebpartWebPartProps {
  description: string;
}

export default class CustomFormWebpartWebPart extends BaseClientSideWebPart<
  ICustomFormWebpartWebPartProps
> {
  // create private field of service
  private _contextMenuService: ContextMenuService;

  @override
  public onInit(): Promise<void> {
    // init instance of service
    this._contextMenuService = new ContextMenuService();

    // add items to menu
    this._contextMenuService.addMenuItems(
      [
        {
          key: "formWebpartItem1",
          name: "Webpart Item",
          secondaryText: "window scoped",
          onClick: () => {
            alert(this.title);
          }
        },
        {
          key: "formWebpartItem2",
          name: "Webpart Item",
          secondaryText: "webpart scoped",
          onClick: () => {
            alert(this.title);
          },
          scopeNode: this.domElement
        }
      ],
      this.title
    );

    return Promise.resolve();
  }

  public render(): void {
    //optionally pass service instance to react webpart
    const element: React.ReactElement<
      ICustomFormWebpartProps
    > = React.createElement(CustomFormWebpart, {
      description: this.properties.description,
      contextMenuService: this._contextMenuService,
      webpartDomElement: this.domElement
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

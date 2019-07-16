import { override } from "@microsoft/decorators";
import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";

import { DomHelper } from "./Helpers/DomHelper";

const LOG_SOURCE: string = "ContextMenuCustomizerApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IContextMenuCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ContextMenuCustomizerApplicationCustomizer extends BaseApplicationCustomizer<
  IContextMenuCustomizerApplicationCustomizerProperties
> {
  @override
  public onInit(): Promise<void> {
    var _domHelper = new DomHelper();

    _domHelper.initialize();

    return Promise.resolve();
  }
}

import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { ReactElement } from "react";

export interface ICustomMenuItem extends IContextualMenuItem {
  scopeNode?: Node;
  subScopeSelector?: string;
  onSelectionOnly?: boolean;
  defaultActionName?: string;
}

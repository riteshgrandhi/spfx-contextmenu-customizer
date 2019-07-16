import { ContextMenuService } from "../../../services/ContextMenuService";

export interface ICustomFormWebpartProps {
  description: string;
  contextMenuService: ContextMenuService;
  webpartDomElement: Node;
}

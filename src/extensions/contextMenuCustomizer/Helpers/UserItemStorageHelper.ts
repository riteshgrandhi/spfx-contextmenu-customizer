import {
  ICustomMenuItem,
  CustomContextMenuConstants as Constants
} from "../components/CustomContextMenuEntities";

export class UserItemStorageHelper {
  private static readonly _storageKey = "localStorage_0827";

  public async getStoredItems(): Promise<ICustomMenuItem[]> {
    var _storedItems: ICustomMenuItem[] = JSON.parse(
      localStorage.getItem(UserItemStorageHelper._storageKey)
    );

    _storedItems = _storedItems || [];
    _storedItems = _storedItems.map(i => {
      i.onClick = Constants.DefaultActionsList[i.defaultActionName];
      return i;
    });
    return _storedItems;
  }

  public async setStoredItems(
    items: ICustomMenuItem[]
  ): Promise<ICustomMenuItem[]> {
    var _serialized = JSON.stringify(
      items.map(i => {
        i.onClick = null;
        return i;
      })
    );
    console.log(_serialized);
    localStorage.setItem(UserItemStorageHelper._storageKey, _serialized);
    return items;
  }
}

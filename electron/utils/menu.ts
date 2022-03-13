import { Menu, ipcMain, BrowserWindow } from "electron";

interface menuObj {
  lable: string;
  id: string;
  type: string;
  child: menuObj[] | null;
}

export function onAppMenu() {
  // 渲染进程索取菜单时,如果是windows,返回菜单,如果是macos,返回null
  ipcMain.handle("getAppMenu", (): menuObj[] | null =>
    process.platform == "darwin" ? null : getmenu()
  );
  ipcMain.on("MenuClick", (event, menuItemId: string) => {
    const menuItem = Menu.getApplicationMenu()?.getMenuItemById(menuItemId);
    menuItem?.click();
  });
}

/**
 * @description 递归生成菜单数组,数组传递给渲染进程用于生成windows上左上角菜单栏
 * @returns {menuObj} menuArr:{ lable: string, id: string, type: string, child?: menuObj[] }
 */
function getmenu() {
  function menu(ims: Electron.MenuItem[]) {
    let menuArr: menuObj[] = [];
    ims.map((im) => {
      let menuObj: menuObj = {
        lable: im.label,
        id: im.id,
        type: im.type,
        child:
          im.type == "submenu" && im.submenu ? menu(im.submenu.items) : null,
      };
      menuArr.push(menuObj);
    });
    return menuArr;
  }
  const ims = Menu.getApplicationMenu() as Electron.Menu;
  return menu(ims.items);
}

export function createAppMenu() {
  const AppMenu: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    // 在mac上,第一个自定义menuItem的label会被应用名覆盖
    //此label会被package.json打包配置中的 `build.productName = ‘后台管理’` 覆盖
    { id: "1", label: "App", submenu: [{ id: "1-1", label: "测试" }] },
    {
      id: "2",
      label: "开发",
      submenu: [
        {
          id: "2-1",
          label: "开发者工具",
          click(m, window, e) {
            window?.webContents.openDevTools();
          },
        },
      ],
    },
  ];
  /** 创建菜单 */
  const appMenu = Menu.buildFromTemplate(AppMenu);
  return appMenu;
}

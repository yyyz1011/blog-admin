import { ipcMain, BrowserWindow } from "electron";
interface methods {
  [propName: string]: Function;
}

/**
 * @desc: 渲染进程点击自定义菜单项后,通过进程通讯调用主进程方法,实现渲染进程右键菜单
 * @param {string } key 如'fullScreen' 传参为methods中键名,
 */
export function onContextMenu() {
  ipcMain.on("contentMenu", (event, key: string) => {
    methods[key] && methods[key](event);
  });
}

// 打开控制台
const openDevTool = (e: Electron.IpcMainEvent) => e.sender.openDevTools();

// 全屏/推出全屏
/**
 * 由于electron的某个bug,无边框透明窗口在win上isSetFullScreen总是返回false
 * 所以在windows上是否全屏通过在当前窗口实例上挂载变量的方式来判断
 */
type route = extendWindow & Electron.BrowserWindow;
interface extendWindow {
  isMax: boolean | null | undefined;
}
const fullScreen = async (e: Electron.IpcMainEvent) => {
  const window = BrowserWindow.fromWebContents(e.sender) as route; // 获取窗口实例
  const isMac = process.platform == "darwin"; // 判断是否是mac
  if (isMac) {
    // mac进入/退出简单全屏模式
    const isSimpleFS = window.isSimpleFullScreen();
    window.setSimpleFullScreen(!isSimpleFS);
  } else {
    // win进入/退出全屏模式
    window.isMax ? window.setFullScreen(false) : window.setFullScreen(true);
    window.isMax = !window.isMax;
  }
};
const methods: methods = {
  openDevTool,
  fullScreen,
};

// ? 扩展window对象
interface Window {
  /**
   * Electron ipcRenderer
   * 后面会将进程通讯方法挂载到window对象上,所以添加此接口防止报错
   */
  ipc: import("electron").IpcRenderer;
}

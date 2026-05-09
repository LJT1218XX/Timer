import { app, BrowserWindow, ipcMain, nativeImage, Tray, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let isQuitting = false;
function createWindow() {
  win = new BrowserWindow({
    frame: false,
    icon: path.join(process.env.VITE_PUBLIC, "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.on("maximize", () => win == null ? void 0 : win.webContents.send("window-state-changed", true));
  win.on("unmaximize", () => win == null ? void 0 : win.webContents.send("window-state-changed", false));
  win.setMenuBarVisibility(false);
  win.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win == null ? void 0 : win.hide();
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
let tray = null;
function createTray() {
  const iconPath = path.join(process.env.VITE_PUBLIC, "icon.ico");
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip("🍅 番茄钟");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示窗口",
      click: () => win == null ? void 0 : win.show()
    },
    {
      label: "退出",
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on("double-click", () => {
    win == null ? void 0 : win.show();
  });
}
app.on("window-all-closed", () => {
});
app.on("before-quit", () => {
  isQuitting = true;
  tray = null;
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.setAppUserModelId("com.pomodoro.timer");
ipcMain.on("show-notification", (_event, { title, body }) => {
  const [win2] = BrowserWindow.getAllWindows();
  if (win2) {
    win2.webContents.executeJavaScript(`new Notification('${title}', { body: '${body}' })`);
  }
});
ipcMain.on("window-minimize", () => win == null ? void 0 : win.minimize());
ipcMain.on("window-maximize", () => {
  if (win == null ? void 0 : win.isMaximized()) {
    win.unmaximize();
  } else {
    win == null ? void 0 : win.maximize();
  }
});
ipcMain.on("window-close", () => win == null ? void 0 : win.close());
app.whenReady().then(() => {
  createWindow();
  createTray();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};

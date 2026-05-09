import { app as t, BrowserWindow as r, ipcMain as s, nativeImage as h, Tray as _, Menu as v } from "electron";
import { fileURLToPath as T } from "node:url";
import o from "node:path";
const p = o.dirname(T(import.meta.url));
process.env.APP_ROOT = o.join(p, "..");
const c = process.env.VITE_DEV_SERVER_URL, E = o.join(process.env.APP_ROOT, "dist-electron"), f = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = c ? o.join(process.env.APP_ROOT, "public") : f;
let e, d = !1;
function u() {
  e = new r({
    frame: !1,
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(p, "preload.mjs")
    }
  }), e.on("maximize", () => e == null ? void 0 : e.webContents.send("window-state-changed", !0)), e.on("unmaximize", () => e == null ? void 0 : e.webContents.send("window-state-changed", !1)), e.setMenuBarVisibility(!1), e.on("close", (i) => {
    d || (i.preventDefault(), e == null || e.hide());
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), c ? e.loadURL(c) : e.loadFile(o.join(f, "index.html"));
}
let n = null;
function R() {
  const i = o.join(process.env.VITE_PUBLIC, "electron-vite.svg"), a = h.createFromPath(i).resize({ width: 16, height: 16 });
  n = new _(a), n.setToolTip("🍅 番茄钟");
  const l = v.buildFromTemplate([
    {
      label: "显示窗口",
      click: () => e == null ? void 0 : e.show()
    },
    {
      label: "退出",
      click: () => {
        d = !0, t.quit();
      }
    }
  ]);
  n.setContextMenu(l), n.on("double-click", () => {
    e == null || e.show();
  });
}
t.on("window-all-closed", () => {
});
t.on("before-quit", () => {
  d = !0, n = null;
});
t.on("activate", () => {
  r.getAllWindows().length === 0 && u();
});
t.setAppUserModelId("com.pomodoro.timer");
s.on("show-notification", (i, { title: a, body: l }) => {
  const [m] = r.getAllWindows();
  m && m.webContents.executeJavaScript(`new Notification('${a}', { body: '${l}' })`);
});
s.on("window-minimize", () => e == null ? void 0 : e.minimize());
s.on("window-maximize", () => {
  e != null && e.isMaximized() ? e.unmaximize() : e == null || e.maximize();
});
s.on("window-close", () => e == null ? void 0 : e.close());
t.whenReady().then(() => {
  u(), R();
});
export {
  E as MAIN_DIST,
  f as RENDERER_DIST,
  c as VITE_DEV_SERVER_URL
};

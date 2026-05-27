import { createRenderer, Config as LightningConfig, loadFonts } from "@lightningtv/solid";
import { Route } from "@solidjs/router";
import { FocusStackProvider, HashRouter, useFocusManager, KeepAliveRoute  } from "@lightningtv/solid/primitives";
import App from "./pages/App";
import Home from "./pages/home";
import IframeWorld from "./pages/IframeWorld";
import TextPage from "./pages/Text";
import NotFound from "./pages/NotFound";
import fonts from "./fonts";
import backgroundImage from "@/assets/image/unnamed.jpg";
import { merge } from "lodash-es";
import { config } from "#devices/common";
import {
  Rounded,
  RoundedWithShadow,
  RoundedWithBorder,
  RoundedWithBorderAndShadow,
  RadialGradient,
  LinearGradient,
  HolePunch,
} from "@lightningjs/renderer/webgl/shaders";

merge(LightningConfig, config.lightning);

const setupPageBackground = () => {
  const appRoot = document.getElementById("app");

  if (!appRoot) {
    return;
  }

  document.documentElement.style.width = "100%";
  document.documentElement.style.height = "100%";
  document.documentElement.style.overflow = "hidden";
  document.body.style.width = "100%";
  document.body.style.height = "100%";
  document.body.style.overflow = "hidden";
  document.body.style.backgroundColor = "#071423";
  document.body.style.backgroundImage = `url("${backgroundImage}")`;
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  appRoot.style.position = "fixed";
  appRoot.style.inset = "0";
  appRoot.style.zIndex = "1";
};

setupPageBackground();

const { render, renderer } = createRenderer();

const shManager = renderer.stage.shManager;
shManager.registerShaderType("rounded", Rounded);
shManager.registerShaderType("roundedWithBorder", RoundedWithBorder);
shManager.registerShaderType("roundedWithShadow", RoundedWithShadow);
shManager.registerShaderType("roundedWithBorderWithShadow", RoundedWithBorderAndShadow);
shManager.registerShaderType("radialGradient", RadialGradient);
shManager.registerShaderType("linearGradient", LinearGradient);
shManager.registerShaderType("holePunch", HolePunch);

loadFonts(fonts);

const webFonts = fonts.filter((font) => "fontUrl" in font);
const keepAlivePreload = () => undefined;

Promise.all(webFonts.map((font) => renderer.stage.loadFont("canvas", font))).finally(() => {
  render(() => {
    useFocusManager(config.keys, config.keyHoldOptions);
    return (
      <FocusStackProvider>
        <HashRouter root={App}>
          <KeepAliveRoute path="/" component={Home} preload={keepAlivePreload} />
          <Route path="/iframe-world" component={IframeWorld} />
          <KeepAliveRoute path="/text" component={TextPage} preload={keepAlivePreload} />
          <Route path="/*all" component={NotFound} />
        </HashRouter>
      </FocusStackProvider>
    );
  });
});

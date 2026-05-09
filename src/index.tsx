import { createRenderer, Config as LightningConfig, loadFonts } from "@lightningtv/solid";
import { Route } from "@solidjs/router";
import { HashRouter, useFocusManager } from "@lightningtv/solid/primitives";
import App from "./pages/App";
import HelloWorld from "./pages/HelloWorld";
import TextPage from "./pages/Text";
import NotFound from "./pages/NotFound";
import fonts from "./fonts";
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
render(() => {
  useFocusManager(config.keys, config.keyHoldOptions);
  return (
    <HashRouter root={App}>
      <Route path="/" component={HelloWorld} />
      <Route path="/text" component={TextPage} />
      <Route path="/*all" component={NotFound} />
    </HashRouter>
  );
});

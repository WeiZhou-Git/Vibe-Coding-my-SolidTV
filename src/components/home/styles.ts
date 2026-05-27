import type { NodeStyles, TextStyles } from "@lightningtv/solid";
import { navItems } from "./data";

export const NAV_WIDTH = 800;
export const NAV_HEIGHT = 72;
export const NAV_PADDING = 5;
export const NAV_INNER_WIDTH = NAV_WIDTH - NAV_PADDING * 2;
export const NAV_INNER_HEIGHT = NAV_HEIGHT - NAV_PADDING * 2;
export const NAV_ITEM_WIDTH = NAV_INNER_WIDTH / navItems.length;
export const WORLD_CARD_WIDTH = 504;
export const WORLD_CARD_HEIGHT = 630;
export const SHELF_SIDE_GAP = 120;

export const PageStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#00000000",
  clipping: true,
};

export const HeaderStyle: NodeStyles = {
  width: NAV_WIDTH,
  height: NAV_HEIGHT,
  x: (1920 - NAV_WIDTH) / 2,
  y: 54,
  borderRadius: 36,
  color: "#26282bdd",
};

export const NavRowStyle: NodeStyles = {
  width: NAV_INNER_WIDTH,
  height: NAV_INNER_HEIGHT,
  x: NAV_PADDING,
  y: NAV_PADDING,
  display: "flex",
  flexDirection: "row",
  gap: 0,
};

export const TitleBlockStyle: NodeStyles = {
  width: 1680,
  height: 128,
  x: 120,
  y: 200,
};

export const TitleTextStyle: TextStyles = {
  width: 820,
  height: 70,
  fontSize: 50,
  lineHeight: 70,
  fontStyle: "italic",
  color: "#ffffff",
};

export const SubtitleTextStyle: TextStyles = {
  y: 74,
  width: 720,
  height: 38,
  fontSize: 24,
  lineHeight: 38,
  color: "#ffffff60",
};

export const ShelfStyle: NodeStyles = {
  width: 1920,
  height: 700,
  x: 0,
  y: 300,
  clipping: true,
};

export const ShelfRowStyle: NodeStyles = {
  width: 1680,
  height: WORLD_CARD_HEIGHT,
  y: 60,
  x: SHELF_SIDE_GAP,
  display: "flex",
  flexDirection: "row",
  gap: 30,
};

export const EmptyStateStyle: NodeStyles = {
  width: 1680,
  height: 620,
  x: 120,
  y: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const EmptyStateTextStyle: TextStyles = {
  width: 520,
  height: 48,
  fontSize: 28,
  lineHeight: 48,
  textAlign: "center",
  contain: "both",
  color: "#ffffff66",
};

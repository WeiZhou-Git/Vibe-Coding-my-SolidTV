import Bj1 from "@/assets/image/bg1.jpg";
import Bj2 from "@/assets/image/bg2.jpg";

export const navItems = [
  { label: "天气", path: "/" },
  { label: "氛围", path: "/" },
  { label: "壁纸", path: "/" },
  { label: "我的", path: "/" },
] as const;

export const worldItems = [
  { title: "城市", subtitle: "Wind through ancient pines", meta: "Light Breeze   Rustling Leaves", textureGroup: "weather_1", image: Bj1 },
  { title: "影林", subtitle: "Soft drops against the glass", meta: "Steady Rain   Window Glow", textureGroup: "weather_2", image: Bj2 },
] as const;

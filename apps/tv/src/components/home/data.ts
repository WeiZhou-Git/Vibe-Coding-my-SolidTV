import Bj1 from "@/assets/image/bg1.jpg";
import Bj2 from "@/assets/image/bg2.jpg";
import Bj3 from "@/assets/image/unnamed.jpg";

export const navItems = [
  { label: "天气", path: "/" },
  { label: "氛围", path: "/" },
  { label: "壁纸", path: "/" },
  { label: "我的", path: "/" },
] as const;

export const worldItems = [
  {
    title: "城市",
    subtitle: "Wind through ancient pines",
    meta: "Light Breeze   Rustling Leaves",
    textureGroup: "weather_1",
    image: Bj1,
  },
  {
    title: "影林",
    subtitle: "Soft drops against the glass",
    meta: "Steady Rain   Window Glow",
    textureGroup: "weather_2",
    image: Bj2,
  },
] as const;

export const atmosphereItems = [
  {
    title: "雨夜专注",
    subtitle: "Rain on glass",
    meta: "低频雨声 / 暖光 / 适合阅读",
    image: Bj2,
    accent: "#9fb8c8ff",
  },
  {
    title: "晨雾森林",
    subtitle: "Soft forest air",
    meta: "微风 / 鸟鸣 / 适合清晨",
    image: Bj1,
    accent: "#b4d1acff",
  },
  {
    title: "城市窗边",
    subtitle: "Distant city hum",
    meta: "远处车流 / 室内静音 / 适合工作",
    image: Bj3,
    accent: "#d4c1a4ff",
  },
  {
    title: "深夜白噪",
    subtitle: "Low noise field",
    meta: "稳定白噪 / 降低干扰 / 适合休息",
    image: Bj2,
    accent: "#c8c4ddff",
  },
] as const;

const wallpaperSourceItems = [
  {
    title: "雨后城市",
    subtitle: "玻璃反光 / 夜色",
    image: Bj2,
    accent: "#8fb7cfff",
  },
  {
    title: "松林晨雾",
    subtitle: "柔光 / 绿色",
    image: Bj1,
    accent: "#b7d6a7ff",
  },
  {
    title: "暖色窗边",
    subtitle: "室内 / 黄昏",
    image: Bj3,
    accent: "#d6bd91ff",
  },
] as const;

const wallpaperCategories = ["精选", "自然", "城市", "氛围", "极简", "夜晚"] as const;

export const wallpaperFilterItems = ["全部", ...wallpaperCategories] as const;

export const wallpaperItems = Array.from({ length: 96 }, (_, index) => {
  const source = wallpaperSourceItems[index % wallpaperSourceItems.length];
  const category = wallpaperCategories[index % wallpaperCategories.length];

  return {
    id: `wallpaper-${index + 1}`,
    index,
    category,
    title: `${source.title} ${String(index + 1).padStart(2, "0")}`,
    subtitle: `${category}合集`,
    meta: `${1920 + (index % 3) * 640} x ${1080 + (index % 2) * 360}`,
    image: source.image,
    accent: source.accent,
  };
});

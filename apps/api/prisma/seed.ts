import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contentItems = [
  {
    type: "world",
    title: "城市",
    subtitle: "Wind through ancient pines",
    meta: "Light Breeze   Rustling Leaves",
    textureGroup: "weather_1",
    image: "bg1.jpg",
    sortOrder: 1,
  },
  {
    type: "world",
    title: "影林",
    subtitle: "Soft drops against the glass",
    meta: "Steady Rain   Window Glow",
    textureGroup: "weather_2",
    image: "bg2.jpg",
    sortOrder: 2,
  },
  {
    type: "atmosphere",
    title: "雨夜专注",
    subtitle: "Rain on glass",
    meta: "低频雨声 / 暖光 / 适合阅读",
    image: "bg2.jpg",
    accent: "#9fb8c8ff",
    sortOrder: 1,
  },
  {
    type: "atmosphere",
    title: "晨雾森林",
    subtitle: "Soft forest air",
    meta: "微风 / 鸟鸣 / 适合清晨",
    image: "bg1.jpg",
    accent: "#b4d1acff",
    sortOrder: 2,
  },
  {
    type: "atmosphere",
    title: "城市窗边",
    subtitle: "Distant city hum",
    meta: "远处车流 / 室内静音 / 适合工作",
    image: "unnamed.jpg",
    accent: "#d4c1a4ff",
    sortOrder: 3,
  },
  {
    type: "atmosphere",
    title: "深夜白噪",
    subtitle: "Low noise field",
    meta: "稳定白噪 / 降低干扰 / 适合休息",
    image: "bg2.jpg",
    accent: "#c8c4ddff",
    sortOrder: 4,
  },
];

for (const item of contentItems) {
  await prisma.contentItem.upsert({
    where: {
      type_title: {
        type: item.type,
        title: item.title,
      },
    },
    update: item,
    create: item,
  });
}

await prisma.$disconnect();

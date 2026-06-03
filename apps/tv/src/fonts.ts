const basePath = import.meta.env.BASE_URL;

export default [
  {
    type: "msdf",
    fontFamily: "Roboto700",
    atlasDataUrl: basePath + "fonts/Roboto-Bold.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Bold.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Roboto",
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Arial",
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png",
  } as const,
  {
    fontFamily: "NotoSans",
    fontUrl: basePath + "fonts/NotoSans-Regular.ttf",
    descriptors: {},
  } as const,
  {
    fontFamily: "NotoSans",
    fontUrl: basePath + "fonts/NotoSans-Bold.ttf",
    descriptors: {
      weight: "700",
    },
  } as const,
];

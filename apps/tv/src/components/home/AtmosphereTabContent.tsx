import { Text, View, type ElementNode, type NodeStyles, type TextStyles } from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import { createEffect, createSignal, on, onCleanup, type Component } from "solid-js";
import { atmosphereItems } from "./data";
import { SubtitleTextStyle, TitleBlockStyle, TitleTextStyle } from "./styles";

const BackgroundStageStyle: NodeStyles = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  color: "#050608ff",
  clipping: true,
};

const BackgroundImageStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#ffffffff",
};

const BackgroundSideShadeStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  colorLeft: "#020304f4",
  colorRight: "#02030455",
};

const BackgroundBottomShadeStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  colorTop: "#00000022",
  colorBottom: "#000000e8",
};

const DetailPanelStyle: NodeStyles = {
  x: 900,
  y: 430,
  width: 760,
  height: 320,
};

const DetailTitleStyle: TextStyles = {
  width: 700,
  height: 78,
  fontSize: 58,
  lineHeight: 78,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffff",
};

const DetailSubtitleStyle: TextStyles = {
  width: 500,
  height: 34,
  fontSize: 22,
  lineHeight: 34,
  contain: "both",
  color: "#ffffffaa",
};

const DetailMetaStyle: TextStyles = {
  width: 620,
  height: 84,
  fontSize: 22,
  lineHeight: 34,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffbb",
};

const DetailModeStyle: TextStyles = {
  width: 560,
  height: 34,
  fontSize: 20,
  lineHeight: 34,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffff88",
};

const AtmosphereColumnStyle: NodeStyles = {
  x: 100,
  y: 340,
  width: 455,
  height: 616,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const CardTitleStyle: TextStyles = {
  x: 24,
  y: 24,
  width: 308,
  height: 34,
  fontSize: 24,
  lineHeight: 34,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffff",
};

const CardMetaStyle: TextStyles = {
  x: 24,
  y: 92,
  width: 320,
  height: 26,
  fontSize: 16,
  lineHeight: 26,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffaa",
};

const CardPreviewTextStyle: TextStyles = {
  x: -14,
  y: 0,
  width: 118,
  height: 46,
  fontSize: 20,
  lineHeight: 46,
  textAlign: "center",
  fontFamily: "NotoSans",
  contain: "both",
  color: "#101214ff",
};

type AtmosphereTabContentProps = {
  onItemUp: () => void;
  onListReady: (list: ElementNode) => void;
};

const AtmosphereTabContent: Component<AtmosphereTabContentProps> = props => {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [focusedIndex, setFocusedIndex] = createSignal<number | undefined>(undefined);
  const [detailIndex, setDetailIndex] = createSignal(0);
  const [detailMounted, setDetailMounted] = createSignal(false);
  const [detailVisible, setDetailVisible] = createSignal([false, false, false]);
  const activeItem = () => atmosphereItems[activeIndex()] || atmosphereItems[0];
  const detailItem = () => atmosphereItems[detailIndex()] || atmosphereItems[0];
  const isFocused = (index: number) => focusedIndex() === index;
  const isSelected = (index: number) => activeIndex() === index;
  const detailAlpha = (index: number) => (detailVisible()[index] ? 1 : 0);
  const detailX = (index: number) => (detailVisible()[index] ? 0 : 44);
  let detailTimers: Array<ReturnType<typeof setTimeout>> = [];
  let hasMountedDetails = false;

  const clearDetailTimers = () => {
    detailTimers.forEach(timer => clearTimeout(timer));
    detailTimers = [];
  };

  createEffect(
    on(
      activeIndex,
      nextIndex => {
        clearDetailTimers();
        setDetailMounted(false);
        setDetailVisible([false, false, false]);

        const mountDelay = hasMountedDetails ? 150 : 0;
        hasMountedDetails = true;
        detailTimers.push(
          setTimeout(() => {
            setDetailIndex(nextIndex);
            setDetailMounted(true);

            [0, 1, 2].forEach((_, index) => {
              detailTimers.push(
                setTimeout(
                  () => {
                    setDetailVisible(items =>
                      items.map((visible, itemIndex) => (itemIndex === index ? true : visible)),
                    );
                  },
                  32 + index * 150,
                ),
              );
            });
          }, mountDelay),
        );
      },
      { defer: false },
    ),
  );

  onCleanup(clearDetailTimers);

  return (
    <>
      <View style={BackgroundStageStyle}>
        <View
          style={BackgroundImageStyle}
          src={activeItem().image}
          alpha={0.72}
          textureOptions={{ resizeMode: { type: "cover" } }}
        />
        <View style={BackgroundSideShadeStyle} />
        <View style={BackgroundBottomShadeStyle} />
      </View>

      <View style={TitleBlockStyle}>
        <Text style={TitleTextStyle}>氛围 </Text>
        <Text style={SubtitleTextStyle}>选择一种适合当下的空间模式</Text>
      </View>

      <Column
        ref={props.onListReady}
        style={AtmosphereColumnStyle}
        selected={activeIndex()}
        scroll="none"
        onSelectedChanged={index => setActiveIndex(index)}
      >
        {atmosphereItems.map((item, index) => (
          <View
            width={430}
            height={142}
            borderRadius={22}
            color={isSelected(index) ? "#ffffff18" : "#00000088"}
            alpha={isSelected(index) ? 1 : 0.68}
            scale={isFocused(index) ? 1.035 : 1}
            transition={{
              alpha: { duration: 180 },
              scale: { duration: 180 },
              color: { duration: 180 },
            }}
            onUp={index === 0 ? props.onItemUp : undefined}
            onFocusChanged={focused => {
              if (focused) {
                setActiveIndex(index);
                setFocusedIndex(index);
                return;
              }

              if (focusedIndex() === index) {
                setFocusedIndex(undefined);
              }
            }}
          >
            <View
              x={6}
              y={6}
              width={418}
              height={130}
              borderRadius={18}
              src={item.image}
              alpha={isSelected(index) ? 0.95 : 0.72}
              textureOptions={{ resizeMode: { type: "cover" } }}
            />
            <View
              x={6}
              y={6}
              width={418}
              height={130}
              borderRadius={18}
              colorLeft="#000000dd"
              colorRight={isSelected(index) ? "#00000022" : "#00000088"}
            />
            <View
              x={24}
              y={76}
              width={isSelected(index) ? 78 : 42}
              height={4}
              borderRadius={2}
              color={item.accent}
            />
            <Text style={CardTitleStyle} color={isSelected(index) ? "#ffffffff" : "#ffffffcc"}>
              {item.title}
            </Text>
            <Text style={CardMetaStyle} alpha={isSelected(index) ? 1 : 0.68}>
              {item.meta}
            </Text>
            <View
              x={215}
              y={71}
              mountX={0.5}
              mountY={0.5}
              width={118}
              height={46}
              borderRadius={23}
              color={isFocused(index) ? "#f4f7f3ee" : "#00000000"}
              alpha={isFocused(index) ? 1 : 0}
              transition={{ alpha: { duration: 180 }, color: { duration: 180 } }}
            >
              <Text style={CardPreviewTextStyle} alpha={isFocused(index) ? 1 : 0}>
                预览
              </Text>
            </View>
            <View
              x={6}
              y={6}
              width={418}
              height={130}
              borderRadius={18}
              border={
                isFocused(index)
                  ? { width: 4, color: "#ffffffff" }
                  : isSelected(index)
                    ? { width: 2, color: item.accent }
                    : { width: 0, color: "#00000000" }
              }
            />
          </View>
        ))}
      </Column>

      <View style={DetailPanelStyle}>
        {detailMounted() && (
          <>
            <Text
              style={DetailTitleStyle}
              x={detailX(0)}
              alpha={detailAlpha(0)}
              transition={{ x: { duration: 900 }, alpha: { duration: 900 } }}
            >
              {detailItem().title}
            </Text>
            <Text
              style={DetailSubtitleStyle}
              x={detailX(1)}
              y={96}
              alpha={detailAlpha(1)}
              transition={{ x: { duration: 900 }, alpha: { duration: 900 } }}
            >
              {detailItem().subtitle}
            </Text>
            <View
              x={detailX(2)}
              y={152}
              width={650}
              height={124}
              alpha={detailAlpha(2)}
              transition={{ x: { duration: 980 }, alpha: { duration: 980 } }}
            >
              <View width={4} height={104} borderRadius={2} color={detailItem().accent} />
              <Text x={28} style={DetailModeStyle}>
                {detailItem().meta}
              </Text>
              <Text x={28} y={42} style={DetailMetaStyle}>
                让画面、声音和空间状态靠近同一种情绪，适合把大屏留给此刻的节奏。
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default AtmosphereTabContent;

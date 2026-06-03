import { Text, View, type ElementNode, type NodeStyles, type TextStyles } from "@lightningtv/solid";
import { Row, VirtualGrid } from "@lightningtv/solid/primitives";
import { createMemo, createSignal, type Component } from "solid-js";
import { wallpaperFilterItems, wallpaperItems } from "./data";

const GRID_COLUMNS = 4;
const CARD_WIDTH = 382;
const CARD_HEIGHT = 500;
const GRID_X = 100;
const GRID_Y = 304;
const GRID_WIDTH = 1920 - GRID_X * 2;
const GRID_GAP = (GRID_WIDTH - CARD_WIDTH * GRID_COLUMNS) / (GRID_COLUMNS - 1);
const FOCUS_SAFE_GAP = 24;

const BackgroundStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#050607ff",
};

const BackgroundImageStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#ffffffff",
};

const BackgroundShadeStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  colorTop: "#000000cc",
  colorBottom: "#000000f4",
};

const GridShellStyle: NodeStyles = {
  x: GRID_X - FOCUS_SAFE_GAP,
  y: GRID_Y - FOCUS_SAFE_GAP,
  width: GRID_WIDTH + FOCUS_SAFE_GAP * 2,
  height: 1080 - GRID_Y + FOCUS_SAFE_GAP,
  clipping: true,
};

const WallpaperGridStyle: NodeStyles = {
  x: FOCUS_SAFE_GAP,
  y: 24,
  width: GRID_WIDTH,
  height: 1080 - GRID_Y - 24,
  display: "flex",
  flexDirection: "row",
  gap: GRID_GAP,
};

const FilterRowStyle: NodeStyles = {
  x: 120,
  y: 206,
  width: 1680,
  height: 64,
  display: "flex",
  flexDirection: "row",
  gap: 14,
};

const FilterTextStyle: TextStyles = {
  width: 132,
  height: 54,
  fontSize: 22,
  lineHeight: 54,
  textAlign: "center",
  contain: "both",
  color: "#ffffffcc",
};

const CardTitleStyle: TextStyles = {
  x: 26,
  y: 334,
  width: 290,
  height: 34,
  fontSize: 25,
  lineHeight: 34,
  contain: "both",
  color: "#f3fbffff",
};

const CardSubtitleStyle: TextStyles = {
  x: 26,
  y: 370,
  width: 324,
  height: 28,
  fontSize: 16,
  lineHeight: 28,
  contain: "both",
  color: "#ccd5d0dd",
};

const CardMetaStyle: TextStyles = {
  x: 26,
  y: 452,
  width: 330,
  height: 26,
  fontSize: 14,
  lineHeight: 26,
  contain: "both",
  color: "#aeb8b4cc",
};

type WallpaperTabContentProps = {
  onCardUp: () => void;
  onFilterReady: (row: ElementNode) => void;
  onGridReady: (grid: ElementNode) => void;
};

const WallpaperTabContent: Component<WallpaperTabContentProps> = props => {
  const [activeFilterIndex, setActiveFilterIndex] = createSignal(0);
  const [focusedFilterIndex, setFocusedFilterIndex] = createSignal<number | undefined>(undefined);
  const [activeId, setActiveId] = createSignal(wallpaperItems[0]?.id);
  const [focusedId, setFocusedId] = createSignal<string | undefined>(undefined);
  const activeFilter = () => wallpaperFilterItems[activeFilterIndex()];
  const filteredItems = createMemo(() =>
    activeFilter() === "全部"
      ? wallpaperItems
      : wallpaperItems.filter(item => item.category === activeFilter()),
  );
  const activeItem = () =>
    filteredItems().find(item => item.id === activeId()) || filteredItems()[0] || wallpaperItems[0];
  const activeIndex = () =>
    Math.max(
      0,
      filteredItems().findIndex(item => item.id === activeItem().id),
    );
  let filterRowRef: ElementNode | undefined;
  let gridRef: ElementNode | undefined;

  const selectFilter = (index: number) => {
    setActiveFilterIndex(index);
    const nextFilter = wallpaperFilterItems[index];
    const nextItems =
      nextFilter === "全部" ? wallpaperItems : wallpaperItems.filter(item => item.category === nextFilter);
    setActiveId(nextItems[0]?.id);
    setFocusedId(undefined);
  };

  return (
    <>
      <View style={BackgroundStyle}>
        <View
          style={BackgroundImageStyle}
          src={activeItem().image}
          alpha={0.36}
          textureOptions={{ resizeMode: { type: "cover" } }}
          transition={{ alpha: { duration: 220 } }}
        />
        <View style={BackgroundShadeStyle} />
      </View>

      <Row
        ref={row => {
          filterRowRef = row;
          props.onFilterReady(row);
        }}
        style={FilterRowStyle}
        selected={activeFilterIndex()}
        scroll="none"
        onSelectedChanged={selectFilter}
      >
        {wallpaperFilterItems.map((filter, index) => {
          const isActive = () => activeFilterIndex() === index;
          const isFocused = () => focusedFilterIndex() === index;

          return (
            <View
              width={132}
              height={54}
              borderRadius={27}
              color={isFocused() ? "#f4f5efff" : isActive() ? "#ffffff22" : "#101315cc"}
              border={
                isActive() && !isFocused()
                  ? { width: 2, color: "#ffffff66" }
                  : { width: 0, color: "#00000000" }
              }
              transition={{ color: { duration: 160 } }}
              onUp={props.onCardUp}
              onDown={() => {
                gridRef?.setFocus();
                return true;
              }}
              onEnter={() => selectFilter(index)}
              onFocusChanged={focused => {
                if (focused) {
                  setFocusedFilterIndex(index);
                  return;
                }

                if (focusedFilterIndex() === index) {
                  setFocusedFilterIndex(undefined);
                }
              }}
            >
              <Text
                style={FilterTextStyle}
                color={isFocused() ? "#121512ff" : isActive() ? "#ffffffff" : "#ffffffaa"}
              >
                {filter}
              </Text>
            </View>
          );
        })}
      </Row>

      <View style={GridShellStyle}>
        <VirtualGrid
          ref={grid => {
            gridRef = grid;
            props.onGridReady(grid);
          }}
          style={WallpaperGridStyle}
          each={filteredItems()}
          columns={GRID_COLUMNS}
          rows={1}
          buffer={2}
          scroll="always"
          onUp={() => {
            if (activeIndex() < GRID_COLUMNS) {
              setFocusedId(undefined);
              filterRowRef?.setFocus();
              return true;
            }

            return false;
          }}
        >
          {item => (
            <View
              item={item()}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              borderRadius={18}
              color="#071010ff"
              scale={focusedId() === item().id ? 1.035 : 1}
              transition={{ scale: { duration: 180 } }}
              onFocusChanged={focused => {
                if (focused) {
                  setFocusedId(item().id);
                  setActiveId(item().id);
                  return;
                }

                if (focusedId() === item().id) {
                  setFocusedId(undefined);
                }
              }}
              onEnter={() => {
                setActiveId(item().id);
              }}
            >
              <View
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                alpha={0.82}
                borderRadius={18}
                src={item().image}
                textureOptions={{ resizeMode: { type: "cover" } }}
              />
              <View width={CARD_WIDTH} height={CARD_HEIGHT} color="#06111155" borderRadius={18} />
              <View
                x={0}
                y={250}
                width={CARD_WIDTH}
                height={250}
                colorTop="#04101000"
                colorBottom="#041010ee"
                borderRadius={18}
              />
              <Text style={CardTitleStyle}>{item().title}</Text>
              <Text style={CardSubtitleStyle}>{item().subtitle}</Text>
              <View x={26} y={432} width={330} height={1} color="#ffffff22" />
              <Text style={CardMetaStyle}>{item().meta}</Text>
              <View
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                borderRadius={18}
                color={focusedId() === item().id ? "#00000088" : "#00000000"}
              />
              <View
                x={(CARD_WIDTH - 132) / 2}
                y={(CARD_HEIGHT - 52) / 2}
                width={132}
                height={52}
                borderRadius={26}
                color={focusedId() === item().id ? "#f5f5f5ee" : "#00000000"}
              >
                <Text
                  x={0}
                  y={0}
                  width={132}
                  height={52}
                  fontSize={22}
                  lineHeight={52}
                  textAlign="center"
                  justifyContent="center"
                  contain="both"
                  color={focusedId() === item().id ? "#111111ff" : "#00000000"}
                >
                  应用
                </Text>
              </View>
              <View
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                borderRadius={18}
                border={
                  focusedId() === item().id
                    ? { width: 4, color: "#ffffffff" }
                    : { width: 0, color: "#00000000" }
                }
              />
            </View>
          )}
        </VirtualGrid>
      </View>
    </>
  );
};

export default WallpaperTabContent;

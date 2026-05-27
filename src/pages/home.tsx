import { ElementNode, View } from "@lightningtv/solid";
import { Row, useFocusStack } from "@lightningtv/solid/primitives";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { navItems } from "../components/home/data";
import NavItem from "../components/home/NavItem";
import ProfileTabContent from "../components/home/ProfileTabContent";
import {
  HeaderStyle,
  NAV_INNER_HEIGHT,
  NAV_ITEM_WIDTH,
  NAV_PADDING,
  NavRowStyle,
  PageStyle,
} from "../components/home/styles";
import AtmosphereTabContent from "../components/home/AtmosphereTabContent";
import WallpaperTabContent from "../components/home/WallpaperTabContent";
import WeatherTabContent from "../components/home/WeatherTabContent";

const Home = () => {
  const navigate = useNavigate();
  const { restoreFocus, storeFocus } = useFocusStack();
  const [activeNavIndex, setActiveNavIndex] = createSignal(0);
  const [focusedNavIndex, setFocusedNavIndex] = createSignal<number | undefined>(undefined);
  let navRow: ElementNode | undefined;
  let shelfRow: ElementNode | undefined;

  const openIframeWorld = (textureGroup: string) => {
    window.sessionStorage.setItem("rainTextureGroup", textureGroup);
    navigate(`/iframe-world?textures=${textureGroup}`);
  };

  const renderWeatherTab = () => (
    <WeatherTabContent
      onCardUp={() => navRow?.setFocus()}
      onOpenWorld={openIframeWorld}
      onShelfReady={(shelf) => {
        shelfRow = shelf;
      }}
    />
  );

  const renderTabContent = () => {
    switch (activeNavIndex()) {
      case 0:
        return renderWeatherTab();
      case 1:
        return <AtmosphereTabContent />;
      case 2:
        return <WallpaperTabContent />;
      case 3:
        return <ProfileTabContent />;
      default:
        return renderWeatherTab();
    }
  };

  return (
    <View style={PageStyle} forwardFocus={restoreFocus} onBlur={storeFocus}>
      <View style={HeaderStyle}>
        <View
          x={NAV_PADDING + activeNavIndex() * NAV_ITEM_WIDTH}
          y={NAV_PADDING}
          width={NAV_ITEM_WIDTH}
          height={NAV_INNER_HEIGHT}
          borderRadius={31}
          color={focusedNavIndex() !== undefined ? "#f1f2f2ff" : "#303235ff"}
          transition={{ x: { duration: 220 }, color: { duration: 160 } }}
        />
        <Row ref={navRow} style={NavRowStyle} scroll="none">
          {navItems.map((item, index) => (
            <NavItem
              label={item.label}
              active={activeNavIndex() === index}
              autofocus={index === 0}
              onActive={() => setActiveNavIndex(index)}
              onFocusChange={(focused) => {
                if (focused) {
                  setFocusedNavIndex(index);
                  return;
                }

                if (focusedNavIndex() === index) {
                  setFocusedNavIndex(undefined);
                }
              }}
              onDown={() => {
                if (index === 0) {
                  shelfRow?.setFocus();
                }
              }}
              onEnter={() => setActiveNavIndex(index)}
            />
          ))}
        </Row>
      </View>
      {renderTabContent()}
    </View>
  );
};

export default Home;

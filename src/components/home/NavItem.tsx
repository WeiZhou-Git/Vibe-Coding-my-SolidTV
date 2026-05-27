import { Text, View } from "@lightningtv/solid";
import { createSignal, type Component } from "solid-js";
import { NAV_INNER_HEIGHT, NAV_ITEM_WIDTH } from "./styles";

type NavItemProps = {
  label: string;
  active?: boolean;
  autofocus?: boolean;
  onDown?: () => void;
  onEnter: () => void;
  onActive: () => void;
  onFocusChange?: (focused: boolean) => void;
};

const NavItem: Component<NavItemProps> = (props) => {
  const [focused, setFocused] = createSignal(false);
  const handleFocusChanged = (hasFocus: boolean) => {
    setFocused(hasFocus);
    props.onFocusChange?.(hasFocus);
    if (hasFocus) {
      props.onActive();
    }
  };

  const labelColor = () => {
    if (focused()) {
      return "#17191cff";
    }

    if (props.active) {
      return "#f1f2f2ff";
    }

    return "#8c8d8fff";
  };

  return (
    <View
      width={NAV_ITEM_WIDTH}
      height={NAV_INNER_HEIGHT}
      borderRadius={31}
      color="#00000000"
      autofocus={props.autofocus}
      onFocusChanged={handleFocusChanged}
      onDown={props.onDown}
      onEnter={props.onEnter}
    >
      <Text
        width={NAV_ITEM_WIDTH}
        height={NAV_INNER_HEIGHT}
        fontSize={24}
        lineHeight={NAV_INNER_HEIGHT}
        contain="both"
        textAlign="center"
        justifyContent="center"
        color={labelColor()}
      >
        {props.label}
      </Text>
    </View>
  );
};

export default NavItem;

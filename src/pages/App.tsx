import { useNavigate } from "@solidjs/router";
import { View, ElementNode } from "@lightningtv/solid";
import { useAnnouncer, useMouse } from "@lightningtv/solid/primitives";

declare module "@lightningtv/solid/primitives" {
  interface KeyMap {
    Announcer: string | number | (string | number)[];
    Menu: string | number | (string | number)[];
    Text: string | number | (string | number)[];
    Escape: string | number | (string | number)[];
    Backspace: string | number | (string | number)[];
  }
}

declare global {
  interface Window {
    APP: ElementNode;
  }
}

const App = props => {
  useMouse();
  const navigate = useNavigate();
  const announcer = useAnnouncer();
  announcer.debug = false;
  announcer.enabled = false;

  return (
    <View
      ref={window.APP}
      onAnnouncer={() => (announcer.enabled = !announcer.enabled)}
      onLast={() => history.back()}
      onPlayPause={() => navigate("/text")}
      onMenu={() => navigate("/")}
    >
      <View color={0x071423ff} />
      {props.children}
    </View>
  );
};

export default App;

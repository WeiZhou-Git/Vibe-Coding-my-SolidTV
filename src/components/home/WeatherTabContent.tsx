import { ElementNode, Text, View } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import type { Component } from "solid-js";
import { worldItems } from "./data";
import {
  SHELF_SIDE_GAP,
  ShelfRowStyle,
  ShelfStyle,
  SubtitleTextStyle,
  TitleBlockStyle,
  TitleTextStyle,
} from "./styles";
import WorldCard from "./WorldCard";

type WeatherTabContentProps = {
  onCardUp: () => void;
  onOpenWorld: (textureGroup: string) => void;
  onShelfReady: (shelf: ElementNode) => void;
};

const WeatherTabContent: Component<WeatherTabContentProps> = (props) => (
  <>
    <View style={TitleBlockStyle}>
      <Text style={TitleTextStyle}>选择您的天气背景 </Text>
      <Text style={SubtitleTextStyle}>Select a view to match the mood.</Text>
    </View>
    <View style={ShelfStyle}>
      <Row
        ref={props.onShelfReady}
        style={ShelfRowStyle}
        scroll="auto"
        endOffset={SHELF_SIDE_GAP}
      >
        {worldItems.map((item) => (
          <WorldCard
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            meta={item.meta}
            onUp={props.onCardUp}
            onEnter={() => props.onOpenWorld(item.textureGroup)}
          />
        ))}
      </Row>
    </View>
  </>
);

export default WeatherTabContent;

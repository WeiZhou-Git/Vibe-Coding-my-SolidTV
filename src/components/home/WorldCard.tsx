import { Text, View } from "@lightningtv/solid";
import { createSignal, type Component } from "solid-js";
import { WORLD_CARD_HEIGHT, WORLD_CARD_WIDTH } from "./styles";

type WorldCardProps = {
  image: string;
  title: string;
  subtitle: string;
  meta: string;
  onUp?: () => void;
  onEnter: () => void;
};

const WorldCard: Component<WorldCardProps> = (props) => {
  const [focused, setFocused] = createSignal(false);

  return (
    <View
      width={WORLD_CARD_WIDTH}
      height={WORLD_CARD_HEIGHT}
      borderRadius={18}
      color="#071010ff"
      scale={focused() ? 1.035 : 1}
      transition={{ scale: { duration: 180 } }}
      onFocusChanged={setFocused}
      onUp={props.onUp}
      onEnter={props.onEnter}
    >
      <View src={props.image} width={WORLD_CARD_WIDTH} height={WORLD_CARD_HEIGHT} alpha={0.82} borderRadius={18} 
      textureOptions={{
        resizeMode: {
          type: 'cover',
        },
      }} />
      <View width={WORLD_CARD_WIDTH} height={WORLD_CARD_HEIGHT} color="#06111155" borderRadius={18} />
      <View
        x={0}
        y={380}
        width={WORLD_CARD_WIDTH}
        height={250}
        colorTop="#04101000"
        colorBottom="#041010ee"
        borderRadius={18}
      />
      <Text
        x={28}
        y={462}
        width={360}
        height={34}
        fontSize={25}
        lineHeight={34}
        color="#f3fbffff"
        contain="both"
      >
        {props.title}
      </Text>
      <Text
        x={28}
        y={498}
        width={440}
        height={28}
        fontSize={16}
        lineHeight={28}
        color="#ccd5d0dd"
        contain="both"
      >
        {props.subtitle}
      </Text>
      <View x={28} y={550} width={448} height={1} color="#ffffff22" />
      <Text
        x={28}
        y={570}
        width={448}
        height={26}
        fontSize={14}
        lineHeight={26}
        color="#aeb8b4cc"
        contain="both"
      >
        {props.meta}
      </Text>
      <View
        width={WORLD_CARD_WIDTH}
        height={WORLD_CARD_HEIGHT}
        borderRadius={18}
        color={focused() ? "#00000088" : "#00000000"}
      />
      <View
        x={(WORLD_CARD_WIDTH - 132) / 2}
        y={(WORLD_CARD_HEIGHT - 52) / 2}
        width={132}
        height={52}
        borderRadius={26}
        color={focused() ? "#f5f5f5ee" : "#00000000"}
      >
        <Text
          width={132}
          height={52}
          fontSize={22}
          lineHeight={52}
          textAlign="center"
          justifyContent="center"
          contain="both"
          color={focused() ? "#111111ff" : "#00000000"}
        >
          应用
        </Text>
      </View>
      <View
        width={WORLD_CARD_WIDTH}
        height={WORLD_CARD_HEIGHT}
        borderRadius={18}
        border={focused() ? { width: 4, color: "#ffffffff" } : { width: 0, color: "#00000000" }}
      />
    </View>
  );
};

export default WorldCard;

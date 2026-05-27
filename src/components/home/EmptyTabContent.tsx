import { Text, View } from "@lightningtv/solid";
import type { Component } from "solid-js";
import { EmptyStateStyle, EmptyStateTextStyle } from "./styles";

type EmptyTabContentProps = {
  label?: string;
};

const EmptyTabContent: Component<EmptyTabContentProps> = (props) => (
  <View style={EmptyStateStyle}>
    <Text style={EmptyStateTextStyle}>{props.label || "暂无内容"}</Text>
  </View>
);

export default EmptyTabContent;

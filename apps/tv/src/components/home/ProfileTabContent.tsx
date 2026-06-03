import { Text, View, type ElementNode, type NodeStyles, type TextStyles } from "@lightningtv/solid";
import { Column, Row } from "@lightningtv/solid/primitives";
import { createSignal, type Component } from "solid-js";
import { SubtitleTextStyle, TitleBlockStyle, TitleTextStyle } from "./styles";

const ProfileStageStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#07080aff",
};

const BackgroundShadeStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  colorTop: "#15181dff",
  colorBottom: "#050607ff",
};

const SummaryPanelStyle: NodeStyles = {
  x: 120,
  y: 338,
  width: 600,
  height: 520,
  borderRadius: 24,
  color: "#11151be6",
  border: { width: 1, color: "#ffffff1f" },
};

const AvatarStyle: NodeStyles = {
  x: 40,
  y: 40,
  width: 116,
  height: 116,
  borderRadius: 58,
  colorTop: "#8fb7cfff",
  colorBottom: "#d6bd91ff",
};

const AvatarTextStyle: TextStyles = {
  width: 116,
  height: 116,
  fontSize: 44,
  lineHeight: 116,
  textAlign: "center",
  contain: "both",
  color: "#0b0d10ff",
};

const UserNameStyle: TextStyles = {
  x: 180,
  y: 48,
  width: 350,
  height: 44,
  fontSize: 34,
  lineHeight: 44,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffff",
};

const UserMetaStyle: TextStyles = {
  x: 180,
  y: 102,
  width: 360,
  height: 32,
  fontSize: 20,
  lineHeight: 32,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffff99",
};

const StatusRowStyle: NodeStyles = {
  x: 40,
  y: 198,
  width: 520,
  height: 112,
  display: "flex",
  flexDirection: "row",
  gap: 16,
};

const StatusTitleStyle: TextStyles = {
  x: 22,
  y: 20,
  width: 130,
  height: 28,
  fontSize: 18,
  lineHeight: 28,
  contain: "both",
  color: "#ffffff8a",
};

const StatusValueStyle: TextStyles = {
  x: 22,
  y: 54,
  width: 130,
  height: 34,
  fontSize: 24,
  lineHeight: 34,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffff",
};

const DetailTitleStyle: TextStyles = {
  width: 500,
  height: 34,
  fontSize: 22,
  lineHeight: 34,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffcc",
};

const DetailTextStyle: TextStyles = {
  y: 42,
  width: 500,
  height: 34,
  fontSize: 20,
  lineHeight: 34,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffff78",
};

const ActionAreaStyle: NodeStyles = {
  x: 780,
  y: 338,
  width: 1020,
  height: 520,
};

const ActionRowStyle: NodeStyles = {
  width: 1020,
  height: 220,
  display: "flex",
  flexDirection: "row",
  gap: 28,
};

const ActionTitleStyle: TextStyles = {
  x: 30,
  y: 28,
  width: 400,
  height: 42,
  fontSize: 30,
  lineHeight: 42,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffff",
};

const ActionSubtitleStyle: TextStyles = {
  x: 30,
  y: 82,
  width: 370,
  height: 60,
  fontSize: 20,
  lineHeight: 30,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffff91",
};

const ActionMetaStyle: TextStyles = {
  x: 30,
  y: 164,
  width: 330,
  height: 28,
  fontSize: 18,
  lineHeight: 28,
  contain: "both",
  color: "#ffffff66",
};

const InfoListStyle: NodeStyles = {
  y: 260,
  width: 1020,
  height: 260,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const InfoLabelStyle: TextStyles = {
  x: 28,
  y: 18,
  width: 220,
  height: 30,
  fontSize: 20,
  lineHeight: 30,
  contain: "both",
  color: "#ffffff91",
};

const InfoValueStyle: TextStyles = {
  x: 290,
  y: 18,
  width: 580,
  height: 30,
  fontSize: 20,
  lineHeight: 30,
  fontFamily: "NotoSans",
  contain: "both",
  color: "#ffffffff",
};

const profileStats = [
  { label: "会员", value: "Pro" },
  { label: "设备", value: "3 台" },
  { label: "收藏", value: "18" },
] as const;

const actionItems = [
  {
    title: "支付",
    subtitle: "会员续费、订单记录、支付方式管理",
    meta: "当前方案：Pro 月度",
    accent: "#8fb7cfff",
  },
  {
    title: "设置",
    subtitle: "账号、安全、通知、播放偏好与设备管理",
    meta: "上次同步：今天",
    accent: "#d6bd91ff",
  },
] as const;

const infoItems = [
  { label: "账号", value: "hi@rainspace.tv" },
  { label: "所在地", value: "上海 / 中国" },
  { label: "偏好", value: "雨夜专注、城市窗边、暗色界面" },
] as const;

type ProfileTabContentProps = {
  onActionUp: () => void;
  onActionReady: (row: ElementNode) => void;
};

const ProfileTabContent: Component<ProfileTabContentProps> = props => {
  const [focusedActionIndex, setFocusedActionIndex] = createSignal<number | undefined>(undefined);
  const [focusedInfoIndex, setFocusedInfoIndex] = createSignal<number | undefined>(undefined);
  let actionRowRef: ElementNode | undefined;

  return (
    <>
      <View style={ProfileStageStyle}>
        <View style={BackgroundShadeStyle} />
      </View>

      <View style={TitleBlockStyle}>
        <Text style={TitleTextStyle}>我的 </Text>
        <Text style={SubtitleTextStyle}>管理个人资料、支付和偏好设置</Text>
      </View>

      <View style={SummaryPanelStyle}>
        <View style={AvatarStyle}>
          <Text style={AvatarTextStyle}>林</Text>
        </View>
        <Text style={UserNameStyle}>林间听雨</Text>
        <Text style={UserMetaStyle}>ID 2048 · Pro 会员</Text>

        <Row style={StatusRowStyle} scroll="none" skipFocus>
          {profileStats.map(item => (
            <View width={162} height={112} borderRadius={18} color="#ffffff10">
              <Text style={StatusTitleStyle}>{item.label}</Text>
              <Text style={StatusValueStyle}>{item.value}</Text>
            </View>
          ))}
        </Row>

        <View x={40} y={354} width={520} height={96}>
          <Text style={DetailTitleStyle}>个人资料</Text>
          <Text style={DetailTextStyle}>资料完整度 80%，已绑定邮箱和 3 台大屏设备。</Text>
        </View>
      </View>

      <View style={ActionAreaStyle}>
        <Row
          ref={row => {
            actionRowRef = row;
            props.onActionReady(row);
          }}
          style={ActionRowStyle}
          scroll="none"
        >
          {actionItems.map((item, index) => {
            const focused = () => focusedActionIndex() === index;

            return (
              <View
                width={496}
                height={220}
                borderRadius={24}
                color={focused() ? "#ffffff24" : "#11151be6"}
                scale={focused() ? 1.025 : 1}
                border={focused() ? { width: 4, color: "#ffffffff" } : { width: 1, color: "#ffffff1f" }}
                transition={{
                  color: { duration: 160 },
                  scale: { duration: 180 },
                }}
                onUp={props.onActionUp}
                onFocusChanged={hasFocus => {
                  if (hasFocus) {
                    setFocusedActionIndex(index);
                    return;
                  }

                  if (focusedActionIndex() === index) {
                    setFocusedActionIndex(undefined);
                  }
                }}
              >
                <View
                  x={30}
                  y={150}
                  width={focused() ? 126 : 74}
                  height={5}
                  borderRadius={3}
                  color={item.accent}
                />
                <Text style={ActionTitleStyle}>{item.title}</Text>
                <Text style={ActionSubtitleStyle}>{item.subtitle}</Text>
                <Text style={ActionMetaStyle}>{item.meta}</Text>
              </View>
            );
          })}
        </Row>

        <Column
          style={InfoListStyle}
          scroll="none"
          onUp={() => {
            actionRowRef?.setFocus();
            return true;
          }}
        >
          {infoItems.map((item, index) => {
            const focused = () => focusedInfoIndex() === index;

            return (
              <View
                width={1020}
                height={68}
                borderRadius={18}
                color={focused() ? "#ffffff1f" : "#11151be6"}
                border={focused() ? { width: 3, color: "#ffffffff" } : { width: 1, color: "#ffffff16" }}
                transition={{ color: { duration: 160 } }}
                onFocusChanged={hasFocus => {
                  if (hasFocus) {
                    setFocusedInfoIndex(index);
                    return;
                  }

                  if (focusedInfoIndex() === index) {
                    setFocusedInfoIndex(undefined);
                  }
                }}
              >
                <Text style={InfoLabelStyle}>{item.label}</Text>
                <Text style={InfoValueStyle}>{item.value}</Text>
              </View>
            );
          })}
        </Column>
      </View>
    </>
  );
};

export default ProfileTabContent;

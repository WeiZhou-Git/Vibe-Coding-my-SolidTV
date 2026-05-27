import { Text, View, type ElementNode, type NodeStyles, type TextStyles } from "@lightningtv/solid";
import { Row } from "@lightningtv/solid/primitives";
import {
  fallbackForecast,
  fetchRealForecast7dWeather,
  getCurrentForecast,
  type RealForecastWeatherItem,
} from "@/services/weather";
import { createSignal, onCleanup, onMount } from "solid-js";

const PageStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#00000022",
};

const LoadingOverlayStyle: NodeStyles = {
  width: 1920,
  height: 1080,
  color: "#111418ff",
};

const SpinnerStyle: NodeStyles = {
  x: (1920 - 52) / 2,
  y: (1080 - 52) / 2,
  width: 52,
  height: 52,
  pivotX: 0.5,
  pivotY: 0.5,
};

const LoadingTextStyle: TextStyles = {
  x: 820,
  y: 580,
  width: 280,
  height: 34,
  fontSize: 24,
  lineHeight: 34,
  textAlign: "center",
  contain: "both",
  color: "#ffffffff",
};

const WeatherDateStyle: TextStyles = {
  x: 660,
  width: 600,
  height: 36,
  fontSize: 25,
  lineHeight: 36,
  fontFamily: "NotoSans",
  textAlign: "center",
  contain: "both",
  color: "#252445ff",
};

const TemperatureGroupStyle: NodeStyles = {
  x: 710,
  width: 500,
  height: 170,
};

const TemperatureValueStyle: TextStyles = {
  width: 500,
  height: 150,
  fontSize: 132,
  lineHeight: 150,
  fontFamily: "Roboto700",
  textAlign: "center",
  contain: "both",
  color: "#252445ff",
};

const TemperatureUnitStyle: TextStyles = {
  x: 355,
  y: 31,
  width: 56,
  height: 54,
  fontSize: 34,
  lineHeight: 54,
  fontFamily: "Roboto700",
  contain: "both",
  color: "#252445ff",
};

const WeatherSummaryStyle: TextStyles = {
  y: 550,
  height: 44,
  fontSize: 24,
  lineHeight: 44,
  fontFamily: "NotoSans",
  textAlign: "center",
  contain: "both",
  color: "#252445ff",
};

const ForecastRowStyle: NodeStyles = {
  x: 510,
  y: 645,
  width: 900,
  height: 126,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 18,
};

const ForecastIconStyle: NodeStyles = {
  x: 28,
  y: 8,
  width: 44,
  height: 44,
  color: "#ffffffff",
};

const ForecastDateStyle: TextStyles = {
  y: 61,
  width: 100,
  height: 34,
  fontSize: 23,
  lineHeight: 34,
  fontFamily: "Roboto700",
  textAlign: "center",
  contain: "both",
};

const MainContentTransition = {
  alpha: { duration: 350 },
  y: { duration: 350 },
  scale: { duration: 350 },
};

const WEATHER_DATE_Y = 350;
const TEMPERATURE_GROUP_Y = 420;
const WEATHER_SUMMARY_Y = 550;

const RAIN_DEMO_VERSION = "texture-groups-v3";

const getRainTextureGroup = () => {
  const hashQuery = window.location.hash.includes("?")
    ? window.location.hash.slice(window.location.hash.indexOf("?") + 1)
    : "";
  const searchTextureGroup = new URLSearchParams(window.location.search).get("textures");
  const hashTextureGroup = new URLSearchParams(hashQuery).get("textures");
  const storedTextureGroup = window.sessionStorage.getItem("rainTextureGroup");
  const textureGroup = hashTextureGroup || searchTextureGroup || storedTextureGroup;

  if (textureGroup === "weather_1" || textureGroup === "weather_2" || textureGroup === "weather") {
    return textureGroup;
  }

  return "weather_1";
};

const getRainDemoHash = (forecast: RealForecastWeatherItem) => {
  const weather = forecast.weather;
  const conditionId = Number(forecast.conditionIdDay);

  if (weather.includes("雷") || weather.includes("暴") || weather.includes("风暴")) {
    return "slide-5";
  }

  if (weather.includes("沙") || weather.includes("尘") || weather.includes("霾") || weather.includes("雾")) {
    return "slide-4";
  }

  if (weather.includes("小雨") || weather.includes("阵雨") || weather.includes("毛毛雨") || conditionId === 7) {
    return "slide-2";
  }

  if (weather.includes("雨") || weather.includes("雪")) {
    return "slide-1";
  }

  return "slide-3";
};

const createRainDemoIframe = (onReady: () => void, initialSlideId: string, textureGroup: string) => {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const appRoot = document.getElementById("app");

  if (!appRoot) {
    return undefined;
  }

  const iframe = document.createElement("iframe");
  iframe.id = "rain-demo-background";
  iframe.dataset.textureGroup = textureGroup;
  iframe.src = `${baseUrl}/rain-demo/index.html?textures=${encodeURIComponent(textureGroup)}&v=${RAIN_DEMO_VERSION}#${initialSlideId}`;
  iframe.title = "Rain background";
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  iframe.onload = () => {
    iframe.style.visibility = "visible";
    onReady();
  };
  iframe.style.position = "fixed";
  iframe.style.inset = "0";
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.border = "0";
  iframe.style.zIndex = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.background = "#071423";
  iframe.style.visibility = "hidden";

  document.body.insertBefore(iframe, appRoot);

  return iframe;
};

const formatForecastDate = (forecast: RealForecastWeatherItem) => {
  const [year, month, day] = forecast.forecasttime.split("-");

  return `${year}年${month}月${day}日 ${forecast.week}`;
};

const getTemperatureValue = (temperature: string) =>
  temperature.replace("℃", "°");

const getForecastMeta = (forecast: RealForecastWeatherItem) =>
  ` ${forecast.weather}  ${forecast.winddirStr}${forecast.windpowerStr}  空气${forecast.aqiLevel} `;

const getCenteredTextWidth = (text: string) =>
  Math.min(880, Math.max(420, text.length * 30));

const getDefaultForecastTime = (forecast: RealForecastWeatherItem[]) =>
  getCurrentForecast(forecast).forecasttime;

const IframeWorld = () => {
  const [loading, setLoading] = createSignal(true);
  const [spinnerRotation, setSpinnerRotation] = createSignal(0);
  const [forecast, setForecast] = createSignal<RealForecastWeatherItem[]>(fallbackForecast);
  const [selectedForecastTime, setSelectedForecastTime] = createSignal(getDefaultForecastTime(fallbackForecast));
  const [mainContentAlpha, setMainContentAlpha] = createSignal(1);
  const [mainContentOffset, setMainContentOffset] = createSignal(0);
  const [mainContentScale, setMainContentScale] = createSignal(1);
  const currentForecast = () =>
    forecast().find((item) => item.forecasttime === selectedForecastTime()) || getCurrentForecast(forecast());
  const selectedForecastIndex = () => {
    const index = forecast().findIndex((item) => item.forecasttime === selectedForecastTime());

    return index >= 0 ? index : 0;
  };
  let weatherAbortController: AbortController | undefined;

  let forecastRow: ElementNode | undefined;
  let iframe: HTMLIFrameElement | undefined;
  let forwardMouseMove: ((event: MouseEvent) => void) | undefined;
  let spinnerFrame: number | undefined;
  let contentSwapFrame: number | undefined;
  let contentEnterFrame: number | undefined;
  let contentSwapTimer: number | undefined;

  const syncRainDemoWeather = (weatherForecast: RealForecastWeatherItem) => {
    const slideId = getRainDemoHash(weatherForecast);
    const rainWindow = iframe?.contentWindow;

    if (rainWindow && rainWindow.location.hash !== `#${slideId}`) {
      const oldURL = rainWindow.location.href;
      rainWindow.history.replaceState(null, "", `#${slideId}`);
      rainWindow.dispatchEvent(new HashChangeEvent("hashchange", {
        oldURL,
        newURL: rainWindow.location.href,
      }));
    }
  };

  const selectForecastTime = (forecastTime: string) => {
    if (forecastTime === selectedForecastTime()) {
      return;
    }

    if (contentSwapFrame !== undefined) {
      cancelAnimationFrame(contentSwapFrame);
    }

    if (contentEnterFrame !== undefined) {
      cancelAnimationFrame(contentEnterFrame);
    }

    if (contentSwapTimer !== undefined) {
      window.clearTimeout(contentSwapTimer);
    }

    setMainContentAlpha(0);
    setMainContentOffset(92);
    setMainContentScale(0.94);
    contentSwapTimer = window.setTimeout(() => {
      const nextForecast = forecast().find((item) => item.forecasttime === forecastTime);

      setSelectedForecastTime(forecastTime);
      if (nextForecast) {
        syncRainDemoWeather(nextForecast);
      }

      contentEnterFrame = requestAnimationFrame(() => {
        setMainContentAlpha(1);
        setMainContentOffset(0);
        setMainContentScale(1);
      });
    }, 180);
  };

  onMount(() => {
    const updateSpinner = (time: number) => {
      if (!loading()) {
        spinnerFrame = undefined;
        return;
      }

      setSpinnerRotation(((time % 850) / 850) * Math.PI * 2);
      spinnerFrame = requestAnimationFrame(updateSpinner);
    };

    spinnerFrame = requestAnimationFrame(updateSpinner);
    iframe = createRainDemoIframe(() => setLoading(false), getRainDemoHash(currentForecast()), getRainTextureGroup());
    weatherAbortController = new AbortController();
    fetchRealForecast7dWeather(weatherAbortController.signal)
      .then((weatherForecast) => {
        const defaultForecastTime = getDefaultForecastTime(weatherForecast);
        const defaultForecast =
          weatherForecast.find((item) => item.forecasttime === defaultForecastTime) || getCurrentForecast(weatherForecast);

        setForecast(weatherForecast);
        setSelectedForecastTime(defaultForecastTime);
        syncRainDemoWeather(defaultForecast);
        requestAnimationFrame(() => forecastRow?.setFocus());
      })
      .catch(() => setForecast(fallbackForecast));

    if (!iframe) {
      setLoading(false);
      return;
    }

    forwardMouseMove = event => {
      const rainWindow = iframe?.contentWindow;
      const rainDocument = rainWindow?.document;

      if (!rainWindow || !rainDocument) {
        return;
      }

      rainDocument.dispatchEvent(new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: false,
        view: rainWindow,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
      }));
    };

    window.addEventListener("mousemove", forwardMouseMove, { passive: true });
  });

  onCleanup(() => {
    weatherAbortController?.abort();

    if (forwardMouseMove) {
      window.removeEventListener("mousemove", forwardMouseMove);
    }

    if (iframe) {
      iframe.remove();
    }

    if (spinnerFrame !== undefined) {
      cancelAnimationFrame(spinnerFrame);
    }

    if (contentSwapFrame !== undefined) {
      cancelAnimationFrame(contentSwapFrame);
    }

    if (contentEnterFrame !== undefined) {
      cancelAnimationFrame(contentEnterFrame);
    }

    if (contentSwapTimer !== undefined) {
      window.clearTimeout(contentSwapTimer);
    }
  });

  return (
    <View style={PageStyle}>
      <Text
        style={WeatherDateStyle}
        y={WEATHER_DATE_Y + mainContentOffset()}
        alpha={mainContentAlpha()}
        transition={MainContentTransition}
      >
        {formatForecastDate(currentForecast())}
      </Text>
      <View
        style={TemperatureGroupStyle}
        y={TEMPERATURE_GROUP_Y + mainContentOffset()}
        alpha={mainContentAlpha()}
        scale={mainContentScale()}
        transition={MainContentTransition}
      >
        <Text style={TemperatureValueStyle}>
          {getTemperatureValue(currentForecast().temperature_am)}
        </Text>
        <Text style={TemperatureUnitStyle}>C</Text>
      </View>
      <Text
        style={WeatherSummaryStyle}
        x={(1920 - getCenteredTextWidth(getForecastMeta(currentForecast()))) / 2}
        y={WEATHER_SUMMARY_Y + mainContentOffset()}
        width={getCenteredTextWidth(getForecastMeta(currentForecast()))}
        alpha={mainContentAlpha()}
        transition={MainContentTransition}
      >
        {getForecastMeta(currentForecast())}
      </Text>

      <Row
        ref={forecastRow}
        autofocus
        style={ForecastRowStyle}
        selected={selectedForecastIndex()}
        scroll="none"
        onSelectedChanged={(index) => {
          const selectedForecast = forecast()[index];

          if (selectedForecast) {
            selectForecastTime(selectedForecast.forecasttime);
          }
        }}
      >
        {forecast().map((item) => (
          <View
            width={100}
            height={104}
            borderRadius={14}
            color={item.forecasttime === selectedForecastTime() ? "#252445ff" : "#00000000"}
          >
            <View
              style={ForecastIconStyle}
              src={item.waterIcon}
              alpha={item.forecasttime === selectedForecastTime() ? 1 : 0.72}
            />
            <Text
              style={ForecastDateStyle}
              color={item.forecasttime === selectedForecastTime() ? "#ffffffff" : "#252445ff"}
            >
              {item.day}
            </Text>
          </View>
        ))}
      </Row>

      {loading() && (
        <View style={LoadingOverlayStyle}>
          <View style={SpinnerStyle} rotation={spinnerRotation()}>
            <View
              width={52}
              height={52}
              borderRadius={26}
              border={{ width: 8, color: "#2d343bff" }}
              color="#00000000"
            />
            <View x={30} y={0} width={40} height={30} color="#111418ff" />
          </View>

          <Text style={LoadingTextStyle}>Loading</Text>
        </View>
      )}
    </View>
  );
};

export default IframeWorld;

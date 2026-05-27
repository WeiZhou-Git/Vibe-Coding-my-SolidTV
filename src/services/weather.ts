export type RealForecastWeatherItem = {
  conditionIdDay: string;
  conditionIdNight: string;
  forecasttime: string;
  week: string;
  day: string;
  waterIcon: string;
  temperature_am: string;
  weather: string;
  windpower: string;
  windpowerStr: string;
  winddir: string;
  winddirStr: string;
  temperature_pm: string;
  aqiLevel: string;
  aqi: string;
};

type RealForecastWeatherResponse = {
  status: number;
  message: string;
  data: RealForecastWeatherItem[];
};

const REAL_FORECAST_PATH =
  "/api/weather/v1/getAreaRealForecast7dWeather?deviceId=89898585&deviceToken=dawd215d15awd";

const TEST_REAL_FORECAST_URL =
  "http://test.weather.ai-abc.com/api/v1/getAreaRealForecast7dWeather?deviceId=89898585&deviceToken=dawd215d15awd";

const REAL_FORECAST_URL =
  import.meta.env.VITE_REAL_FORECAST_7D_URL ||
  (import.meta.env.DEV ? REAL_FORECAST_PATH : TEST_REAL_FORECAST_URL);

export const fallbackForecast: RealForecastWeatherItem[] = [
  {
    conditionIdDay: "7",
    conditionIdNight: "2",
    forecasttime: "2026-05-25",
    week: "今日",
    day: "05/25",
    waterIcon: "http://weather-images.ai-abc.com/img/aliweathericon/W7.png",
    temperature_am: "21℃",
    weather: "小雨",
    windpower: "2",
    windpowerStr: "2级",
    winddir: "",
    winddirStr: "东北风",
    temperature_pm: "19℃",
    aqiLevel: "优",
    aqi: "35",
  },
  {
    conditionIdDay: "1",
    conditionIdNight: "31",
    forecasttime: "2026-05-26",
    week: "星期二",
    day: "05/26",
    waterIcon: "http://weather-images.ai-abc.com/img/aliweathericon/W1.png",
    temperature_am: "24℃",
    weather: "多云",
    windpower: "2",
    windpowerStr: "2级",
    winddir: "",
    winddirStr: "东南风",
    temperature_pm: "18℃",
    aqiLevel: "良",
    aqi: "54",
  },
  {
    conditionIdDay: "0",
    conditionIdNight: "30",
    forecasttime: "2026-05-28",
    week: "星期四",
    day: "05/28",
    waterIcon: "http://weather-images.ai-abc.com/img/aliweathericon/W0.png",
    temperature_am: "30℃",
    weather: "晴",
    windpower: "3",
    windpowerStr: "3级",
    winddir: "",
    winddirStr: "西北风",
    temperature_pm: "20℃",
    aqiLevel: "优",
    aqi: "40",
  },
];

export const fetchRealForecast7dWeather = async (
  signal?: AbortSignal,
): Promise<RealForecastWeatherItem[]> => {
  const response = await fetch(REAL_FORECAST_URL, { signal });

  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }

  const result = await response.json() as RealForecastWeatherResponse;

  if (result.status !== 200 || !Array.isArray(result.data)) {
    throw new Error(result.message || "Invalid weather response");
  }

  return result.data;
};

const getTodayForecastTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getCurrentForecast = (forecast: RealForecastWeatherItem[]) =>
  forecast.find((item) => item.forecasttime === getTodayForecastTime()) ||
  forecast.find((item) => item.week === "今日") ||
  forecast[0] ||
  fallbackForecast[0];

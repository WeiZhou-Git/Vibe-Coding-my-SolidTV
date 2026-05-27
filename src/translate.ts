import * as i18n from "@solid-primitives/i18n";
import en_dict from "../public/assets/lang/en.json";
import cn_dict from "../public/assets/lang/cn.json";
import { createResource, createSignal } from "solid-js";

const [locale, setLocale] = createSignal("cn");

// 预加载本地字典
const localDicts = {
  en: en_dict,
  cn: cn_dict,
};

// 支持本地优先加载，远程可覆盖
async function fetchDictionary(locale) {
  try {
    // 优先本地，有需要可请求远程覆盖
    const local = localDicts[locale];
    // 如果本地有直接返回
    if (local) return local;
    // 兼容可能存在的远程加载需求
    const response = await fetch(`${import.meta.env.BASE_URL}assets/lang/${locale}.json`);
    return await response.json();
  } catch (error) {
    console.log(error);
    // 兜底返回英文
    return en_dict;
  }
}

const [dict] = createResource(locale, fetchDictionary, {
  initialValue: cn_dict,
});

const $t = i18n.translator(dict);

export { $t, locale, setLocale };

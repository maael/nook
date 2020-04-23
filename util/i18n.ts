import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LocalStorageKeys, getKey } from "../components/hooks/useLocalstorage";
import { getJWT } from "../components/hooks/useJWT";

enum LANGUAGES {
  en = "en",
  de = "de",
  fr = "fr",
  es = "es",
  ja = "ja"
}

export { LANGUAGES };

const resources = {
  en: {
    bugs: require("../data/translations/bugs/en.json"),
    fish: require("../data/translations/fish/en.json"),
    recipes: require("../data/translations/recipes/en.json"),
    fossils: require("../data/translations/fossils/en.json")
  },
  fr: {
    bugs: require("../data/translations/bugs/fr.json"),
    fish: require("../data/translations/fish/fr.json"),
    recipes: require("../data/translations/recipes/fr.json"),
    fossils: require("../data/translations/fossils/fr.json")
  },
  de: {
    bugs: require("../data/translations/bugs/de.json"),
    fish: require("../data/translations/fish/de.json"),
    recipes: require("../data/translations/recipes/de.json"),
    fossils: require("../data/translations/fossils/de.json")
  },
  es: {
    bugs: require("../data/translations/bugs/es.json"),
    fish: require("../data/translations/fish/es.json"),
    recipes: require("../data/translations/recipes/es.json"),
    fossils: require("../data/translations/fossils/es.json")
  },
  ja: {
    bugs: require("../data/translations/bugs/ja.json"),
    fish: require("../data/translations/fish/ja.json"),
    recipes: require("../data/translations/recipes/ja.json"),
    fossils: require("../data/translations/fossils/ja.json")
  }
};

let language = "en";

try {
  const jwt = getJWT();
  language = JSON.parse(
    localStorage.getItem(
      getKey(LocalStorageKeys.SELECTED_LANGUAGE, jwt && jwt._id)
    )!
  );
} catch {
  /*Nothing*/
}

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

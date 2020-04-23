import { CSSProperties, useState, useEffect } from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../util/i18n";
import useLocalStorage, { LocalStorageKeys } from "../hooks/useLocalstorage";

const LANG_FLAG_MAP: Record<LANGUAGES, string> = {
  en: "gb",
  de: "de",
  es: "es",
  fr: "fr",
  ja: "jp"
};

import { colors } from "../../util/theme";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "5px",
    borderRadius: "0.3em",
    maxWidth: "95vmin",
    textAlign: "center",
    backgroundColor: colors.blueDark,
    color: colors.blueLight,
    border: "none",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "rgba(193, 211, 253, 0.5)"
  }
} as const;

export default function LanguageControl({ style }: { style?: CSSProperties }) {
  const { i18n } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentLang, setCurrentLang] = useLocalStorage(
    LocalStorageKeys.SELECTED_LANGUAGE,
    i18n.language || "en"
  );
  useEffect(() => {
    (async () => {
      if (initialLoad && i18n.language !== currentLang) {
        await i18n.changeLanguage(currentLang);
        window.location.reload();
      } else if (!initialLoad) {
        setInitialLoad(true);
      }
    })();
  }, [currentLang, initialLoad]);
  return (
    <div style={style}>
      <img
        src={`/images/flags/${LANG_FLAG_MAP[currentLang]}.png`}
        css={{ cursor: "pointer" }}
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Language Selection"
      >
        <div css={{ display: "flex", flexDirection: "row" }}>
          {Object.entries(LANG_FLAG_MAP).map(([lang, flag]) => (
            <div
              key={lang}
              css={{
                margin: 5,
                padding: 5,
                borderRadius: "0.3em",
                cursor: "pointer"
              }}
              style={{
                backgroundColor:
                  lang === currentLang ? colors.blueLight : undefined
              }}
            >
              <img
                src={`/images/flags/${flag}.png`}
                onClick={() => setCurrentLang(lang)}
              />
            </div>
          ))}
        </div>
        <div
          onClick={() => setIsOpen(false)}
          style={{ cursor: "pointer", marginTop: 5 }}
        >
          Close
        </div>
      </Modal>
    </div>
  );
}

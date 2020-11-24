export const theme = {
    "name": "rare fake snooze",
    "rounding": 4,
    "spacing": 24,
    "defaultMode": "light",
    "global": {
      "colors": {
        "brand": {
          "dark": "#3A5A40",
          "light": "#3A5A40"
        },
        "background": {
          "dark": "#353535",
          "light": "#FAFAFA"
        },
        "background-back": {
          "dark": "#111111",
          "light": "#FAFAFA"
        },
        "background-front": {
          "dark": "#222222",
          "light": "#D9D9D9"
        },
        "background-contrast": {
          "dark": "#FFFFFF11",
          "light": "#E7E7E7"
        },
        "text": {
          "dark": "#EEEEEE",
          "light": "#353535"
        },
        "text-strong": {
          "dark": "#FFFFFF",
          "light": "#000000"
        },
        "text-weak": {
          "dark": "#CCCCCC",
          "light": "#444444"
        },
        "text-xweak": {
          "dark": "#999999",
          "light": "#686868"
        },
        "border": {
          "dark": "#444444",
          "light": "#CCCCCC"
        },
        "control": "brand",
        "active-background": "background-contrast",
        "active-text": "text-strong",
        "selected-background": {"light": "#CAD8DF", "dark": "focus"},
        "selected-text": {"light": "text", "dark": "text"},
        "status-critical": "#FF4040",
        "status-warning": "#FFAA15",
        "status-ok": "#999999",
        "status-unknown": "#CCCCCC",
        "status-disabled": "#CCCCCC",
        "graph-0": "brand",
        "graph-1": "4A5759",
        "focus": "#7397AB"
      },
      "font": {
        "family": "\"Open Sans\"",
        "face": "/* cyrillic-ext */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n/* cyrillic-ext */\n@font-face {\n  font-family: 'PT Serif';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/ptserif/v12/EJRVQgYoZZY2vCFuvAFbzr-_dSb_nco.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'PT Serif';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/ptserif/v12/EJRVQgYoZZY2vCFuvAFSzr-_dSb_nco.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'PT Serif';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/ptserif/v12/EJRVQgYoZZY2vCFuvAFYzr-_dSb_nco.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'PT Serif';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/ptserif/v12/EJRVQgYoZZY2vCFuvAFWzr-_dSb_.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n"
      },
      "active": {
        "background": "active-background",
        "color": "active-text"
      },
      "hover": {
        "background": "active-background",
        "color": "active-text"
      },
      "selected": {
        "background": "selected-background",
        "color": "selected-text"
      },
      "control": {
        "border": {
          "radius": "4px"
        }
      },
      "drop": {
        "border": {
          "radius": "4px"
        }
      }
    },
    "chart": {},
    "diagram": {
      "line": {}
    },
    "meter": {},
    "button": {
      "border": {
        "radius": "4px"
      }
    },
    "checkBox": {
      "check": {
        "radius": "4px"
      },
      "toggle": {
        "radius": "4px"
      }
    },
    "radioButton": {
      "check": {
        "radius": "4px"
      }
    },
    "formField": {
      "border": {
        "color": "border",
        "error": {
          "color": {
            "dark": "white",
            "light": "status-critical"
          }
        },
        "position": "inner",
        "side": "bottom",
        "style": "solid"
      },
      "content": {
        "pad": "small"
      },
      "disabled": {
        "background": {
          "color": "status-disabled",
          "opacity": "medium"
        }
      },
      "error": {
        "color": "status-critical",
        "margin": {
          "vertical": "xsmall",
          "horizontal": "small"
        }
      },
      "help": {
        "color": "dark-3",
        "margin": {
          "start": "small"
        }
      },
      "info": {
        "color": "text-xweak",
        "margin": {
          "vertical": "xsmall",
          "horizontal": "small"
        }
      },
      "label": {
        "margin": {
          "vertical": "xsmall",
          "horizontal": "small"
        }
      },
      "margin": {
        "bottom": "small"
      },
      "round": "4px"
    },
    "heading": {
      "font": {
        "family": "\"PT Serif\""
      }
    },
    anchor: {
      textDecoration: 'none',
      fontWeight: 500,
      color: {
        dark: 'white',
        light: 'neutral-2',
      },
      hover: {
        textDecoration: 'none',
        fontWeight: 700,
      },
    }
  }
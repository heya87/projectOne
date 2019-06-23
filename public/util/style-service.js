const STYLE_KEY = "style";
const PAHT_DEFAULT_CSS = "../../style/style.css";
const PAHT_ALTERNATE_CSS = "../../style/alternate-style.css";

export class StyleService {
  constructor() {
    if (this.isDefault() === undefined) {
      this.setDefaultStyle(true);
    }
    this.updateStyleSheet();
  }

  isDefault() {
    let currentStyle = JSON.parse(localStorage.getItem(STYLE_KEY));
    return currentStyle.default;
  }

  switch() {
    this.setDefaultStyle(!this.isDefault());
    console.log("default style activated: " + this.isDefault());
    this.updateStyleSheet();
  }

  setDefaultStyle(styleValue) {
    let style = {
      default: styleValue
    };
    localStorage.setItem(STYLE_KEY, JSON.stringify(style));
  }

  setDefaultTheme() {
    var theme = document.getElementById("theme");
    theme.href = PAHT_DEFAULT_CSS; 
  }

  setAlternateTheme() {
    var theme = document.getElementById("theme");
    theme.href = PAHT_ALTERNATE_CSS; 
  }

  updateStyleSheet() {
    if(this.isDefault()) {
      this.setDefaultTheme();
    } else {
      this.setAlternateTheme();
    }
  }
}

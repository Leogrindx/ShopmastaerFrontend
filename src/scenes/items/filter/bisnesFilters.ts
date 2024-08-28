class BussinesLogicFilter {
  parseUrl(url: string, filter: string) {
    /* "-" - divides filter, "=" parametr & value, "," divides value*/
    if (url) {
      const seacrh: any = url
        .split("-")
        .find((e) => e.split("=")[0] === filter);
      if (seacrh) {
        const data: string[] = seacrh.split("=")[1].split(",");
        return data.map((e) => e.replaceAll("_", " "));
      }
    }
  }

  generateDate(e: any, state: string[], val: string) {
    if (e.target.checked) {
      return [...state, val];
    } else {
      return state.filter((e) => e !== val);
    }
  }

  generateUrl(url: string, filter: string, value: string[]) {
    if (url) {
      const urlParam: string[] = url.split("-");
      const index = urlParam.findIndex((e) => e.split("=")[0] === filter);
      if (value.length !== 0) {
        if (index > -1) {
          urlParam[index] = `${filter}=${value
            .map((e) => e.toLowerCase())
            .join(",")}`;
          return urlParam.join("-");
        } else {
          return `${url}-${filter}=${value
            .map((e) => e.toLowerCase())
            .join(",")}`;
        }
      } else {
        if (index > -1) {
          urlParam.splice(index, 1);
          return urlParam.join("-");
        } else {
          return url;
        }
      }
    } else {
      if (value.length > 0) {
        return `${filter}=${value.map((e) => e.toLowerCase()).join(",")}`;
      } else {
        return "";
      }
    }
  }

  checked(val: string, state: string[]) {
    const result = state.find((e) => e.toLowerCase() === val.toLowerCase());
    return result ? true : false;
  }

  sliderAdd(text: string, e: any, clas: string) {
    if (text.length > 11) {
      e.target.classList.add(clas);
      if (text.length > 13) {
        const style = [
          { transform: `translate(0px, 0)` },
          { transform: `translate(-${(text.length - 12) * 10}px, 0)` },
        ];
        const conf = { duration: 2000, iterations: 3 };
        e.target.animate(style, conf);
      }
    }
  }

  sliderRemove(text: string, e: any, clas: string) {
    if (text.length > 11) {
      e.target.classList.remove(clas);
      if (text.length > 13) {
        e.target.animate(
          [
            { transform: `translate(0px, 0)` },
            { transform: `translate(-0px, 0)` },
          ],
          { duration: 2000, iterations: 3 }
        );
      }
    }
  }

  showHide(
    filter: string,
    arrow: string,
    hideArrow: string,
    hideEffect: string,
    hidePanel: string,
    showPanel: string,
    showArrow: string
  ) {
    const panel = document.getElementsByClassName(hideEffect);
    const arrowClass = document.getElementsByClassName(arrow);
    for (let i = 0; i < panel.length; i++) {
      if (panel[i].id === filter) {
        if (arrowClass[i].classList[1] === hideArrow) {
          arrowClass[i].classList.remove(hideArrow);
          arrowClass[i].classList.add(showArrow);
          panel[i].classList.remove(hidePanel);
          panel[i].classList.add(showPanel);
        } else {
          arrowClass[i].classList.remove(showArrow);
          arrowClass[i].classList.add(hideArrow);
          panel[i].classList.remove(showPanel);
          panel[i].classList.add(hidePanel);
        }
      } else {
        arrowClass[i].classList.remove(showArrow);
        arrowClass[i].classList.add(hideArrow);
        panel[i].classList.remove(showPanel);
        panel[i].classList.add(hidePanel);
      }
    }
  }

  percent(val: number) {
    return Math.round(((val - 0) / (10000 - 0)) * 100);
  }

  stylePrice(side: string, min: number, max: number) {
    const range = document.getElementById("range");
    const thumb = document.getElementById(`thumb${side}`);
    if (side === "L")
      thumb?.setAttribute("style", `left: ${this.percent(min)}%;`);
    if (side === "R")
      thumb?.setAttribute("style", `right: ${100 - this.percent(max)}%`);
    range?.setAttribute(
      "style",
      `left: ${this.percent(min)}%; right: ${100 - this.percent(max)}%`
    );
  }
}

export default new BussinesLogicFilter();

export interface FiltersDate {
  title: string;
  value: string[];
  searchWindow?: boolean;
  tougle: string;
  setTougle: (tougle: string) => void;
}

export interface State {
  filter: string;
  value: string[];
}

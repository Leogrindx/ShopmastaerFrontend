export interface FiltersDate {
  title: string;
  value: string[];
  searchWindow?: boolean;
  tougle: string;
  setTougle: (tougle: string) => void;
  state: string[];
  setState: (state: string[]) => void;
}

export interface State {
  filter: string;
  value: string[];
}

export const useFilter = () => {
  const addDeleteValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: string[],
    setState: (state: string[]) => void
  ) => {
    if (e.target.checked) {
      setState([
        ...state,
        e.target.value.toLocaleLowerCase().replaceAll(" ", "_"),
      ]);
    } else {
      setState(
        state.filter(
          (f) => f !== e.target.value.toLocaleLowerCase().replaceAll(" ", "_")
        )
      );
    }
  };
  const checked = (val: string, state: string[]) => {
    const result = state.find((e) => e.toLowerCase() === val.toLowerCase());
    return result ? true : false;
  };

  const sliderAdd = (text: string, e: any, clas: string) => {
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
  };

  const sliderRemove = (text: string, e: any, clas: string) => {
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
  };

  const showHide = (
    filter: string,
    arrow: string,
    hideArrow: string,
    hideEffect: string,
    hidePanel: string,
    showPanel: string,
    showArrow: string
  ) => {
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
  };

  return {
    addDeleteValue,
    sliderAdd,
    sliderRemove,
    checked,
    showHide,
  };
};

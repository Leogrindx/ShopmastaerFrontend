class BussinesLogicFilter {
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
}

export default new BussinesLogicFilter();

export interface State {
  filter: string;
  value: string[];
}

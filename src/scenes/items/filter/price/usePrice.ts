export const usePrice = () => {
  const percent = (val: number) => {
    return Math.round(((val - 0) / (10000 - 0)) * 100);
  };

  const stylePrice = (side: string, min: number, max: number) => {
    const range = document.getElementById("range");
    const thumb = document.getElementById(`thumb${side}`);
    if (side === "L") thumb?.setAttribute("style", `left: ${percent(min)}%;`);
    if (side === "R")
      thumb?.setAttribute("style", `right: ${100 - percent(max)}%`);
    range?.setAttribute(
      "style",
      `left: ${percent(min)}%; right: ${100 - percent(max)}%`
    );
  };
  return { percent, stylePrice };
};

let toggle = true;

export const showMiniCart = () => {
  const miniCart = document.getElementById("miniCart") as HTMLBodyElement;
  const imgMiniCart = document.getElementById("imgMiniCart") as HTMLBodyElement;
  const withPartition = document.getElementById(
    "whitePartition"
  ) as HTMLBodyElement;
  imgMiniCart.style.borderColor = "#000";
  miniCart.style.display = "flex";
  withPartition.style.display = "flex";
  toggle = false;
};

export const hideMiniCart = (sleep: boolean) => {
  const miniCart = document.getElementById("miniCart") as HTMLBodyElement;
  const imgMiniCart = document.getElementById("imgMiniCart") as HTMLBodyElement;
  const withPartition = document.getElementById(
    "whitePartition"
  ) as HTMLBodyElement;
  toggle = true;
  if (sleep) {
    setTimeout(() => {
      if (toggle) {
        imgMiniCart.style.borderColor = "#fff";
        miniCart.style.display = "none";
        withPartition.style.display = "none";
      }
    }, 1000);
  } else {
    if (toggle) {
      imgMiniCart.style.borderColor = "#fff";
      miniCart.style.display = "none";
      withPartition.style.display = "none";
    }
  }
};

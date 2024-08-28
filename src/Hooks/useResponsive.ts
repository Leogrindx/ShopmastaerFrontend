import { useState, useEffect } from "react";
export const useResponsive = () => {
  const windowWith = window.matchMedia("(max-width: 700px)");
  const windowWithMini = window.matchMedia("(max-width: 350px)");
  const [respon, setRepson] = useState(windowWith.matches);
  const [responMini, setRepsonMini] = useState(windowWithMini.matches);
  useEffect(() => {
    setRepson(windowWith.matches);
  }, [windowWith.matches]);
  useEffect(() => {
    setRepsonMini(windowWithMini.matches);
  }, [windowWithMini.matches]);

  return { respon, responMini };
};

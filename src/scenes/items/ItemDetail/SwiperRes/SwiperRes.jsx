import { useState } from "react";
import s from "../ItemDetail.module.scss";
import r from "../ItemDetailResponsive.module.scss";
import { useSwiper, Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames";
import Close from "../../../../components/closeButton/Close";

const ButtonLeft = () => {
  const swiper = useSwiper();
  return (
    <div
      className={classNames(r.arrowZoom, r.right)}
      onClick={() => swiper.slideNext()}
    >
      <div className={classNames(r.partition, r.up)}></div>
      <div className={classNames(r.partition, r.down)}></div>
    </div>
  );
};

const ButtonRight = () => {
  const swiper = useSwiper();
  return (
    <div className={r.arrowZoom} onClick={() => swiper.slidePrev()}>
      <div className={classNames(r.partition, r.up)}></div>
      <div className={classNames(r.partition, r.down)}></div>
    </div>
  );
};

const SwiperRes = (img) => {
  const [zoom, setZoom] = useState(false);
  return (
    <div className={zoom && r.zoom}>
      <Swiper
        spaceBetween={0}
        height={100}
        slidesPerView={1}
        // onSlideChange={(e) => setSliderState(e.activeIndex + 1)}
        onClick={() => setZoom(true)}
      >
        {img.img.map((e, i) => (
          <SwiperSlide key={i} zoom={true}>
            <img
              style={
                zoom
                  ? { width: "100%", height: "100%" }
                  : { width: window.innerWidth, height: 500 }
              }
              src={`${process.env.PUBLIC_URL}${e}`}
            />
          </SwiperSlide>
        ))}
        {zoom && (
          <div className={r.ZoomPanel}>
            <div className={r.arrows}>
              <ButtonRight />
              <ButtonLeft />
            </div>
            <Close setState={setZoom} />
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default SwiperRes;

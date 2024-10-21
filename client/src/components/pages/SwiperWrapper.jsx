import React, { useEffect, useRef, useState } from 'react';
import { register } from 'swiper/element/bundle';


export function Swiper(props) {
  const swiperRef = useRef(null);
  const {
    children,
    virtual,
    ...rest
  } = props;

  const [virtualData, setVirtualData] = useState({
    from: 0,
    to: 0,
    offset: 0,
    slides: [],
  });

  useEffect(() => {
    register();

    const params = {
      ...rest
    };

    if (virtual) {
      params.virtual = {
        enabled: true,
        slides: children,
        renderExternal(vd) {
          setVirtualData(vd);
        },
      };
    }

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  const slides = virtual
    ? virtualData.slides.map((slide, index) =>
        React.cloneElement(slide, {
          key: virtualData.from + index,
          style: {
            [props.direction === "vertical" ? "top" : "left"]:
              virtualData.offset,
          },
          ["data-swiper-slide-index"]: virtualData.from + index,
        })
      )
    : children;
  return (
    <swiper-container init="false" ref={swiperRef}>
      {slides}
    </swiper-container>
  );
}

export function SwiperSlide(props) {
  const {
    children,
    ...rest
  } = props;

  return (
    <swiper-slide {...rest}>
      {children}
    </swiper-slide>
  );
}

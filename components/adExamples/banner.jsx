import { useState, useEffect, useRef } from "react";
import { requestAd, AdTrigger } from "@/api/public";

export const Banner = () => {
  const [adInfo, setAdInfo] = useState({});
  const imgEl = useRef();

  useEffect(() => {
    requestAd().then((res) => {
      if (res) {
        res.AdTrigger = new AdTrigger(res.next);
        setAdInfo(res);
      }
    });
  }, []);

  const isInView = () => {
    if (imgEl.current) {
      const viewWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const {
        top,
        right,
        bottom,
        left,
      } = imgEl.current.getBoundingClientRect();

      return (
        top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
      );
    } else return false;
  };

  const onImgLoad = () => {
    adInfo.AdTrigger.triggerEvent("loaded");
    if (isInView()) {
      adInfo.AdTrigger.triggerEvent("view");
      adInfo.AdTrigger.triggerEvent("focus");
    }
    window.addEventListener("scroll", () => {
      if (isInView()) {
        adInfo.AdTrigger.triggerEvent("view");
        adInfo.AdTrigger.triggerEvent("focus");
      } else {
        adInfo.AdTrigger.triggerEvent("blur");
      }
    });
    window.addEventListener("beforeunload", () => {
      adInfo.AdTrigger.triggerEvent("blur");
      adInfo.AdTrigger.triggerEvent("unload");
    });
  };

  const onImgError = () => {
    adInfo.AdTrigger.triggerEvent("error");
  };

  return (
    <div style={{ width: "300px", minHeight: "150px" }}>
      {adInfo.ad_resources ? (
        <img
          ref={imgEl}
          onLoad={onImgLoad}
          onError={onImgError}
          src={adInfo.ad_resources[0].uri}
        />
      ) : null}
    </div>
  );
};

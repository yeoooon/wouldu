import { AnxiosIcon, EmbarassIcon, GladIcon, HurtIcon, SadIcon, UpsetIcon } from "@components/icons/EmotionIcon";
import { E } from "chart.js/dist/chunks/helpers.core";

export const getEmoji = (emotion: string) => {
  if (emotion === "기쁨") {
    return <GladIcon height={25} />;
  } else if (emotion === "슬픔") {
    return <SadIcon height={25} />;
  } else if (emotion === "분노") {
    return <UpsetIcon height={25} />;
  } else if (emotion === "상처") {
    return <HurtIcon height={25} />;
  } else if (emotion === "당황") {
    return <EmbarassIcon height={25} />;
  } else if (emotion === "불안") {
    return <AnxiosIcon height={25} />;
  } else {
    return null;
  }
};

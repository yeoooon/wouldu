import { AnxiosIcon, EmbarassIcon, GladIcon, HurtIcon, SadIcon, UpsetIcon } from "@components/icons/EmotionIcon";

export interface getEmojiProps {
  data: {[key: number]: string};
  day: number;
}

export const getEmoji = ({data ,day} : getEmojiProps) => {
  if (data[day] === "기쁨") {
    return <GladIcon />
  } else if (data[day] === "슬픔") {
    return <SadIcon />
  } else if (data[day] === "분노") {
    return <UpsetIcon />
  } else if (data[day] === "상처") {
    return <HurtIcon />
  } else if (data[day] === "당황") {
    return <EmbarassIcon />
  } else if (data[day] === "불안") {
    return <AnxiosIcon />
  } else {
    return null
  }
};
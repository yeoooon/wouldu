import { AnxiosIcon, EmbarassIcon, GladIcon, HurtIcon, SadIcon, UpsetIcon } from "@components/icons/EmotionIcon";

export interface getEmojiProps {
  data: {[key: number]: string};
  day: number;
}

export const getEmoji = ({data ,day} : getEmojiProps) => {
  if (data[day] === "기쁨") {
    return <GladIcon height={25} />
  } else if (data[day] === "슬픔") {
    return <SadIcon height={25} />
  } else if (data[day] === "분노") {
    return <UpsetIcon height={25} />
  } else if (data[day] === "상처") {
    return <HurtIcon height={25} />
  } else if (data[day] === "당황") {
    return <EmbarassIcon height={25} />
  } else if (data[day] === "불안") {
    return <AnxiosIcon height={25} />
  } else {
    return null
  }
};
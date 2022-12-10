import { TestEmotionProps } from "./testEmotion";

export interface ResultProps {
  [key: string]: number;
};

export const sumMonthEmotion = (data : TestEmotionProps) => {
  const EmotionArray = Object.values(data);
  const result:ResultProps= {};

  EmotionArray.forEach((x:string) => { 
    result[x] = (result[x] || 0)+1; 
  });

  const sortResult = Object.fromEntries(
    Object.entries(result).sort(([a],[b]) => a < b? -1: 1 )
  );

  return sortResult;
};
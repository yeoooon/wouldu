import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  offscreen: {
    x: -200
  },
  onscreen: {
    x: 50,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.7
    }
  }
};
export const TextVariants: Variants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.9
    }
  }
};
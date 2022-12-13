import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  offscreen: {
    x: -150
  },
  onscreen: {
    x: 50,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.5
    }
  }
};
export const TextVariants: Variants = {
  offscreen: {
    y: 150
  },
  onscreen: {
    y: 50,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.6
    }
  }
};
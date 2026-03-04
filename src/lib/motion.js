export const MOTION = {
  easing: {
    premium: [0.22, 1, 0.36, 1],
    soft: [0.32, 0.72, 0, 1]
  },
  duration: {
    quick: 0.26,
    base: 0.52,
    medium: 0.68,
    slow: 0.9
  },
  stagger: {
    tight: 0.07,
    base: 0.11,
    relaxed: 0.15
  }
};

export const makeContainerVariants = (staggerChildren = MOTION.stagger.base, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const makeRevealVariants = (reduceMotion) => {
  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: MOTION.duration.quick, ease: MOTION.easing.soft }
      }
    };
  }

  return {
    hidden: { opacity: 0, y: 24, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: MOTION.duration.base,
        ease: MOTION.easing.premium
      }
    }
  };
};

export const makeSoftRise = (reduceMotion) =>
  reduceMotion
    ? undefined
    : {
        y: [0, -8, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };

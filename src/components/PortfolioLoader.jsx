import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TITLE = "WELCOME TO MY PORTFOLIO";
const SUBTITLE = "Where Creativity Meets Code";

function PortfolioLoader({ onComplete, onExitStart }) {
  const reduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const words = useMemo(() => TITLE.split(" "), []);

  useEffect(() => {
    const exitDelay = reduceMotion ? 1600 : 4800;
    const exitTimer = window.setTimeout(() => {
      if (typeof onExitStart === "function") onExitStart();
      setIsExiting(true);
    }, exitDelay);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [onExitStart, reduceMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isExiting) return undefined;
    const finishDelay = reduceMotion ? 260 : 1180;
    const finishTimer = window.setTimeout(() => {
      if (typeof onComplete === "function") onComplete();
    }, finishDelay);

    return () => window.clearTimeout(finishTimer);
  }, [isExiting, onComplete, reduceMotion]);

  return (
    <motion.div
      className={`portfolio-loader ${isExiting ? "is-exiting" : ""}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: isExiting ? "104vw" : "0vw"
      }}
      exit={{ opacity: 0 }}
      transition={
        isExiting
          ? { duration: reduceMotion ? 0.24 : 1.1, ease: [0.22, 1, 0.36, 1] }
          : { duration: reduceMotion ? 0.2 : 0.62, ease: [0.16, 1, 0.3, 1] }
      }
      aria-live="polite"
      role="status"
    >
      <div className="loader-stage">
        <div className="loader-copy">
          <motion.h1
            className="loader-message loader-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: isExiting ? -4 : 0
            }}
            transition={{ duration: reduceMotion ? 0.2 : 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="loader-word-wrap"
                initial={{ opacity: 0.24, y: 14, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
                transition={{
                  delay: (reduceMotion ? 0 : 0.22) + index * (reduceMotion ? 0.05 : 0.28),
                  duration: reduceMotion ? 0.14 : 0.92,
                  ease: [0.2, 0.65, 0.3, 1]
                }}
              >
                <span className="loader-word">{word}</span>
                {index < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="loader-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: isExiting ? -3 : 0
            }}
            transition={{
              delay: reduceMotion ? 0.05 : 1.05,
              duration: reduceMotion ? 0.18 : 0.82,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {SUBTITLE}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default PortfolioLoader;

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './ShinyText.css';

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#000000',
  shineColor = '#888888',
  spread = 120,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const dirRef = useRef(direction === 'left' ? 1 : -1);
  const animDur = speed * 1000;
  const delayDur = delay * 1000;

  useAnimationFrame(time => {
    if (disabled || isPaused) { lastTimeRef.current = null; return; }
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
    elapsedRef.current += time - lastTimeRef.current;
    lastTimeRef.current = time;
    const cycleDur = animDur + delayDur;
    const cycleTime = elapsedRef.current % cycleDur;
    if (cycleTime < animDur) {
      const p = (cycleTime / animDur) * 100;
      progress.set(dirRef.current === 1 ? p : 100 - p);
    } else {
      progress.set(dirRef.current === 1 ? 100 : 0);
    }
  });

  useEffect(() => {
    dirRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction]);

  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

  const handleMouseEnter = useCallback(() => { if (pauseOnHover) setIsPaused(true); }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => { if (pauseOnHover) setIsPaused(false); }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <motion.span
      className={`shiny-text ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;

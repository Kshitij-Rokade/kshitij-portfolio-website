import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  
  // Smoothly animated coordinates for the outer ring (trails behind)
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('glass-card')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    // Hide default cursor globally on body when this component mounts
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on mobile or touch devices entirely
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div 
      className="custom-cursor-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      {/* Inner Tech Core (follows exactly) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isVisible ? 1 : 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-3px',
            top: '-3px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#00F0FF', // Neon Cyan
            boxShadow: '0 0 8px 1px #00F0FF',
            zIndex: 2
          }}
        />
      </motion.div>

      {/* Outer Cybernetic Ring (trails slightly) */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isVisible ? 1 : 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: isHovering ? '-18px' : '-12px',
            top: isHovering ? '-18px' : '-12px',
            width: isHovering ? '36px' : '24px',
            height: isHovering ? '36px' : '24px',
            borderRadius: '50%',
            border: `1.5px solid ${isHovering ? '#00F0FF' : 'rgba(0, 112, 243, 0.6)'}`, // Tech Blue transition
            backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
            boxShadow: isHovering ? '0 0 15px rgba(0, 240, 255, 0.2)' : '0 0 8px rgba(0, 112, 243, 0.2)',
            transition: 'width 0.2s, height 0.2s, left 0.2s, top 0.2s, border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
            zIndex: 1
          }}
        />
      </motion.div>
    </div>
  );
}

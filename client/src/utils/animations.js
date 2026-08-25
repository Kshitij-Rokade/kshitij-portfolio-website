export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const heroTextReveal = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.15)',
      '0 0 40px rgba(59, 130, 246, 0.25)',
      '0 0 20px rgba(59, 130, 246, 0.15)'
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export const cardHover3D = {
  hover: {
    scale: 1.02,
    rotateX: 2,
    rotateY: 2,
    y: -5,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

export const skillHover3D = {
  hover: {
    scale: 1.1,
    rotateZ: 2,
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)',
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
};

export const floating3D = {
  animate: {
    y: [0, -10, 0],
    rotateX: [0, 2, 0],
    rotateY: [0, 2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

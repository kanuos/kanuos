import { useRef } from "react";

export const StickyWrapper = ({ children }) => {
  const ref = useRef(null);

  function handleMouseMovement(e) {
    const { current } = ref;
    if (!current) return;

    const { type, pageX, pageY } = e;

    if (type === "mouseleave") {
      current.style.transform = `translate(0px, 0px) scale(1)`;
      return;
    }
    const { width, height, left, top } = current.getBoundingClientRect();

    const cursorX = pageX - left - width / 2;
    const cursorY = pageY - top - height / 2;

    current.style.transform = `translate(${cursorX * 0.3}px, ${
      cursorY * 0.3
    }px) scale(1.02)`;
  }

  return (
    <div
      className="transition-all"
      ref={ref}
      onMouseMove={handleMouseMovement}
      onMouseLeave={handleMouseMovement}
    >
      {children}
    </div>
  );
};

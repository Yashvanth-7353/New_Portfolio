import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(32);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOverText = () => {
      setCursorSize(80); 
    };

    const handleMouseLeaveText = () => {
      setCursorSize(32);
    };

    // Select all text elements
    const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    textElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseOverText);
      el.addEventListener("mouseleave", handleMouseLeaveText);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOverText);
        el.removeEventListener("mouseleave", handleMouseLeaveText);
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-black border-2 border-white rounded-full pointer-events-none mix-blend-difference z-50"
      style={{
        width: cursorSize,
        height: cursorSize,
        // Keep the circle's centre pinned to the pointer; using margins instead of
        // doubling the offset into x/y keeps it aligned when the size changes.
        marginLeft: -cursorSize / 2,
        marginTop: -cursorSize / 2,
      }}
      animate={{ x: cursorPosition.x, y: cursorPosition.y }}
      transition={{ type: "spring", stiffness: 700, damping: 45, mass: 0.4 }}
    />
  );
}

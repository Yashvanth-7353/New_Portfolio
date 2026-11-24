import React from 'react';
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../constants';

export default function Achievements() {
  return (
    <div className="px-5 lg:px-28 min-h-screen flex flex-col justify-center" id="achievements">
      <motion.h2
        className="text-2xl lg:text-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="font-extrabold">Achievements</span>
      </motion.h2>

      <div className="mt-6 lg:mt-16 border-y-2 border-black divide-y-2 divide-black">
        {ACHIEVEMENTS.map((achievement) => (
          <motion.div
            key={achievement.title}
            className="flex items-start gap-3 lg:gap-5 py-4 lg:py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <span
              className="mt-2 lg:mt-2.5 w-2 h-2 shrink-0 rounded-full bg-black"
              aria-hidden="true"
            />

            <div className="flex-1 flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-6">
              <h3 className="font-semibold text-base lg:text-lg lg:w-[26rem] lg:shrink-0">
                {achievement.title}
              </h3>
              <p className="text-[#71717A] font-light text-sm/6 lg:text-base flex-1">
                {achievement.detail}
              </p>
            </div>

            {achievement.link && (
              <a
                href={achievement.link}
                className="shrink-0 hover:text-gray-500 transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open certificate for ${achievement.title}`}
              >
                <TbExternalLink size={20} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

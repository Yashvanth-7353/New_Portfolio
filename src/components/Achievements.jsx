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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-7 lg:mt-16">
        {ACHIEVEMENTS.map((achievement) => (
          <motion.div
            key={achievement.title}
            className="bg-white border-2 border-black rounded-md p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-base lg:text-lg">
                {achievement.title}
              </h3>

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
            </div>

            <p className="text-[#71717A] font-light text-sm/6 lg:text-base mt-3">
              {achievement.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

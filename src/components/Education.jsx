import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';

export default function Education() {
  return (
    <div className="px-5 lg:px-28 min-h-screen flex flex-col justify-center" id="education">
      <motion.h2
        className="text-2xl lg:text-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="hover:text-gray-500">My</span>{" "}
        <span className="font-extrabold hover:text-gray-500">Education</span>
      </motion.h2>

      <div className="mt-7 lg:mt-16 space-y-5 lg:space-y-6">
        {EDUCATION.map((edu) => (
          <motion.div
            key={edu.school}
            className="bg-white border-2 border-black rounded-md p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8">
              <div className="lg:w-[30%] shrink-0">
                <h3 className="font-semibold text-base lg:text-lg">
                  {edu.degree}
                </h3>
                <p className="text-sm lg:text-base mt-1">{edu.school}</p>
              </div>

              <p className="text-[#71717A] font-light text-sm/6 lg:text-base lg:flex-1">
                {edu.desc}
              </p>

              <div className="flex items-center gap-x-6 lg:gap-x-8 shrink-0">
                <span className="text-[#71717A] font-semibold text-xs lg:text-sm whitespace-nowrap">
                  {edu.grade}
                </span>
                <span className="text-[#71717A] font-semibold text-xs lg:text-sm whitespace-nowrap">
                  {edu.year}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

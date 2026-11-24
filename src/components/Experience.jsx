import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "../constants";

export default function Experience() {
  return (
    <div className="bg-black w-full min-h-screen flex flex-col justify-center py-8 lg:py-16" id="experience">
      <motion.h2
        className="text-2xl lg:text-4xl text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="font-extrabold">Experience</span>
      </motion.h2>

      {/* Experience Cards */}
      <div className="px-5 lg:px-28 my-8 lg:mt-16 space-y-10">
        {EXPERIENCE.map((exp) => (
          <motion.div
            key={exp.id}
            className="bg-black p-5 border border-[#D4D4D8] rounded-md hover:bg-[#27272A] transition-all cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <div className="flex justify-between flex-col items-start lg:flex-row lg:items-center">
              <div className="flex items-center gap-5">
                {exp.logo && (
                  <img
                    className="w-7"
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    loading="lazy"
                  />
                )}

                <h2 className="font-semibold text-white text-lg lg:text-xl">
                  {exp.role} at {exp.company}
                </h2>
              </div>

              <span className="text-[#D4D4D8] font-semibold text-sm mt-4 lg:mt-0 lg:text-base">
                {exp.period}
              </span>
            </div>

            {exp.context && (
              <p className="text-[#D4D4D8] mt-4 text-sm/6 lg:text-base font-light">
                {exp.context}
              </p>
            )}

            <ul className="text-[#D4D4D8] mt-6 text-sm/6 lg:text-base font-light space-y-2 list-disc pl-5">
              {exp.description.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

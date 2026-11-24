import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../constants";

export default function Skills() {
  return (
    <div className="px-5 lg:px-28 min-h-screen flex flex-col justify-center" id="skills">
      <motion.h2
        className="text-2xl lg:text-4xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="hover:text-gray-500">My</span>{" "}
        <span className="font-extrabold hover:text-gray-500">Skills</span>
      </motion.h2>

      {/* Skill Categories */}
      <motion.div
        className="mt-5 lg:mt-16 border-y-2 border-black divide-y-2 divide-black"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {SKILL_GROUPS.map((group, index) => (
          <div
            key={group.category}
            className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-8 py-3 lg:py-6"
          >
            <h3 className="flex items-baseline gap-2 lg:gap-3 shrink-0 lg:w-52 font-extrabold text-lg lg:text-xl">
              <span className="text-[#71717A] text-xs lg:text-sm font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              {group.category}
            </h3>

            <div className="flex flex-wrap gap-1.5 lg:gap-3">
              {group.items.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-1.5 lg:gap-2 bg-white border-2 border-black rounded px-2.5 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-semibold hover:bg-black hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Icon className="w-3.5 h-3.5 lg:w-5 lg:h-5 shrink-0" />
                  <span className="min-w-0 lg:whitespace-nowrap">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

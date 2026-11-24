import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '../constants';

export default function About() {
  return (
    <div className="px-5 lg:px-28 flex justify-between flex-col lg:flex-row gap-8 lg:gap-12" id="about">
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img src={ABOUT_CONTENT.image.src} alt={ABOUT_CONTENT.image.alt} />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          <span className="hover:text-gray-500">{ABOUT_CONTENT.title}</span>  <span className="font-extrabold hover:text-gray-500">{ABOUT_CONTENT.subtitle}</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">

{ABOUT_CONTENT.bio}

        </p>


      </motion.div>
    </div>
  );
}

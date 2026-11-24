import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HERO_CONTENT, SOCIAL_LINKS } from "../constants";

export default function Home() {
  return (
    <div className="mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center" id="home">
      <div className="flex justify-between py-10 items-center px-5 lg:px-28 lg:flex-row flex-col-reverse">
        <motion.div
          className="lg:w-[45%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="text-2xl  lg:text-5xl flex flex-col mt-8 lg:mt-0 gap-2 lg:gap-5 text-nowrap"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, ease: "easeInOut" },
              },
            }}
          >
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="hover:text-gray-500" >
              {HERO_CONTENT.greeting}{" "}
              <TypeAnimation
                sequence={HERO_CONTENT.typedSequence}
                speed={10}
                style={{ fontWeight: 600,  }}
                repeat={Infinity}
                
              />
            </motion.h2>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-extrabold hover:text-gray-500">{HERO_CONTENT.role.normal}</span>{" "}
              <span
                className="text-white font-extrabold "
                style={{ WebkitTextStroke: "1px black" }}
              >
                {HERO_CONTENT.role.outlined}
              </span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-[#71717A] text-sm lg:text-base mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {HERO_CONTENT.description}
          </motion.p>

          <motion.div
            className="flex items-center gap-x-5 mt-10 lg:mt-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {SOCIAL_LINKS.map(({ id, icon: Icon, url }) => (
              <motion.a
                key={id}
                href={url}
                className="bg-white p-2 lg:p-3 rounded border-2 border-black"
                whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:w-[55%] w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img className="h-full w-full" src={HERO_CONTENT.image.src} alt={HERO_CONTENT.image.alt} />
        </motion.div>
      </div>
    </div>
  );
}

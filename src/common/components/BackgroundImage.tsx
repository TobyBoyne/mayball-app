import { motion } from "framer-motion";
import Image from "next/image";


const variants = {
  hidden: {opacity: 1, width: "70%"},
  enter: {opacity: 0.3, bottom: 0, width: "30%"}
}

export default function BackgroundImage ({ homepage=false }: { homepage?: boolean }) {

  return (
    <motion.div
      className="bg-gradient-to-r from-teal-300 to-blue-400
        h-screen w-screen -z-50 
        fixed top-0 left-0
        flex items-center justify-center"
    >
      <motion.div
        className="fixed"
        variants={variants}
        initial={homepage ? "hidden" : "enter"}
        animate="enter"
        exit="exit"
        transition={homepage ? {
          delay: 1,
          duration: 1.5
        } : {}}
      >
        <Image src={`/logo.png`}
          layout="responsive"
          width={557}
          height={649}
        />
      </motion.div>
    </motion.div>
  )
}
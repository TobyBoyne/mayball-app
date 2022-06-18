import { motion } from "framer-motion";
import Image from "next/image";

export default function BackgroundImage () {

  return (
    <motion.div
      className="bg-gradient-to-r from-teal-300 to-blue-400
        h-screen w-screen -z-50 
        absolute top-0 left-0"
    >
      {/* <Image src={`/img/${src}.png`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{
          opacity: 0.1
        }}
      /> */}
    </motion.div>
  )
}
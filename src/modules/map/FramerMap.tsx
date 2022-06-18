import Image from 'next/image'
import { MapArea, HeatmapArea } from "./MapArea";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadMapData } from "./fetchMapData";
import { MapDataInterface } from "./mapTypes";
import { GetStaticProps } from "next";
import styles from "./map.module.css"
import MapBackground from "../../../public/site_plan_blank.png"
import { useRouter } from "next/router"

interface MapProps {
  mapData: MapDataInterface[]
  heatmap?: boolean
}

export default function FramerMap ({mapData} : MapProps) {

  const zoom = 3
  const router = useRouter()
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const [selectedElement, setSelectedElement] = useState({name: "", description: "", x: 100, y: 0})

  useEffect(() => {
    console.log(router)
  })

  return (
    <motion.div
      className={styles.map}
      style={{ x: 0}}
      animate={{x: 0, y: 0, scale: 1}}
      transition={{duration:1}}
    >
      <Image
       src={MapBackground}
      />

      <svg
        viewBox="0 0 1300 1000"
        className='absolute w-full h-full top-0'
      >
      {mapData.map((data, index) => {
          return (
            <MapArea key={index} zoom={zoom} 
              activeArea={activeArea} setActiveArea={setActiveArea}
             setSelectedElement={setSelectedElement} {...data.attributes} 
            />
          )
          })}
      </svg>


    </motion.div>

  )

}
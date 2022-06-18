import Image from 'next/image'
import Link from 'next/link';
import { MapArea, HeatmapArea } from "./MapArea";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadMapData } from "./fetchMapData";
import { MapDataInterface } from "./mapTypes";
import { GetStaticProps } from "next";
import styles from "./map.module.css"
import MapBackground from "../../../public/site_plan_blank.png"
import { useRouter } from "next/router"
import { FaSearchMinus } from 'react-icons/fa'

interface MapProps {
  mapData: MapDataInterface[]
  heatmap?: boolean
}

export default function FramerMap ({mapData} : MapProps) {

  const zoom = 3
  const router = useRouter()
  const { area } = router.query

  const [activeArea, setActiveArea] = useState<string | undefined>(area as string)
  const [selectedElement, setSelectedElement] = useState({name: "", description: "", x: 100, y: 0})

  const zoomOut = {x: 1300 / 2, y: 1000 / 2, scale: 1}
  const [zoomPos, setZoomPos] = useState(zoomOut)

  useEffect( () => {
    if (activeArea == undefined) { 
      setZoomPos(zoomOut)
    }
  }, [activeArea])

  return (
    <div
      className={styles.mapContainer}
    >
      <Link href="/map">
        <div className={styles.zoomButton} onClick={() => setActiveArea(undefined)}>
          <FaSearchMinus />
        </div>
      </Link>
    <motion.div
      className={styles.map}
      style={{ 
        // originX: zoomPos.x / 1300, originY: zoomPos.y / 1000,
        width: "600px", height: "calc(600px / 1.3)"
      }}
      animate={{
        x: `calc(${ - zoomPos.x / 13}% + 50%)`, 
        y: `calc(${- zoomPos.y / 10}% + 50%)`, 
        scale: zoomPos.scale,
        originX: zoomPos.x / 1300,
        originY: zoomPos.y / 1000,
      }}
      transition={{
        duration: 1,
      }}
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
             setSelectedElement={setSelectedElement} setZoomPos={setZoomPos}
             {...data.attributes} 
            />
          )
          })}
      </svg>


    </motion.div>
    </div>

  )

}
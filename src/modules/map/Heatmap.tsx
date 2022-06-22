import Image from 'next/image'
import Link from 'next/link';
import { MapArea, HeatmapArea } from "./MapArea";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadMapData, getAreaFromSlug } from "./fetchMapData";
import { MapDataInterface, Selection } from "./mapTypes";
import { GetStaticProps } from "next";
import styles from "./map.module.css"
import MapBackground from "../../../public/site_plan_blank.png"
import { useRouter } from "next/router"
import { FaSearchMinus } from 'react-icons/fa'
import postUpdate from "../../common/postUpdate"

interface MapProps {
  mapData: MapDataInterface[]
  heatmap?: boolean
}

// TODO: Use pinch gesture to zoom out


export default function Heatmap ({mapData} : MapProps) {
  postUpdate()
  const router = useRouter()
  const { area } = router.query
  const [activeArea, setActiveArea] = useState<string | undefined>(area as string)

  return (
  <div 
    className="relative
    flex flex-col items-center"
  >
    {/* Map container */}
    <div
      className={`${styles.mapContainer} ${styles.card}`}
    >
      <Link href="/heatmap" shallow={true}>
        <div className={styles.zoomButton} onClick={() => {
          setActiveArea(undefined)
        }}>
          <FaSearchMinus />
        </div>
      </Link>
      <motion.div
        className={styles.map}
        style={{ 
          // originX: zoomPos.x / 1300, originY: zoomPos.y / 1000,
          width: "100%", aspectRatio: "1.3"
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
              <HeatmapArea key={index}
              {...data.attributes} 
              />
            )
          })}
        </svg>

        
        
      </motion.div>      

    </div>

  </div>
  )

}


function Tooltip ({zoomPos, selectedElement}: {
  zoomPos: {x: number, y: number, scale: number}, 
  selectedElement: Selection | undefined
  }) {
  return (
    <motion.div
        className={`${styles.card} ${styles.tooltip}`}
        style={{
          opacity: typeof selectedElement == "undefined" ? 0 : 1
        }}

        animate={{
          left: `${50 + zoomPos?.scale * (selectedElement?.x as number - zoomPos?.x) / 13 }%`, 
          top:  `calc(${50 + zoomPos?.scale * (selectedElement?.y as number - zoomPos?.y) / 10}% + 5px)`,
          translateX: "-50%"
        }}
      >
        <h2>{selectedElement?.name}</h2>
        <p>{selectedElement?.description}</p>
        {
          (typeof selectedElement?.start !== "undefined") 
          ? <p><em>{selectedElement?.start} - {selectedElement?.end}</em></p>
          : <br />
        }
      </motion.div>
  )
}
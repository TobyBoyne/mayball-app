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

interface MapProps {
  mapData: MapDataInterface[]
  heatmap?: boolean
}

// TODO: Use pinch gesture to zoom out


export default function FramerMap ({mapData} : MapProps) {

  const zoom = 3
  const router = useRouter()
  const { area } = router.query
  const [activeArea, setActiveArea] = useState<string | undefined>(area as string)
  const [selectedElement, setSelectedElement] = useState<Selection | undefined>(undefined)

  const zoomOut = {x: 1300 / 2, y: 1000 / 2, scale: 1}
  const [zoomPos, setZoomPos] = useState(zoomOut)

  useEffect( () => {
    if (activeArea == undefined) { 
      setZoomPos(zoomOut)
      setSelectedElement(undefined)
    }
  }, [activeArea])

  useEffect (() => {
    if (!router.isReady) {return}
    if (typeof area != "object"){
      setActiveArea(area)
    }
  }, [router.isReady])

  const activeAreaDetails = getAreaFromSlug(mapData, activeArea as string)

  return (
  <div 
    className="relative
    flex flex-col items-center"
  >
    {/* Map container */}
    <div
      className={`${styles.mapContainer} ${styles.card}`}
    >
      <Link href="/map">
        <div className={styles.zoomButton} onClick={() => {
          setActiveArea(undefined)
          router.push("/map")
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

      <Tooltip {...{zoomPos, selectedElement}}/>
      

    </div>


    {/* Area detail container */}

    <AnimatePresence exitBeforeEnter>
      {typeof activeArea != "undefined" &&
      <motion.div
        className={`${styles.description} ${styles.card}`}
        exit={{height: 0, paddingBlock: 0}}
      >
        {/* Description Text */}
        <div className="w-2/3">
          <h1>{activeAreaDetails?.name}</h1>
          {activeAreaDetails?.displayName &&
          <h2>'{activeAreaDetails?.displayName}'</h2>
          }
          <div dangerouslySetInnerHTML={{__html: activeAreaDetails?.content}} />
        </div>

        {/* Poster image */}
        <div
          className={`absolute
          w-1/3 h-44 m-0
          right-0 top-4/5
          `}
        >
          <Image
            src={`/img/maitrob.png`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </motion.div>
      }
      </AnimatePresence>


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
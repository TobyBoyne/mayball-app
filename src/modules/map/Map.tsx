/** The entire map.
 * The map contains many MapAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from 'next/image'
import { MapArea, HeatmapArea } from "./MapArea";
import { useState } from "react";
import { motion } from "framer-motion";
import { loadMapData } from "./fetchMapData";
import { MapDataInterface } from "./mapTypes";
import { GetStaticProps } from "next";
import styles from "./map.module.css"
import MapBackground from "../../../public/site_plan_blank.png"


interface MapProps {
  mapData: MapDataInterface[]
  heatmap?: boolean
}


export default function Map ({mapData, heatmap=false} : MapProps) {
  // State used to record zoom level
  const [zoom, setZoom] = useState(1)

  const [selectedElement, setSelectedElement] = useState({name: "", description: "", x: 100, y: 0})

  const [isHeatmap, setIsHeatmap] = useState(heatmap)

  const [activeArea, setActiveArea] = useState<string | null>(null)

  const mapSize = {
    height: 600, width: 600*1.3
  }

  const typesafeSetZoom = (scale: number | undefined) => {
    if (typeof scale == "number") {

      setZoom(scale)
    }
  } 

  return (
    <TransformWrapper
      // ref={ (ref) => {
      //   typesafeSetZoom(ref?.state.scale)} }
      centerZoomedOut={true}
    >

      {({ zoomToElement, resetTransform, ...rest }) => (
        <>        
      <TransformComponent
        wrapperStyle={
          {width: "600px",
          aspectRatio: "1.3",}
        }  
      >
        <Image src={"/site_plan_blank.png"} width={mapSize.width} height={mapSize.height}
          alt="Placeholder image for site plan"
          className="relative"
        />

        {/* <div
          className="absolute"
          id="zoomDiv"
          style={{
            left: `${717 / 13}%`,
            top: `${117 / 10}%`,
            width: `${120 / 13}%`,
            height: `${100 / 10}%`,
            backgroundColor: "red"
          }}
        >
          T
        </div> */}

        <div
          className="absolute"
          id="kenny"
          style={{
            left: `${900 / 13}%`,
            top: `${117 / 10}%`,
            width: `${120 / 13}%`,
            height: `${100 / 10}%`,
            backgroundColor: "red"
          }}
        >
          T
        </div>


        <button onMouseOver={() => zoomToElement("redsquare")}> Buttooloooooooooooooooon </button>


        <MapTooltip {...selectedElement}/>
        <svg 
          className="w-full h-full absolute"
          viewBox="0 0 1300 1000"
          // viewBox="716 131 110 76"
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
      </TransformComponent>
      </>
      )}
    </TransformWrapper>
  )
}


// export function StaticMap({mapData} : MapProps) {
//   // State used to record zoom level
//   const zoom = 8

//   const [selectedElement, setSelectedElement] = useState({name: "", description: "", x: 100, y: 0})

//   const mapSize = {
//     height: 600, width: 600 * 1.3
//   }

//   return (
//     <div 
//       className="relative overflow-hidden"
//       style={{width: "600px",
//       aspectRatio: "1.3"}}
//     >
//       <Image src={MapBackground} width={mapSize.width * 130 / 11} height={mapSize.height * 100 / 15}
//         alt="Placeholder image for site plan"
//         className="absolute"
//         style={{
//           transform:`translateX(0%)`,
//         }}
//       />

//       <MapTooltip {...selectedElement}/>

//       <svg    
//         className="absolute top-0"
//         // viewBox="0 0 1300 1000"
//         viewBox="716 131 110 150"
//         style={{width:600}}
//       >
//         {mapData.map((data, index) => {
//           return (
//             <MapArea key={index} zoom={zoom} activeArea={false} setSelectedElement={setSelectedElement} {...data.attributes} />
//           )
//         })}
//       </svg>
//     </div>
//   )
// }


function MapTooltip ({name, description, x, y}: {name: string, description: string, x: number, y: number}) {
  return (
    <div 
      className={styles.tooltip}
      style={{left: x, top: y}}
    >
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}
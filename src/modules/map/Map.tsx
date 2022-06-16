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

export default function Map ({heatmap=false, mapData} : {mapData: MapDataInterface[], heatmap: boolean}) {
  // State used to record zoom level
  const [zoom, setZoom] = useState(1)

  const [isHeatmap, setIsHeatmap] = useState(heatmap)
  console.log(mapData.filter((a) => a.attributes.name=="Main Stage"))
  const mapSize = {
    height: 1000, width: 1300
  }

  const typesafeSetZoom = (scale: number | undefined) => {
    if (typeof scale == "number") {
      setZoom(scale)
    }
  } 

  return (
    <TransformWrapper
      ref={ (ref)=> typesafeSetZoom(ref?.state.scale) }
    >
      <TransformComponent
        wrapperStyle={
          {width: "max(90%, 1300px)"}
        }  
      >
          <Image src={"/site_plan_blank.png"} width={mapSize.width} height={mapSize.height}
            alt="Placeholder image for site plan"
            className="relative"
          />

          { isHeatmap ? (
            <svg
              className="w-full h-full absolute"
              viewBox="0 0 100 100"
            >
              <filter id="blur"><feGaussianBlur stdDeviation={1} /></filter>
              {/* {mapData.map((data, index:any) => {
                return (
                  <HeatmapArea key={data.name} zoom={zoom} {...data}/>
                )
              })
            } */}

            </svg>
          ) : (
            <svg 
            className="w-full h-full absolute"
            viewBox="0 0 1300 1000" // TODO: configure these values
            // viewBox="-90 0 1300 1000" // TODO: configure these values
            >
            {mapData.map((data, index) => {
              return (
                <MapArea key={index} zoom={zoom} {...data.attributes} />
              )
            })}
            </svg>
          )}
      </TransformComponent>
    </TransformWrapper>
  )
}
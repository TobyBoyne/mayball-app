/** The entire map.
 * The map contains many MapAreas
 */

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from 'next/image'
import { MapArea, HeatmapArea } from "./MapArea";
import { useState } from "react";
import { motion } from "framer-motion";

const mapElements = [
  {
    name: "area1",
    shape: "M 0 30 L 30 30 L 35 50 L 0 50",
    colour: "bg-blue-500",
    capacity: 100,
    pop: 80,
    elements: [
      {
        name: "area1el1",
        shape: {h: 100, w: 100},
        pos: {x: 30, y: 30},
        link: "firstsection",
      }
    ]
  }
]


export default function Map ({heatmap=false}) {
  // State used to record zoom level
  const [zoom, setZoom] = useState(1)

  const [isHeatmap, setIsHeatmap] = useState(heatmap)

  const mapSize = {
    height: 600, width: 1006
  }

  const typesafeSetZoom = (scale: number | undefined) => {
    if (typeof scale == "number") {
      setZoom(scale)
    }
  } 

  // console.log('ref', ref?.state.scale)
  return (
    <TransformWrapper
      ref={ (ref)=> typesafeSetZoom(ref?.state.scale) }>
      <TransformComponent>
          <Image src={"/site_plan.png"} width={mapSize.width} height={mapSize.height}
            alt="Placeholder image for site plan"
            className="relative"
          />

          { isHeatmap ? (
            <svg
              className="w-full h-full absolute"
              viewBox="0 0 100 100"
            >
              <filter id="blur"><feGaussianBlur stdDeviation={1} /></filter>
              {mapElements.map((data, index) => {
                return (
                  <HeatmapArea key={data.name} zoom={zoom} {...data}/>
                )
              })
            }

            </svg>
          ) : (
          mapElements.map((data, index) => {
              return (
                <MapArea key={index} zoom={zoom} {...data} />
              )
            })
          )}
      </TransformComponent>
    </TransformWrapper>
  )
}
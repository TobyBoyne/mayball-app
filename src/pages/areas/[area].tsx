import Layout from '../../common/components/Layout'
import styles from './areastyle.module.css'
import Map from "../../modules/map/Map"
import { loadAreaData, loadMapData } from '../../modules/map/fetchMapData'
import { MapAreaInterface, MapDataInterface } from '../../modules/map/mapTypes'

export default function Area({ mapData, areaData }: {mapData: MapDataInterface[], areaData: MapAreaInterface}) {

  return (
    <Layout title={areaData.name}>
      <h1
        className="text-3xl font-semibold"
      >
        {areaData.displayName}
      </h1>

      <Map mapData={mapData}/>

      <div
        className={styles.area}
        dangerouslySetInnerHTML={{__html: areaData.content}}
      />
    </Layout>
  )
}

export async function getStaticProps({ params } : {params: any}) {
  const mapData = await loadMapData()
  const areaData = await loadAreaData(params.area)
  return { 
    props: {
      mapData,
      areaData
    }, 
    revalidate: 3600 //TODO: reduce revalidation time
  } 
}

export async function getStaticPaths() {
  const mapData = await loadMapData()
  const paths = mapData.map((a) => ({
    params: {area: a.attributes.slug}
  }))

  return {
    paths,
    fallback: false,
  }
}
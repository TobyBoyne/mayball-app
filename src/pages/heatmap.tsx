import Map from '../modules/map/Map'
import Layout from '../common/components/Layout'
import { loadMapData } from '../modules/map/fetchMapData'
import { MapDataInterface } from '../modules/map/mapTypes'

export default function Home ({mapData}: {mapData: MapDataInterface[]}) {
  const mapSize = {
    height: 600, width: 800
  }
  return (
    <Layout title="Heatmap">
      <Map mapData={mapData} heatmap={true}/>
      Home Content
    </Layout>
  )
}

export async function getStaticProps() {
  const mapData = await loadMapData()
  return { props: { mapData }, revalidate: 3600 }
}
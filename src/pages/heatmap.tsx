import Heatmap from '../modules/map/Heatmap'
import Layout from '../common/components/Layout'
import { loadMapData } from '../modules/map/fetchMapData'
import { MapDataInterface } from '../modules/map/mapTypes'

export default function Home ({mapData}: {mapData: MapDataInterface[]}) {
  return (
    <Layout title="Heatmap">
      <Heatmap mapData={mapData}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const mapData = await loadMapData()
  return { props: { mapData }, revalidate: 3600 }
}
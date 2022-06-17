import Layout from '../common/components/Layout'

import Timeline from '../modules/timeline/Timeline'
import { loadMapData } from '../modules/map/fetchMapData'
import { MapDataInterface } from '../modules/map/mapTypes'

export default function TimelinePage({mapData}: {mapData: MapDataInterface[]}) {
  return (
    <Layout title={"Timeline"}>
      <Timeline eventsData={mapData}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const mapData = await loadMapData()
  return { 
    props: { mapData }, 
    revalidate: 3600 //TODO: reduce revalidation time
  } 
}
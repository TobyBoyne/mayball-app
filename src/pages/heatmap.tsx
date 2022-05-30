import Layout from '../common/components/Layout'

import Map from '../modules/map/Map'

export default function HeatmapPage() {
  return (
    <Layout title={"Heatmap"}>
      <Map heatmap={true} />
    </Layout>
  )
}
import type { NextPage } from 'next'
import Map from '../modules/map/Map'
import Layout from '../common/components/Layout'


const Home: NextPage = () => {
  const mapSize = {
    height: 600, width: 800
  }
  return (
    <Layout title="Home">
      <Map />
      Home Content
    </Layout>
  )
}

export default Home

import type { NextPage } from 'next'
import Image from 'next/image'

import Layout from '../common/components/Layout'


const Home: NextPage = () => {
  const mapSize = {
    height: 600, width: 800
  }
  return (
    <Layout title="Home">
      <Image src={`http://placekitten.com/${mapSize.width}/${mapSize.height}`} width={mapSize.width} height={mapSize.height}
      alt="Placeholder image for site plan">

      </Image>
      Home Content
    </Layout>
  )
}

export default Home

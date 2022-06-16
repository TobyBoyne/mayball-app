import Layout from '../../common/components/Layout'
import { useRouter } from 'next/router'
import { loadMapData } from '../../modules/map/fetchMapData'
import { MapAreaInterface } from '../../modules/map/mapTypes'

export default function Area({ area }: {area: MapAreaInterface}) {
  const router = useRouter()
  const { q } = router.query
  return (
    <Layout title={q as string}>
      <p>Text! {area?.name} </p>
    </Layout>
  )
}

export async function getStaticProps({ params } : {params: any}) {
  const mapData = await loadMapData()
  // const area = mapData.filter
  return { 
    props: { 
      area: mapData.filter((area) => {area.attributes.name=="Paddock"}) }, 
    revalidate: 3600 //TODO: reduce revalidation time
  } 
}

export async function getStaticPaths() {
  const mapData = await loadMapData()
  const s = {
    paths: mapData.map((area) => `/areas/${area.attributes.name}`) || [],
    fallback: true,
  }
  console.log(s)
  return {
    paths: mapData.map((area) => `/areas/${area.attributes.name}`) || [],
    fallback: true,
  }
}
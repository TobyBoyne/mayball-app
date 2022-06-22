import qs from "qs"

const apikey = "ca2cbe50de653b44881976c65facd8224afc5f7314564bba193da1c42fd5a32e00f267c92d7a98952b8c3d0ccc2816732977499a2d78c80634d79f73c14f9eb177cdcc923e4902716d7529e62430ca27b5a8b94b0c2634aa856ec33ce1ce4e5525c2ba43714a9c5b008519f67b32315c41b611f8bfa2317a6f56ee3d722f76af"

export default async function postUpdate() {
  const request = qs.stringify({

  })
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
    "X-Auth-Token": apikey},
    body: JSON.stringify({
      "data": {
        "busyness": 5,
      }
    })
  }

  const res = await fetch("https://downingball-cms.herokuapp.com/api/areas/1", requestOptions)
  console.log(res)
  return res
}
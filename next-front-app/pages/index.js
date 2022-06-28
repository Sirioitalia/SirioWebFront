import SetPosts from "@components/Posts/PostSet"
import useApi from "src/hooks/useApi"

const Home = () => {
  const [err, data] = useApi("get", "/users")
  console.log(data)
  return <div></div>
}
export default Home

import Post from "./Post"
import useApi from "src/hooks/useApi"
import ErrorBox from "@components/Misc/ErrorBox"
import { v4 as uuidv4 } from "uuid"

const SetPosts = (props) => {
  const { userId, isPublished = true, postState, setPostState } = props

  const [err, data] = postState
    ? [null, postState]
    : useApi("get", "/furnitures")

  console.log(data)
  return err ? (
    <ErrorBox message={data} />
  ) : (
    <div className="container mx-1/2 flex flex-wrap">
      {Object.values(data).map((post) => (
        <Post key={uuidv4()} {...post} {...props} />
      ))}
    </div>
  )
}
export default SetPosts

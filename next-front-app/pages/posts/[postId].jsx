import { useState, useEffect } from "react"
import AboutUs from "@components/Posts/AboutUs"
import PostSection from "@components/Posts/PostSection"
import ErrorBox from "@components/Misc/ErrorBox"
import { makeClient } from "@services/makeClient"

export const getServerSideProps = async (context) => {
  const { params } = context
  const { postId } = params

  const resPost = await makeClient().get(`/post/${postId}`)
  const resComments = await makeClient().get(`/posts/${postId}/comments`)

  return {
    props: { post: resPost.data, comments: resComments.data },
  }
}

const PostPage = ({ post, comments }) => {
  const [postState, setPostState] = useState(post)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPostState(post)
  }, [])
  return error ? (
    <ErrorBox message={error} />
  ) : (
    <div className="container mx-auto flex flex-wrap py-6">
      <PostSection
        state={postState}
        setState={setPostState}
        comments={comments}
      />
      <AboutUs />
    </div>
  )
}
export default PostPage

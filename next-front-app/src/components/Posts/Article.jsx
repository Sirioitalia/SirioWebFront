import { IoIosRemoveCircle } from "react-icons/io"
import Link from "next/link"
import Image from "next/image"
import { BiEditAlt } from "react-icons/bi"
import Button from "@components/Form/Button"
import { AppContext } from "@components/Context/AppContext"
import { useContext, useState } from "react"
import { MdPublishedWithChanges } from "react-icons/md"
import { makeClient } from "@services/makeClient"
import Modal from "@components/Modal/Modal"
import * as yup from "yup"


const initialValues = 

const validationSchema = yup.object().shape({
  email: yup.string().email().label("Email"),
  displayName: yup.string().label("Display name"),
  password: yup.string().min(8).label("Password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords mismatching"),
})

const Article = (props) => {
  const { state, setState } = props
  const { sessionUserId, sessionRightUser, jwt } = useContext(AppContext)
  const [showEditPost, setShowEditPost] = useState(false)
  const [showRemovePost, setShowRemovePost] = useState(false)

  const isAuthor = (userId) => {
    return Number(userId) === Number(sessionUserId)
  }

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      minute: "numeric",
      hour: "numeric",
      second: "numeric",
    })
  }

  return (
    <article className="flex flex-col shadow my-4">
      <div className="hover:opacity-75">
        <Image src="/postPicture.jpg" width="1000" height="500" />
      </div>
      <div className="bg-white flex flex-col justify-start p-6">
        <div className="text-3xl font-bold hover:text-gray-700 pb-4 flex">
          {state.title}
          {isAuthor(state.userId) || sessionRightUser === "admin" ? (
            <div>
              <Button
                title="Edit post"
                className="bg-green-400 hover:bg-green-500 active:bg-green-600 ml-3 rounded-full"
                onClick={() => {
                  setShowEditPost(true)
                }}
              >
                <BiEditAlt size={20} />
              </Button>
              <Button
                title="Remove post"
                className="bg-red-400 hover:bg-red-500 active:bg-red-600 ml-3 rounded-full"
                onClick={() => {
                  setShowRemovePost(true)
                }}
              >
                <IoIosRemoveCircle size={20} />
              </Button>
              {state.statePost !== "drafted" ? null : (
                <Button
                  title="Publish drafted post"
                  className="bg-sky-400 hover:bg-sky-500 active:bg-sky-600 ml-3 rounded-full"
                  onClick={async () => {
                    const { data } = await makeClient({
                      headers: { authentication: jwt },
                      session: { userId: sessionUserId },
                    }).put(`/posts/${state.id}`, {
                      statePostId: 1,
                      createdAt: Date.now(),
                    })
                    setState(data)
                  }}
                >
                  <MdPublishedWithChanges size={20} />
                </Button>
              )}
            </div>
          ) : null}
        </div>
        <p className="text-sm pb-8">
          By
          <Link
            href={`/users/profil/${state.userId}`}
            className="font-semibold hover:text-gray-800"
          >
            {` ${state.author}`}
          </Link>
          , {`${state.statePost} on ${formattedDate(state.createdAt)}`}
        </p>
        <p className="pb-3">{state.description}</p>
      </div>
      {showEditPost ? (
        <FormModal
          toggleModal={setShowEditPost}
          postInfo={state}
          setData={setState}
          initialValues = {{
            email: "",
            password: "",
            passwordConfirmation: "",
            displayName: "",
          }}
          validationSchema={}
        >
          <FormField
            name="email"
            label="E-mail *"
            type="text"
            placeholder="Enter your email"
          />
          <FormField
            name="displayName"
            label="Display name"
            type="text"
            placeholder="Enter an alias"
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <FormField
            name="passwordConfirmation"
            label="Password confirmation"
            type="password"
            placeholder="Confirm your password"
          />
        </FormModal>
      ) : null}
      {showRemovePost ? (
        <Modal
          title="Remove post"
          method="delete"
          route={`/posts/${state.id}`}
          toggleModal={setShowRemovePost}
        >
          You're about to make an irreverssible action. Do you want to continue
          ?
        </Modal>
      ) : null}
    </article>
  )
}
export default Article

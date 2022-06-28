import { AppContext } from "@components/Context/AppContext"
import { useState, useContext } from "react"
import Button from "@components/Form/Button"
import ErrorBox from "@components/Misc/ErrorBox"
import { makeClient } from "@services/makeClient"
import Router from "next/router"

const Modal = (props) => {
  const {
    children,
    title,
    method,
    route,
    body = {},
    setState = null,
    toggleModal,
    returnedMessage = null,
  } = props
  const [error, setError] = useState(error)
  const { jwt, sessionUserId } = useContext(AppContext)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
            </div>
            {error ? <ErrorBox message={error} /> : null}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {children}
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  toggleModal(false)
                }}
              >
                Abort
              </Button>
              <Button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={async () => {
                  try {
                    const { data } = await makeClient({
                      headers: { authentication: jwt },
                      session: { sessionUserId },
                    })[method](route, body)

                    if (setState) {
                      setState(data)
                    }

                    toggleModal(false)
                    Router.push({
                      pathname: "/",
                      query: {
                        messageInfo: returnedMessage
                          ? returnedMessage
                          : data.message,
                      },
                    })
                  } catch (err) {
                    setError(err.message)
                  }
                }}
              >
                Hell yeah
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
export default Modal

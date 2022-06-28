import { useState, useEffect, useContext } from "react"
import UserProfile from "@components/Profile/UserProfile"
import { makeClient } from "@services/makeClient"
import { AppContext } from "@components/Context/AppContext"
import useApi from "src/hooks/useApi"

const ProfilPage = () => {
  const { sessionUserId } = useContext(AppContext)
  const [err, data] = useApi("get", `/users/${sessionUserId}`)
  const [state, setState] = useState(data)

  useEffect(() => {
    setState(data)
  }, [data])

  return <UserProfile userState={state} setUserState={setState} />
}
export default ProfilPage

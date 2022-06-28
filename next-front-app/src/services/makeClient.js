import axios from "axios"
import deepmerge from "deepmerge"

export const makeClient = (options = {}) =>
  axios.create(
    deepmerge(
      {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      },
      options
    )
  )

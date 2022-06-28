import { MdAccountCircle } from "react-icons/md"
import NavbarField from "./NavbarField.jsx"
import { useContext } from "react"
import { AppContext } from "@components/Context/AppContext.jsx"
import { MdAdminPanelSettings } from "react-icons/md"
import SearchBar from "./SearchBar.jsx"
import { AiOutlineShoppingCart } from "react-icons/ai"

const Navbar = () => {
  const { sessionUserId, sessionRightUser } = useContext(AppContext)

  return typeof window === "undefined" ? null : (
    <nav className="flex items-center flex-wrap bg-white p-3 shadow-lg">
      <NavbarField href="/">
        <div className="text-md text-black font-bold uppercase tracking-wide">
          Sirioitalia
        </div>
      </NavbarField>
      <SearchBar />
      <div className="w-full lg:inline-flex lg:flex-grow lg:w-auto">
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-center  flex flex-col lg:h-auto">
          {sessionRightUser && sessionRightUser === "admin" ? (
            <NavbarField href="/admin/panel">
              <MdAdminPanelSettings title="Admin panel" size={16} />
            </NavbarField>
          ) : null}
          <NavbarField
            className="text-sky-500 hover:text-sky-600"
            href={!sessionUserId ? "/authentication/sign-in" : "/user/profile"}
          >
            <MdAccountCircle size={32} />
          </NavbarField>
          <NavbarField href="/" className="relative">
            <AiOutlineShoppingCart
              size={40}
              className="text-green-400 hover:text-green-500 "
            />
            <div className="absolute rounded-full px-1 text-xs bg-red-500 top-1 left-10">
              1
            </div>
          </NavbarField>
        </div>
      </div>
    </nav>
  )
}
export default Navbar

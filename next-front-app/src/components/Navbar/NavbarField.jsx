import Link from "next/link"
import classnames from "classnames"

const NavbarField = (props) => {
  const { children, href, className } = props
  return (
    <Link href={href}>
      <div
        className={classnames(
          "lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold hover:cursor-pointer",
          className
        )}
      >
        {children}
      </div>
    </Link>
  )
}
export default NavbarField

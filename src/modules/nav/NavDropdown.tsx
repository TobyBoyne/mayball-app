import Link from "next/link";
import { ReactNode, Children, useState } from "react"


type NavDropdownProps = {
  children: ReactNode
  name: string
} 

export default function NavDropdown ({ children, name}: NavDropdownProps) {

  const [show, setShow] = useState(false)

  return (
    <div className="h-full w-full flex text-center" onClick={() => {setShow(!show)}}>
      <ul className="m-auto
      flex flex-col">
        {name}
        {Children.map(children, child => {
          return <li className={`${show ? "block" : "hidden"}
            bg-slate-400
            p-1`} >{child}</li>
        })}
      </ul>
    </div>
  );
 };
 
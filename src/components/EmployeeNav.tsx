import React from "react"
import {ButtonLink} from "./Button"

export default function EmployeeNav(){
    return(
        <div className="flex flex-col alignStart">
        {ButtonLink({classNames: "goBack", text: "Inventory", domain: "/inventory"})}
        {ButtonLink({classNames: "goBack", text: "Employee Shop", domain: "/inventoryShop"})}
        {ButtonLink({classNames: "goBack", text: "Purchase History", domain: "/purchases"})}
        {ButtonLink({classNames: "goBack", text: "Settings", domain: "/settings"})}
        </div>
    )
}
import {useState, useEffect} from "react"
import {ButtonLink,ButtonSubmit} from "../components/Button"
import {handleLogout} from "../hooks/LoginHooks"
import {Link} from "react-router-dom"
import {GetCart} from "../hooks/CartHooks"
import EmployeeNav from "./EmployeeNav"
import {CartItem, nav} from "../middleware/Interfaces"

export default function Nav(props: nav){


    const [cart, setCart] = useState<CartItem[]>();
    const [cartQuantity, setCartQuantity] = useState<number>();

    useEffect(()=>{
        if(localStorage.getItem("email")){
            GetCart((e:CartItem[])=>setCart(e));
        }
    },[])

    useEffect(()=>{
        if(localStorage.getItem("email") && cart?.length){
            let sum:number = 0

            cart.forEach((item:CartItem)=>item.email === localStorage.getItem("email") ? sum += parseInt(item.quantity) : "")

            setCartQuantity(sum);
        }
    },[cart])
    
    return(
        <header>
             <nav className = "flex justifyBetween alignCenter">
                <Link to = "/"><h1>AutoAligners</h1></Link>
            <ul className = "flex alignCenter">
              <li><Link to = "/">{localStorage.getItem("email") ? "Employee Hub" : "Home"}</Link></li>
              {localStorage.getItem("email") ? "" : <li><Link to = "/estimate">Estimate Car Service</Link></li>}
              {localStorage.getItem("email") ? "" : <li><Link to = "/finance">Finance</Link></li>}
              {localStorage.getItem("email") ? 
              <li>
                <EmployeeNav/>
            </li> 
                : <li><Link to = "/employee">Login/Demo</Link></li>}
              {localStorage.getItem("email") ? <li><Link to = "/manageAppointments">Manage Appointments</Link></li> : ""}
              {localStorage.getItem("email") ? <li className = "cart">{cart?.length && cartQuantity ? <span>{cartQuantity}</span> : ""}<Link to = "/cart"><i className = "fa-solid fa-cart-shopping button"></i></Link></li> : ""}

            </ul>
            {localStorage.getItem("email") ? <div>{ButtonSubmit({handleButtonClick: ()=>handleLogout(), text: "Logout"})}</div>: ""}
            {localStorage.getItem("email") ? "" : <div>{ButtonLink({domain: "/reservation", text: "Make Reservation"})}</div>}

            </nav>

            <h2>{props.pageHeading}</h2>
        </header>
     
    )
}
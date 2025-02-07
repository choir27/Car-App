import { handleLogin } from "../Auth/Login";
import {alphabet, symbols} from "../Auth/LoginStatic"
import {handleLogout} from "../Auth/Logout"
import {GenerateNewEmployee} from "../Auth/NewEmployee"
import { updateAccountName, updateAccountPassword, updateAccountEmail, handleDeleteAccount } from "../Auth/UpdateAccount";
import { handleSignUp } from "../Auth/Signup";
export {
    handleSignUp, handleLogin, alphabet, symbols, handleLogout, GenerateNewEmployee, updateAccountEmail, updateAccountName, updateAccountPassword, handleDeleteAccount
}
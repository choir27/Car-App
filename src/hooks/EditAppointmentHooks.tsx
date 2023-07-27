import React from "react"
import {toast} from "react-toastify"
import api from "../api/api"
import {Appointment} from "./ReservationHooks"

export interface ChooseInput{
    defaultValue: string | undefined,
    text1: string, 
    text2:string, 
    name: string, 
    onChange:(e:string)=>void
}

export function ValidateEditInput(props: Appointment):false|undefined{

    const name = /^[A-Za-z]+$/;
    const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(props.firstName && props.lastName){    
        if(!name.test(props.firstName) || !name.test(props.lastName)){
            toast.error("Please input a valid name");
            return false;
        }else if(!mail.test(props.email)){
            toast.error('Please input a valid email');
            return false;
        }
    }else if(props.firstName){
        if(!name.test(props.firstName)){
            toast.error("Please input a valid name");
            return false;
        }else if(!mail.test(props.email)){
            toast.error('Please input a valid email');
            return false;
        }
    }else if(props.lastName){
        if(!name.test(props.lastName)){
            toast.error("Please input a valid name");
            return false;
        }else if(!mail.test(props.email)){
            toast.error('Please input a valid email');
            return false;
        }
    }
  
    alert("Appointment Edited!");

    HandleSubmitData({$id: props.$id, service: props.service, firstName: props.firstName, lastName: props.lastName, date: props.date, time: props.time, carModel: props.carModel, carMake: props.carMake, carYear: props.carYear, email: props.email, phone: props.phone, zipCode: props.zipCode, contact: props.contact, comment: props.comment, stayLeave:props.stayLeave});
}

export function EditChooseTwoInput(props: ChooseInput){
    if(props.defaultValue === props.text2){
        return(
            <div>
                <input type = "radio" value = {props.text1} name = {props.name} onChange = {(e)=>props.onChange(e.target.value)}/>
                <label>{props.text1}</label> 
    
                <input checked type = "radio" value = {props.text2} name = {props.name} onChange = {(e)=>props.onChange(e.target.value)}/>
                <label>{props.text2}</label> 
            </div>
        )
    }else if(props.defaultValue === props.text1){
        return(
            <div>
            <input checked type = "radio" value = {props.text1} name = {props.name} onChange = {(e)=>props.onChange(e.target.value)}/>
            <label>{props.text1}</label> 
    
            <input type = "radio" value = {props.text2} name = {props.name} onChange = {(e)=>props.onChange(e.target.value)}/>
            <label>{props.text2}</label> 
        </div>

        )
   
    }

};

export async function HandleSubmitData(props: Appointment):Promise<void>{       
    try{
        const appointmentData = localStorage.getItem("editAppointmentData") as string;
        const data = JSON.parse(appointmentData);
    
            const formData = {
                "date":props.date || data.date,
                "time":props.time || data.time,
                "carMake":props.carMake || data.carMake,
                "carYear":props.carYear || data.carYear,
                "carModel":props.carModel || data.carModel,
                "stayLeave":props.stayLeave || data.stayLeave,
                "service":props.service || data.service,
                "firstName":props.firstName || data.firstName,
                "lastName":props.lastName || data.lastName,
                "email":props.email || data.email,
                "phone":props.phone || data.phone,
                "zipCode":props.zipCode || data.zipCode,
                "contact":props.contact || data.contact,
                "comment":props.comment || data.comment
            }
    
            console.log(props.$id)
            console.log(formData)
        
            await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, data.$id, formData)
    
            window.location.reload();
    }catch(err){
        console.error(err)
    }
   
}

export async function getEditAppointmentData(){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)


        const findAppointment = data.documents.filter((appointment: Appointment)=>appointment.$id === localStorage.getItem("id"))

        localStorage.setItem("editAppointmentData", JSON.stringify(findAppointment[0]))

    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}

interface EditAppointment{
    Appointment: Appointment
}

export async function handleEditAppointment(props: EditAppointment){
    try{
        if(!ValidateEditInput({
            $id: props.Appointment.$id, 
            service: props.Appointment.service, 
            firstName: props.Appointment.firstName, 
            lastName: props.Appointment.lastName, 
            date: props.Appointment.date, 
            time: props.Appointment.time, 
            carModel: props.Appointment.carModel, 
            carMake: props.Appointment.carMake, 
            carYear:props.Appointment.carYear, 
            email: props.Appointment.email, 
            phone: props.Appointment.phone, 
            zipCode: props.Appointment.zipCode, 
            contact: props.Appointment.contact, 
            comment: props.Appointment.comment, 
            stayLeave:props.Appointment.stayLeave
         })){            
            return;
        }

    }catch(err){
        console.error(err);
    }
} 


export function checkDate(date:string, setWarning: (e:string)=>void):void{
    try{
        const appointmentMonth = parseInt(date.split("D")[0].split("/")[0]);
        const appointmentDay = parseInt(date.split("D")[0].split("/")[1]);
        const appointmentYear = parseInt(date.split("D")[0].split("/")[2]);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth()+1;
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();

        if(appointmentYear < currentYear){
            setWarning("Appointment Date is Expired");
            return;
        }else if(appointmentMonth < currentMonth){
            setWarning("Appointment Date is Expired");
            return;
        }else if(appointmentYear === currentYear && (appointmentMonth < currentMonth)){
            setWarning("Appointment Date is Expired");
            return;
        }else if(appointmentMonth === currentMonth && appointmentDay < currentDay){
            setWarning("Appointment Date is Expired");
            return;
        }

    }catch(err){
        console.log(err);
    }
    
}

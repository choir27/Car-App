import {cacheEditAppointmentData} from "../../middleware/Cache"
import { GetEditAppointmentData } from "../../hooks/hooks/ApiCalls"

export default function EditAppointment(){

    GetEditAppointmentData();
    console.log(cacheEditAppointmentData)
    return (
        <section>

        </section>
    )
}
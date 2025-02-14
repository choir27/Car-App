import { Appointment } from "../../middleware/Interfaces/Reservation";
import { cacheEditAppointmentData } from "../../middleware/Cache";
import api from "../../api/api";

export async function handleEditAppointment(props: Appointment) {
    try {
        const appointmentData = cacheEditAppointmentData as string;
        const data = JSON.parse(appointmentData);
    
        const formData = {
          date: props.date || data.date,
          time: props.time || data.time,
          carMake: props.carMake || data.carMake,
          carYear: props.carYear || data.carYear,
          carModel: props.carModel || data.carModel,
          stayLeave: props.stayLeave || data.stayLeave,
          service: props.service || data.service,
          firstName: props.firstName || data.firstName,
          lastName: props.lastName || data.lastName,
          email: props.email || data.email,
          phone: props.phone || data.phone,
          zipCode: props.zipCode || data.zipCode,
          contact: props.contact || data.contact,
          comment: props.comment || data.comment,
        };
    
        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_COLLECTION_ID,
          data.$id,
          formData,
        );
    
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
}
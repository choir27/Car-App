import api from "../../api/api";

export async function handleDeleteAppointment(id: string | undefined) {
  await api.deleteDocument(
    import.meta.env.VITE_REACT_APP_DATABASE_ID,
    import.meta.env.VITE_REACT_APP_COLLECTION_ID,
    id,
  );
  window.location.reload();
}

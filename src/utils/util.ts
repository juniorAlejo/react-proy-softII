export function formatHour(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDate(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const fecha = date.getFullYear().toString().padStart(2, "0");
  return `${fecha}`;
}

export function formatDateComplete(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const dia = date.getDate().toString().padStart(2, '0'); 
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const año = date.getFullYear(); 
  return `${dia}/${mes}/${año}`;
}

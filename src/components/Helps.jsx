// La función recibe un array de eventos, así como la hora de inicio y la hora de fin del nuevo evento a agregar
// Retorna true si el intervalo de tiempo está disponible, false de lo contrario
export const isTimeSlotAvailable = (events, newEventStart, newEventEnd) => {
    // Recorre todos los eventos existentes
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        // Verifica si el nuevo evento comienza o termina dentro de un evento existente
        if (
            (newEventStart >= eventStart && newEventStart < eventEnd) ||
            (newEventEnd > eventStart && newEventEnd <= eventEnd) ||
            (newEventStart <= eventStart && newEventEnd >= eventEnd)
        ) {
            // Si encuentra que el intervalo de tiempo se superpone con un evento existente, retorna false
            return false;
        }
    }

    // Si el intervalo de tiempo no se superpone con ningún evento existente, retorna true
    return true;
};
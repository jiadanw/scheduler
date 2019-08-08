


export function getAppointmentsForDay(state, day) {
  let appointmentArray = '';
  let result = []
  for (let targetday of state.days) {
    if (targetday.name === day) {
      appointmentArray = targetday.appointments
      for (let appNumber of appointmentArray) {
        result.push(state.appointments[appNumber])
      }
    }
  }
  return result
 }
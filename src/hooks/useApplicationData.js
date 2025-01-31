import { useEffect, useReducer } from "react";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001";


const SET_DAY = "SET_DAY"
const SET_DAYS = "SET_DAYS"
const SET_APPLICATIONS = "SET_APPLICATIONS"
const SET_INTERVIEWERS = "SET_INTERVIEWERS"
const SET_INTERVIEW = "SET_INTERVIEW"
export const INIT_DATA = "INIT_DATA"

export default function useApplicationData() {

  const reducer = function(state, action) {
  // type: "add", value: 3 }
  switch(action.type) {
    case SET_DAY: {

      return {...state, day:action.day}
    } 
    case SET_DAYS: {

      return {...state, days:action.days}
    }
    case SET_APPLICATIONS: {
      return {...state, appointments:action.appointments}
    }
    case SET_INTERVIEWERS: {

      return  {...state, interviewers:action.interviewers}
    }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      return {
        ...state,
        appointments
      }
    }
    case INIT_DATA: {
      return {...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers}
    }
    default : {
      return state
    }
  }
}


const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})



useEffect(() => {
  Promise.all([
    Promise.resolve(axios.get('/api/days')),
    Promise.resolve(axios.get('/api/appointments')),
    Promise.resolve(axios.get('/api/interviewers'))
  ]
  ).then((all) => {
    dispatch({type:"INIT_DATA", days:all[0].data, appointments: all[1].data, interviewers: all[2].data})
  })
}
, [])


for (let stateDay of state.days) {
  const day = stateDay
  let spots = 0;
  for (let appId of day.appointments) {
    if (!state.appointments[appId].interview) {
      spots +=1
    }
  }

  day.spots = spots
}

const bookInterview = function (id, interview) {
  return axios({
    url: `api/appointments/${id}`,
    method: "put",
    data: {
      interview:interview
    }
  }).then(() => {
    
    dispatch({ type: SET_INTERVIEW, id, interview })
    

  })
  }


const deleteInterview = function (id, interview) {
  return axios({
    url: `api/appointments/${id}`,
    method: "delete",
    data: {
    }
  }).then( () => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({type: SET_APPLICATIONS, appointments:appointments})
   

  });
  }

const editInterview = function (id, interview) {

  return axios({
    url: `api/appointments/${id}`,
    method: "put",
    data: {
      interview:interview
    }
  }).then( () => {
    const appointment = {
      ...state.appointments[id],
      interview: interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({type: SET_APPLICATIONS, appointments:appointments});

  });
  }
  return {
    state,
    dispatch,
    bookInterview,
    deleteInterview,
    editInterview
  }

}
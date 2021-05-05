const axios = require("axios");
const Helpers = require("./Helpers");
console.log('Helpers: ', Helpers);
const fetchVaccine = async (pincode,date) => {
    console.log('Helpers: ', Helpers);
    try {
        const findIfAvailable = (centers) => {
            // console.log(centers);
            const filteredCenters = centers.filter((center) => {
              const filteredSessions = filterSessions(center.sessions);
              return filteredSessions.length > 0;
            });
            return filteredCenters;
          };
          
          const filterSessions = (sessions) => {
            return sessions.filter(
              (session) => session.available_capacity > 0 && session.min_age_limit === 18
            );
          };
        
        const response = await axios({
          method: "GET",
          url:
            "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin",
          params: {
            pincode: pincode,
            date,
          },
        });
      
        const availableCenters = findIfAvailable(response.data.centers);
      
        let dataToSend = [];
        if (availableCenters.length > 0) {
          dataToSend = availableCenters.map((center) => {
            const filteredSessions = filterSessions(center.sessions);
            const availableSessions = filteredSessions.map((session) => {
              return {
                date: session.date,
                available: session.available_capacity,
              };
            });
            return {
              name: center.name,
              availableSessions,
            };
          });
        }
        return dataToSend;
    } catch (error) {
        console.log('error::::',error)
    }
};
module.exports = fetchVaccine;

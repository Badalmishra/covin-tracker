
const moment = require("moment");
const fetchVaccine = require("./fetchVaccine");



const findForNDays = async ({numberOfDays,pincode}) => {
  const response={}
  const shouldSendMail = false
  for (let index = 0; index < numberOfDays; index++) {
    const date = moment().add(index, "day").format("DD-MM-YYYY");
    const data = await fetchVaccine(pincode, date);
    response[date] = data && data.length > 0 ? data : "No avaiable center";
    if (data && data.length > 0) {
        shouldSendMail = true
    }
  }  
  return {response,shouldSendMail}
};
const Helpers ={
    findForNDays
  };

  module.exports = { ...Helpers}

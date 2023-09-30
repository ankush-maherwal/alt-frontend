import { studentBulk } from "routes/links";
import axios from "axios";

const studentBulkAPI = async (student) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  let result;
  await axios({
    method: "POST",
    url: studentBulk,
    data: student,
    headers: headers,
  })
    .then((res) => {
      console.log(res);

      const names = res.data.errors.map((error) => error.name).filter(Boolean);
      if (res.data.errors && res.data.errors.length > 0) {
        const firstError = res.data.errors[0];
        if (firstError.studentRes && firstError.studentRes.errorMessage) {
          const errorMessage = firstError.studentRes.errorMessage;
          localStorage.setItem("errorMessage", errorMessage);
        } else {
          console.log("No error message found in the first error object.");
        }
      } else {
        console.log("No errors in the response data.");
      }

      localStorage.setItem("bulkErrors", res.data.errors.length - 1);
      localStorage.setItem("bulkErrorsNames", names);
      localStorage.setItem("successCount", res.data.successCount);

      if (res.status === 201) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch(function (error) {
      console.log(error.response.data.error);
      let err = 0;
      return err;
    });

  return result;
};

export default studentBulkAPI;

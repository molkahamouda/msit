import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthProvider";
import { baseUrl } from "../config/config";

const useForms = () => {
  const [forms, setForms] = useState([]);
  // const { isAuthenticated } = useContext(AuthContext);
 const  isAuthenticated  = ""
  useEffect(() => {
    getMyForms();
  }, [isAuthenticated]);

  const getMyForms = async () => {
    const userid = isAuthenticated?.data?.id;
    try {
      const response = await axios.get(
        `${baseUrl}/api/forms/getMyForms/${userid}`
      );
      setForms(response.data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  const deleteById = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/forms/delete/${id}`);
      getMyForms();
    } catch (error) {
      console.error("Failed to delete form:", error);
    }
  };

  return { forms, deleteById };
};

export default useForms;

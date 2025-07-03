import { useState, useEffect } from "react";
import axios from "axios";

const useGet = (endpoint, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted components
    setLoading(true);
    console.log(`${API_BASE_URL}/${endpoint}`);
    axios
      .get(`http://localhost:8765/api/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        if (isMounted) {
          console.log(resp);
          setData(resp.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [endpoint, token]);

  return { data, loading, error };
};

export default useGet;
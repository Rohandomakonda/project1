import { useState, useEffect } from "react";
import axios from "axios";

const usePost = (endpoint, token,payload,params={}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted components
    setLoading(true);

    axios
      .post(`http://localhost:8080/${endpoint}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        params: params, 
      })
      .then((resp) => {
        setData(resp.data);
        alert("success");
      })
      .catch((err) => {
        alert("postError " + err);
        alert("error");
      });

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [endpoint, token]);

  return { data, loading, error };
};

export default usePost;

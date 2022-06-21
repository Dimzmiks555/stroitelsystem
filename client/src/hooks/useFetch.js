import { useState, useEffect } from "react";

const useFetch = (url, options) => {

  const [status, setStatus] = useState({
    loading: false,
    data: null,
    error: null
  });

  function fetchNow(url, options) {
    setStatus({ loading: true });
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setStatus({ loading: false, data: res.data });
      })
      .catch((error) => {
        setStatus({ loading: false, error });
      });
  }

  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  }, []);

  return { ...status, fetchNow };
}

export default useFetch
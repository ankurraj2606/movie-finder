// hooks/useFetch.js
import { useState, useEffect } from "react";

const useFetch = (url, options, page) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const fullUrl = page
          ? url.includes("?")
            ? `${url}&page=${page}`
            : `${url}?page=${page}`
          : url;

        const response = await fetch(fullUrl, options);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        console.error("useFetch error:", err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, page, JSON.stringify(options || {})]);

  return { data, isLoading, setIsLoading };
};

export { useFetch };

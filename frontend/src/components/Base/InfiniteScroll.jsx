import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const InfiniteScrollExample2 = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`
      );

      // Check if the response array is empty, indicating no more items
      if (response.data.length > 0) {
        setItems((prevItems) => [...prevItems, ...response.data]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <div className='container'>
      <div className='row'>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </div>
      {isLoading && 'loading......'}
    </div>
  );
};

export default InfiniteScrollExample2;

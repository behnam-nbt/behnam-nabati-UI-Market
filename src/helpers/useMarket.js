import { useEffect, useState } from 'react';
import axios from 'axios';

const getRandomPrice = () => +(Math.random() * 1000 + 10).toFixed(2); // Generate a random price between $10 and $1010

const getRandomChange = () => +(Math.random() * 6 - 3).toFixed(2); // Generate a random percentage change between -3% and +3%

// Add price, change percent, and rank to each coin object
const enrichData = (data) =>
  data.map((coin, index) => ({
    ...coin,
    price: getRandomPrice(),
    priceChangePercent: getRandomChange(),
    rank: index + 1,
  }));

const useMarket = () => {
  // State to store market data, loading, and errors
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch of market data from local JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/constants/data.json');

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format: expected an array');
        }

        // Add synthetic data like price and change %
        const enriched = enrichData(response.data);
        setMarkets(enriched);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch market data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simulate price updates every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prevMarkets) => {
        // Update each coin's price and percent change
        const updated = prevMarkets.map((coin) => {
          const changePercent = getRandomChange();
          const newPrice = +(coin.price * (1 + changePercent / 100)).toFixed(2);

          return {
            ...coin,
            price: newPrice,
            priceChangePercent: changePercent,
          };
        });

        // Re-sort coins by price (descending) and reassign ranks
        const sorted = [...updated].sort((a, b) => b.price - a.price);
        return sorted.map((coin, idx) => ({ ...coin, rank: idx + 1 }));
      });
    }, 4000); // Update every 4 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Return the market data, loading status, and error (if any)
  return { markets, loading, error };
};

export default useMarket;

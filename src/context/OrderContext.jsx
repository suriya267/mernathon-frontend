import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { getAuthToken } from "../utils/localStorage";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    const token = getAuthToken();

    if (!token) {
      console.error("No token found. User may not be authenticated.");
      return;
    }

    try {
      const response = await axiosInstance.get(`/order`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
    }
  };

  const placeOrder = async (shippingAddress) => {
    try {
      const response = await axiosInstance.post(`/order`, { shippingAddress });
      return response.data;
    } catch (error) {
      toast.error(
        "Failed to place order: " +
        (error.response?.data?.error || error.message)
      );
      throw error;
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, fetchUserOrders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

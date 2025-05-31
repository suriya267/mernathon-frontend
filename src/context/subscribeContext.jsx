import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const SubscribeContext = createContext();

const SubscribeContextProvider = ({ children }) => {
    const [form, setForm] = useState({ email: "" });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (form.email !== "") {
                await axiosInstance.post(`/subscribe`, form);
            }

        } catch (error) {
            alert(error.response?.data?.message || "Server error");
        }
    }

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const value = {
        form,
        onChange,
        onSubmitHandler,
    };

    return (
        <SubscribeContext.Provider value={value}>
            {children}
        </SubscribeContext.Provider>
    );
};

export default SubscribeContextProvider;

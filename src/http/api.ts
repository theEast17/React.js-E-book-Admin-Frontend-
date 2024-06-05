import useTokenStore from "@/store";
import axios from "axios";

// import.meta.env.BASE_URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config)=>{
  const token=useTokenStore.getState().token;
  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
  return config
})

export const loginData = async (data: { email: string; password: string }) => {
  return api.post("/users/login", data);
};

export const registerData = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/users/register", data);
};

export const getBooks = async () => {
  return api.get("/books");
};
export const createBooks = async (data: FormData) => {
  return api.post("/books/create",data,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  });
};

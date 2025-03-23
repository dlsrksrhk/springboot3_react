import { CarResponse, Car, CarEntry } from "../types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

axios.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // 401 에러 발생 시 /index 로 이동
      window.location.href = "/";
    }
    return Promise.reject(error); // 에러는 그대로 전달
  }
);

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    getAxiosConfig()
  );
  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    getAxiosConfig()
  );
  return response.data;
};

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(
    carEntry.url,
    carEntry.car,
    getAxiosConfig()
  );
  return response.data;
};

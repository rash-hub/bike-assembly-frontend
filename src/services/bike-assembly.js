import rootInstance from "../utils/config/axios-config";
import { SOMETHING_WENT_WRONG } from "../utils/constants";

export const fetchBikeAssembly = async (
  page,
  rowsPerPage,
  searchValue,
  from,
  to
) => {
  try {
    const response = await rootInstance.get(
      `bike-assemblies?page=${
        Number(page) + 1
      }&limit=${rowsPerPage}&searchValue=${searchValue}&from=${from}&to=${to}`
    );
    if (response?.data?.success && response?.data?.data) {
      return {
        success: true,
        data: response?.data?.data,
      };
    } else {
      return {
        success: false,
        data: response?.data?.message || SOMETHING_WENT_WRONG,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

export const createBikeAssembly = async (values) => {
  try {
    const response = await rootInstance.post(`bike-assembly/`, values);
    if (response?.data?.success) {
      return {
        success: true,
        data: response?.data?.message,
      };
    } else {
      return {
        success: false,
        data: response?.data?.message || SOMETHING_WENT_WRONG,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

export const updateBikeAssembly = async (id, values) => {
  try {
    const response = await rootInstance.put(`bike-assembly/${id}`, values);
    if (response?.data?.success) {
      return {
        success: true,
        data: response?.data?.message,
      };
    } else {
      return {
        success: false,
        data: response?.data?.message || SOMETHING_WENT_WRONG,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

export const deleteBikeAssembly = async (id) => {
  try {
    const response = await rootInstance.delete(`bike-assembly/${id}`);
    if (response?.data?.success) {
      return {
        success: true,
        data: response?.data,
      };
    } else {
      return {
        success: false,
        data: response?.data?.message || SOMETHING_WENT_WRONG,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

export const fetchAllBikeAssembly = async () => {
  try {
    const response = await rootInstance.get(`bike-assemblies/all`);
    if (response?.data?.success && response?.data?.data) {
      return {
        success: true,
        data: response?.data?.data,
      };
    } else {
      return {
        success: false,
        data: response?.data?.message || SOMETHING_WENT_WRONG,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

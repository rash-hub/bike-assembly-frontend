import rootInstance from "../utils/config/axios-config";
import { SOMETHING_WENT_WRONG } from "../utils/constants";

export const fetchAllEmployees = async (page, rowsPerPage, searchValue) => {
  try {
    const response = await rootInstance.get(
      `employees?page=${
        Number(page) + 1
      }&limit=${rowsPerPage}&searchValue=${searchValue}`
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

export const updateEmployee = async (id, values) => {
  try {
    const response = await rootInstance.put(`employee/${id}`, values);
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
    if (err.response.status === 400) {
      return {
        success: false,
        data: err?.response?.data?.message,
      };
    }
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

export const viewEmployee = async (id) => {
  try {
    const response = await rootInstance.get(`employee/${id}`);
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

export const deleteEmployee = async (id) => {
  try {
    const response = await rootInstance.delete(`employee/${id}`);
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

export const createEmployee = async (values) => {
  try {
    const response = await rootInstance.post(`employee/`, values);
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
    if (err.response.status === 400) {
      return {
        success: false,
        data: err?.response?.data?.message,
      };
    }
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

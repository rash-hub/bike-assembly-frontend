import rootInstance from "../utils/config/axios-config";
import { SOMETHING_WENT_WRONG } from "../utils/constants";

export const fetchBikes = async (page, rowsPerPage, searchValue) => {
  try {
    if (!(page || rowsPerPage || searchValue)) {
      const response = await rootInstance.get(`bikes`);
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
    } else {
      const response = await rootInstance.get(
        `bikes?page=${
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
    }
  } catch (err) {
    return {
      success: false,
      data: err?.message || SOMETHING_WENT_WRONG,
    };
  }
};

export const createBike = async (values) => {
  try {
    const response = await rootInstance.post(`bike/`, values);
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

export const updateBike = async (id, values) => {
  try {
    const response = await rootInstance.put(`bike/${id}`, values);
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

export const deleteBike = async (id) => {
  try {
    const response = await rootInstance.delete(`bike/${id}`);
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

export const fetchAllBikes = async () => {
  try {
    const response = await rootInstance.get(`bikes/all`);
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

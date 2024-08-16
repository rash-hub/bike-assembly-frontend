import adminRootInstance from "../../utils/config/admin-axios-config";
import { SOMETHING_WENT_WRONG } from "../../utils/constants";

export const fetchBikes = async (page, rowsPerPage, searchValue) => {
  try {
    if (!(page || rowsPerPage || searchValue)) {
      const response = await adminRootInstance.get(`bikes`);
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
      const response = await adminRootInstance.get(
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
    const response = await adminRootInstance.post(`bike/`, values);
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
    const response = await adminRootInstance.put(`bike/${id}`, values);
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
    const response = await adminRootInstance.delete(`bike/${id}`);
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
    const response = await adminRootInstance.get(`bikes/all`);
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

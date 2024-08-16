import adminRootInstance from "../../utils/config/admin-axios-config";
import { SOMETHING_WENT_WRONG } from "../../utils/constants";

export const fetchShifts = async (page, rowsPerPage, searchValue) => {
  try {
    if (!(page || rowsPerPage || searchValue)) {
      const response = await adminRootInstance.get(`shifts`);
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
        `shifts?page=${
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

export const createShift = async (values) => {
  try {
    const response = await adminRootInstance.post(`shift/`, values);
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

export const updateShift = async (id, values) => {
  try {
    const response = await adminRootInstance.put(`shift/${id}`, values);
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

export const deleteShift = async (id) => {
  try {
    const response = await adminRootInstance.delete(`shift/${id}`);
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

export const fetchAllShifts = async () => {
  try {
    const response = await adminRootInstance.get(`shifts/all`);
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

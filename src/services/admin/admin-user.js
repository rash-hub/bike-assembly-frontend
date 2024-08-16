import adminRootInstance from "../../utils/config/admin-axios-config";
import { SOMETHING_WENT_WRONG } from "../../utils/constants";

export const fetchAllAdminUsers = async (page, rowsPerPage, searchValue) => {
  try {
    const response = await adminRootInstance.get(
      `admin-users?page=${
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

export const updateAdminUser = async (id, values) => {
  try {
    const response = await adminRootInstance.put(`admin-user/${id}`, values);
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

export const viewAdminUser = async (id) => {
  try {
    const response = await adminRootInstance.get(`admin-user/${id}`);
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

export const deleteAdminUser = async (id) => {
  try {
    const response = await adminRootInstance.delete(`admin-user/${id}`);
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

export const createAdminUser = async (values) => {
  try {
    const response = await adminRootInstance.post(`admin-user/`, values);
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

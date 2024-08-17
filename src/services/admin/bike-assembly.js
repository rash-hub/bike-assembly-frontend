import adminRootInstance from "../../utils/config/admin-axios-config";
import { SOMETHING_WENT_WRONG } from "../../utils/constants";

export const fetchBikeAssembly = async (page, rowsPerPage, searchValue) => {
  try {
    if (!(page || rowsPerPage || searchValue)) {
      const response = await adminRootInstance.get(`bike-assemblies`);
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
        `bike-assemblies?page=${
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

export const createBikeAssembly = async (values) => {
  try {
    const response = await adminRootInstance.post(`bike-assembly/`, values);
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
    const response = await adminRootInstance.put(`bike-assembly/${id}`, values);
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
    const response = await adminRootInstance.delete(`bike-assembly/${id}`);
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
    const response = await adminRootInstance.get(`bike-assemblies/all`);
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

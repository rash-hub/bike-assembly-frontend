import adminRootInstance from "../../utils/config/admin-axios-config";
import { SOMETHING_WENT_WRONG } from "../../utils/constants";

export const adminLogin = async (values) => {
  try {
    const response = await adminRootInstance.post(`login`, values);
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
    if (err.response.status === 401) {
      return {
        success: false,
        data: err?.response?.data?.message,
      };
    } else if (err.response.status === 404) {
      return {
        success: false,
        data: err?.response?.data?.message,
      };
    } else {
      return {
        success: false,
        data: err?.message || SOMETHING_WENT_WRONG,
      };
    }
  }
};

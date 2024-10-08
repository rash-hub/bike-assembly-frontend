import moment from "moment";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export const checkTokenValidity = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken || !refreshToken) {
    return null;
  }
  const accessTokenData = jwtDecode(accessToken);
  const refreshTokenData = jwtDecode(refreshToken);

  if (!moment.unix(accessTokenData.exp).isAfter(moment().add(5, "minutes"))) {
    if (moment.unix(refreshTokenData.exp).isAfter(moment())) {
      return await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/refresh-token`, {
          token: refreshToken,
        })
        .then((res) => {
          const tokenInfo = jwtDecode(res.data.data.authToken.token);
          localStorage.setItem("accessToken", res.data.data.authToken.token);
          localStorage.setItem(
            "refreshToken",
            res.data.data.refreshToken.token
          );
          return tokenInfo.data;
        })
        .catch((err) => {
          return null;
        });
    } else {
      return null;
    }
  }

  return accessTokenData.data;
};

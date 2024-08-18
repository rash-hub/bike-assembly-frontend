import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { startLoading, stopLoading } from "../../redux/Slices/CommonSlice";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import "./Common.scss";
import * as Yup from "yup";
import { DARK_GREEN } from "../../utils/constants";
import { adminLogin } from "../../services/login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .max(50, "Email must be at most 50 characters"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        isAdmin: true,
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        dispatch(startLoading());
        const response = await adminLogin(values);
        if (response.success) {
          dispatch(stopLoading());
          localStorage.setItem("accessToken", response?.data?.authToken?.token);
          localStorage.setItem(
            "refreshToken",
            response?.data?.refreshToken?.token
          );
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          navigate(
            response?.data?.user.title === "EMPLOYEE"
              ? "/employee/bike-assembly/all"
              : `/admin/bike-assembly/all`
          );
        } else {
          dispatch(stopLoading());
          enqueueSnackbar(response?.data, { variant: "error" });
        }
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        touched,
      }) => {
        return (
          <div className="Login">
            <Paper sx={{ padding: "20px" }} elevation={4}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="form"
              >
                <Grid container spacing={2}>
                  <Grid item md={12} display={"flex"} justifyContent={"center"}>
                    <Typography variant="h4" component="h2" color={DARK_GREEN}>
                      Login
                    </Typography>
                  </Grid>
                  <Grid item md={12} display={"flex"} justifyContent={"center"}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="isAdmin-label"
                        name="isAdmin"
                        onChange={handleChange}
                        defaultValue={true}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Admin"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="Employee"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      label="Email *"
                      fullWidth
                      size="small"
                      value={values?.email}
                      onChange={handleChange}
                      name="email"
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    ></TextField>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      label="Password *"
                      fullWidth
                      size="small"
                      value={values?.password}
                      onChange={handleChange}
                      name="password"
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    ></TextField>
                  </Grid>
                  <Grid item md={12} display={"flex"} justifyContent={"center"}>
                    <Button
                      type="submit"
                      variant="contained"
                      className="submit__button"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;

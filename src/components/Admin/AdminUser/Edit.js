import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/Slices/CommonSlice";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { updateAdminUser } from "../../../services/admin/admin-user";
import { DARK_GREEN } from "../../../utils/constants";

const Edit = (props) => {
  const { editModal, setEditModal, modalData, fetchData } = props;
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .max(30, "First name must be at most 30 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .max(30, "Last name must be at most 30 characters"),
    email: Yup.string()
      .required("Last name is required")
      .email("Invalid email format")
      .max(50, "Email must be at most 50 characters"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^\d{5,16}$/, "phone must be a number up to 16 digits"),
  });

  return (
    <Modal
      open={editModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          outline: "none",
        }}
      >
        <Formik
          initialValues={{
            firstName: modalData?.firstName || "",
            lastName: modalData?.lastName || "",
            email: modalData?.email || "",
            phone: modalData?.phone || "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            dispatch(startLoading());
            const result = await updateAdminUser(modalData?.id, values);
            if (result.success) {
              dispatch(stopLoading());
              fetchData();
              setEditModal(false);
              enqueueSnackbar(result?.data, { variant: "success" });
            } else {
              dispatch(stopLoading());
              enqueueSnackbar(result?.data, { variant: "error" });
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
              <form onSubmit={handleSubmit} className="form">
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography
                      fontWeight={600}
                      align="center"
                      color={DARK_GREEN}
                    >
                      Edit Admin User
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="First Name *"
                      fullWidth
                      size="small"
                      value={values?.firstName}
                      onChange={handleChange}
                      name="firstName"
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    ></TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Last Name *"
                      fullWidth
                      size="small"
                      value={values?.lastName}
                      onChange={handleChange}
                      name="lastName"
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    ></TextField>
                  </Grid>
                  <Grid item md={6}>
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
                  <Grid item md={6}>
                    <TextField
                      label="phone *"
                      fullWidth
                      size="small"
                      value={values?.phone}
                      onChange={handleChange}
                      name="phone"
                      onBlur={handleBlur}
                      inputProps={{ maxLength: 12 }}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    ></TextField>
                  </Grid>
                  <Grid item md={12}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditModal(false);
                        }}
                        className="cancel__button"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        className="submit__button"
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default Edit;

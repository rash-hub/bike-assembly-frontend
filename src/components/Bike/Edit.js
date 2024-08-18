import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Slices/CommonSlice";
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
import { DARK_GREEN } from "../../utils/constants";
import { updateBike } from "../../services/bike";

const Edit = (props) => {
  const { editModal, setEditModal, modalData, fetchData } = props;
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(30, "Name must be at most 30 characters"),
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
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          outline: "none",
        }}
      >
        <Formik
          initialValues={{
            name: modalData?.name || "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            dispatch(startLoading());
            const result = await updateBike(modalData?.id, values);
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
                      Edit Bike
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      label="Name *"
                      fullWidth
                      size="small"
                      value={values?.name}
                      onChange={handleChange}
                      name="name"
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
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

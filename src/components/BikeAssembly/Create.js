import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Slices/CommonSlice";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { DARK_GREEN } from "../../utils/constants";
import { fetchAllBikes } from "../../services/bike";
import { useEffect, useState } from "react";
import { createBikeAssembly } from "../../services/bike-assembly";

const Create = (props) => {
  const { createModal, setCreateModal, fetchData } = props;
  const dispatch = useDispatch();
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchAllBikes();
      if (response.success) {
        setBikes(response.data);
      } else {
        enqueueSnackbar(response?.data, { variant: "error" });
      }
    })();
  }, []);

  const validationSchema = Yup.object({
    bikeId: Yup.string().required("Bike is required"),
    timeTaken: Yup.string().required("Time is required"),
  });

  return (
    <Modal
      open={createModal}
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
            bikeId: "",
            timeTaken: "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            dispatch(startLoading());
            const result = await createBikeAssembly(values);
            if (result.success) {
              dispatch(stopLoading());
              fetchData();
              setCreateModal(false);
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
                      Create Bike Assembly
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl
                      size="small"
                      fullWidth
                      error={touched.bikeId && Boolean(errors.bikeId)}
                    >
                      <InputLabel id="bike-label">Bike *</InputLabel>
                      <Select
                        labelId="bike-label"
                        label="Bike *"
                        value={values?.bikeId || ""}
                        onChange={handleChange}
                        name="bikeId"
                        onBlur={handleBlur}
                      >
                        {bikes.map((bike) => (
                          <MenuItem key={bike?.name} value={bike?.id}>
                            {bike?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.bikeId && errors.bikeId && (
                        <FormHelperText>{errors.bikeId}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl
                      size="small"
                      fullWidth
                      error={touched.timeTaken && Boolean(errors.timeTaken)}
                    >
                      <InputLabel id="time-label">Time Taken *</InputLabel>
                      <Select
                        labelId="time-label"
                        label="Time Taken *"
                        value={values?.timeTaken || ""}
                        onChange={handleChange}
                        name="timeTaken"
                        onBlur={handleBlur}
                      >
                        {["50 Minutes", "1 hour", "1 hour 20 minutes"].map(
                          (time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      {touched.timeTaken && errors.timeTaken && (
                        <FormHelperText>{errors.timeTaken}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setCreateModal(false);
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

export default Create;

import { Box, Button, Grid, Modal, Tooltip, Typography } from "@mui/material";
import React from "react";
import { DARK_GREEN } from "../../../utils/constants";
import moment from "moment";

const View = (props) => {
  const { viewModal, setViewModal, modalData } = props;
  return (
    <Modal
      open={viewModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          outline: "none",
        }}
      >
        <Grid container>
          <Grid item md={12} paddingBottom={"32px"}>
            <Typography fontWeight={600} align="center" color={DARK_GREEN}>
              View Admin User
            </Typography>
          </Grid>

          <Grid container md={12} spacing={3}>
            <Grid item md={4} display={"flex"}>
              <Typography color={DARK_GREEN} fontWeight={600}>
                Name
              </Typography>
              <Typography color={DARK_GREEN} fontWeight={600}>
                :
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
              >
                <Tooltip
                  title={
                    modalData?.lastName
                      ? `${modalData?.firstName} ${modalData?.lastName}`
                      : modalData?.firstName
                  }
                  placement="top"
                  arrow
                >
                  {modalData?.lastName
                    ? `${modalData?.firstName} ${modalData?.lastName}`
                    : modalData?.firstName}
                </Tooltip>
              </Typography>
            </Grid>

            <Grid item md={4} display={"flex"}>
              <Typography color={DARK_GREEN} fontWeight={600}>
                Email
              </Typography>
              <Typography color={DARK_GREEN} fontWeight={600}>
                :
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
              >
                <Tooltip title={modalData?.email} placement="top" arrow>
                  {modalData?.email}
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item md={4} display={"flex"}>
              <Typography color={DARK_GREEN} fontWeight={600}>
                Phone
              </Typography>
              <Typography color={DARK_GREEN} fontWeight={600}>
                :
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
              >
                <Tooltip title={modalData?.phone} placement="top" arrow>
                  {modalData?.phone}
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item md={4} display={"flex"}>
              <Typography color={DARK_GREEN} fontWeight={600}>
                Joined On
              </Typography>
              <Typography color={DARK_GREEN} fontWeight={600}>
                :
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
              >
                <Tooltip
                  title={
                    modalData?.created
                      ? moment(modalData?.created).format("Do MMMM YYYY")
                      : "-"
                  }
                  placement="top"
                  arrow
                >
                  {modalData?.created
                    ? moment(modalData?.created).format("Do MMMM YYYY")
                    : "-"}
                </Tooltip>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            md={12}
            display={"flex"}
            justifyContent={"center"}
            paddingTop={"32px"}
          >
            <Button
              type="submit"
              variant="contained"
              className="submit__button"
              onClick={() => setViewModal(false)}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default View;

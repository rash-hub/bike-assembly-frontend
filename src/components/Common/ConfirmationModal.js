import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirmationModal } from "../../redux/Slices/CommonSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ConfirmationModal = (props) => {
  const { message, onOkHandler, onCancelHandler, cancelText, okText } = props;
  const open = useSelector((store) => store.common.confirmationModalOpen);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            display={"flex"}
            justifyContent={"center"}
          >
            {message}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            marginTop={3}
          >
            <Button
              variant="outlined"
              onClick={() => {
                onCancelHandler();
                dispatch(closeConfirmationModal());
              }}
              className="cancel__button"
            >
              {cancelText}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onOkHandler();
                dispatch(closeConfirmationModal());
              }}
              className="submit__button"
            >
              {okText}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationModal;

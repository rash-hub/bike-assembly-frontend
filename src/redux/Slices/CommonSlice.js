import { createSlice } from "@reduxjs/toolkit";

const CommonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    loading: false,
    confirmationModalOpen: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    openConfirmationModal: (state) => {
      state.confirmationModalOpen = true;
    },
    closeConfirmationModal: (state) => {
      state.confirmationModalOpen = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  openConfirmationModal,
  closeConfirmationModal,
} = CommonSlice.actions;
export default CommonSlice.reducer;

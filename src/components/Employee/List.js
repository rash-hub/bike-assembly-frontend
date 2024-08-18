import { useCallback, useEffect, useRef, useState } from "react";
import { DARK_GREEN, DELETE_MESSAGE } from "../../utils/constants";
import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../Common/DataTable";
import {
  openConfirmationModal,
  startLoading,
  stopLoading,
} from "../../redux/Slices/CommonSlice";
import { useDispatch } from "react-redux";
import { deleteEmployee, fetchAllEmployees } from "../../services/employee";
import { enqueueSnackbar } from "notistack";
import ConfirmationModal from "../Common/ConfirmationModal";
import View from "./View";
import Edit from "./Edit";
import Create from "./Create";

const List = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const rowsPerPageRef = useRef(rowsPerPage);

  useEffect(() => {
    rowsPerPageRef.current = rowsPerPage;
  }, [rowsPerPage]);

  const fetchData = useCallback(
    async (pageVal) => {
      dispatch(startLoading());
      const response = await fetchAllEmployees(
        pageVal || page,
        rowsPerPage,
        searchValue
      );
      if (response.success && response.data) {
        setTotalRecords(response?.data?.pagination?.totalItems || 0);
        setEmployees(response?.data?.employees);
        dispatch(stopLoading());
      } else {
        dispatch(stopLoading());
        enqueueSnackbar(response.data, { variant: "error" });
      }
    },
    [dispatch, page, rowsPerPage, searchValue]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onCreate = () => {
    setCreateModal(true);
  };

  const onView = (employee) => {
    setViewModal(true);
    setModalData(employee);
  };

  const onEdit = (employee) => {
    setEditModal(true);
    setModalData(employee);
  };

  const onDelete = (employee) => {
    setDeleteId(employee.id);
    setConfirmationMessage(DELETE_MESSAGE);
    dispatch(openConfirmationModal());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    rowsPerPageRef.current = parseInt(event.target.value, 10);
    setPage(0);
  };

  const onDeleteHandler = async () => {
    dispatch(startLoading());
    const response = await deleteEmployee(deleteId);
    fetchData();
    if (response.success && response.data) {
      dispatch(stopLoading());
      enqueueSnackbar(response.data?.message, { variant: "success" });
    } else {
      dispatch(stopLoading());
      enqueueSnackbar(response.data, { variant: "error" });
    }
  };

  return (
    <Paper className="container" elevation={4}>
      <Grid
        container
        spacing={1}
        paddingBottom={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid item md={6}>
          <OutlinedInput
            sx={{
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: DARK_GREEN,
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: DARK_GREEN,
                },
              borderRadius: "4px",
              width: "100%",
            }}
            placeholder="Search by name, email, phone"
            size="small"
            onChange={(e) => setSearchValue(e.target.value.trim())}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className="submit__button"
            onClick={onCreate}
          >
            + Add
          </Button>
        </Grid>
      </Grid>

      <DataTable
        from="employeeList"
        headers={[
          { label: "Name" },
          { label: "Email" },
          { label: "Phone" },
          { label: "Actions" },
        ]}
        data={employees?.map((row) => {
          return {
            id: row?.id,
            commonColumns: [
              row?.firstName + " " + row?.lastName,
              row?.email,
              row?.phone,
            ],
            data: row,
          };
        })}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        totalRecords={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ConfirmationModal
        message={confirmationMessage}
        onOkHandler={onDeleteHandler}
        onCancelHandler={() => {
          setDeleteId(null);
        }}
        cancelText="No"
        okText="Yes"
      />
      <Create
        createModal={createModal}
        setCreateModal={setCreateModal}
        fetchData={fetchData}
      />
      <View
        viewModal={viewModal}
        setViewModal={setViewModal}
        modalData={modalData}
      />
      <Edit
        editModal={editModal}
        setEditModal={setEditModal}
        modalData={modalData}
        fetchData={fetchData}
      />
    </Paper>
  );
};

export default List;

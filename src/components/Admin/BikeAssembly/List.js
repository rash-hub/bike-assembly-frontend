import { useCallback, useEffect, useRef, useState } from "react";
import { DARK_GREEN, DELETE_MESSAGE } from "../../../utils/constants";
import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../Common/DataTable";
import {
  openConfirmationModal,
  startLoading,
  stopLoading,
} from "../../../redux/Slices/CommonSlice";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import ConfirmationModal from "../../Common/ConfirmationModal";
import Edit from "./Edit";
import Create from "./Create";
import {
  deleteBikeAssembly,
  fetchBikeAssembly,
} from "../../../services/admin/bike-assembly";
import { PieChart } from "@mui/x-charts/PieChart";
import dayjs from "dayjs";

const List = () => {
  const dispatch = useDispatch();
  const [bikeAssembly, setBikeAssembly] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [from, setFrom] = useState(dayjs().subtract(7, "days"));
  const [to, setTo] = useState(dayjs());
  const rowsPerPageRef = useRef(rowsPerPage);
  const [data, setPieData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    rowsPerPageRef.current = rowsPerPage;
  }, [rowsPerPage]);

  const fetchData = useCallback(
    async (pageVal) => {
      if (!error) {
        dispatch(startLoading());
        const response = await fetchBikeAssembly(
          pageVal || page,
          rowsPerPage,
          searchValue,
          from,
          to
        );
        if (response.success && response.data) {
          setTotalRecords(response?.data?.pagination?.totalItems || 0);
          setBikeAssembly(response?.data?.bikeAssembly);
          const responseData = response?.data?.bikeAssembly;
          const result = Object.values(
            responseData.reduce((acc, item) => {
              const { id, firstName, lastName } = item.employee;
              if (!acc[id]) {
                acc[id] = {
                  id,
                  label: `${firstName} ${lastName}`,
                  value: 0,
                };
              }
              acc[id].value += 1;
              return acc;
            }, {})
          );
          setPieData(result);
          dispatch(stopLoading());
        } else {
          dispatch(stopLoading());
          enqueueSnackbar(response.data, { variant: "error" });
        }
      }
    },
    [dispatch, page, rowsPerPage, searchValue, from, to, error]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onCreate = () => {
    setCreateModal(true);
  };

  const onEdit = (bikeAssembly) => {
    setEditModal(true);
    setModalData(bikeAssembly);
  };

  const onDelete = (bikeAssembly) => {
    setDeleteId(bikeAssembly.id);
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
    const response = await deleteBikeAssembly(deleteId);
    fetchData();
    if (response.success && response.data) {
      dispatch(stopLoading());
      enqueueSnackbar(response.data?.message, { variant: "success" });
    } else {
      dispatch(stopLoading());
      enqueueSnackbar(response.data, { variant: "error" });
    }
  };

  const userData = JSON.parse(localStorage.getItem("user"));

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
            placeholder="Search by bike name, employee first name, employee last name"
            size="small"
            onChange={(e) => setSearchValue(e.target.value.trim())}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        {userData.title !== "EMPLOYEE" && (
          <Grid item xs={3} md={3}>
            <TextField
              type="date"
              size="small"
              fullWidth
              value={from.format("YYYY-MM-DD")}
              onChange={(e) => {
                const newFrom = dayjs(e.target.value);
                setFrom(newFrom);
                if (newFrom.isAfter(to)) {
                  setError("'From' date should be earlier than 'To' date");
                } else {
                  setError("");
                }
              }}
              error={!!error}
              helperText={error}
            ></TextField>
          </Grid>
        )}
        {userData.title !== "EMPLOYEE" && (
          <Grid item xs={3} md={3}>
            <TextField
              type="date"
              size="small"
              fullWidth
              value={to.format("YYYY-MM-DD")}
              onChange={(e) => {
                const newTo = dayjs(e.target.value);
                setTo(newTo);
                if (from.isAfter(newTo)) {
                  setError("'From' date should be earlier than 'To' date");
                } else {
                  setError("");
                }
              }}
              error={!!error}
              helperText={error}
            ></TextField>
          </Grid>
        )}
        {userData?.title === "EMPLOYEE" && (
          <Grid item>
            <Button
              variant="contained"
              className="submit__button"
              onClick={onCreate}
            >
              + Add
            </Button>
          </Grid>
        )}
      </Grid>
      {userData?.title !== "EMPLOYEE" ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={5} md={5}>
              <Card>
                <CardContent>
                  <PieChart
                    series={[
                      {
                        data,
                        labelKey: "label",
                        valueKey: "value",
                      },
                    ]}
                    width={475}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={7} md={7}>
              <DataTable
                from="bikeAssemblyList"
                headers={
                  userData?.title === "EMPLOYEE"
                    ? [
                        { label: "Bike" },
                        { label: "Employee" },
                        { label: "Time Taken" },
                        { label: "Actions" },
                      ]
                    : [
                        { label: "Bike" },
                        { label: "Employee" },
                        { label: "Time Taken" },
                      ]
                }
                data={bikeAssembly?.map((row) => {
                  return {
                    id: row?.id,
                    commonColumns: [
                      row?.bike?.name,
                      row?.employee?.firstName + " " + row?.employee?.lastName,
                      row?.timeTaken,
                    ],
                    data: row,
                  };
                })}
                onEdit={onEdit}
                onDelete={onDelete}
                totalRecords={totalRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <DataTable
          from="bikeAssemblyList"
          headers={
            userData?.title === "EMPLOYEE"
              ? [
                  { label: "Bike" },
                  { label: "Employee" },
                  { label: "Time Taken" },
                  { label: "Actions" },
                ]
              : [
                  { label: "Bike" },
                  { label: "Employee" },
                  { label: "Time Taken" },
                ]
          }
          data={bikeAssembly?.map((row) => {
            return {
              id: row?.id,
              commonColumns: [
                row?.bike?.name,
                row?.employee?.firstName + " " + row?.employee?.lastName,
                row?.timeTaken,
              ],
              data: row,
            };
          })}
          onEdit={onEdit}
          onDelete={onDelete}
          totalRecords={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
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

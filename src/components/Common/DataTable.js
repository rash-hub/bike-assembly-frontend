import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Common.scss";
const DataTable = (props) => {
  const {
    from,
    headers,
    data,
    onView,
    onEdit,
    onDelete,
    totalRecords,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Table className="TableComp__table">
        <TableHead>
          <TableRow sx={{ whiteSpace: "nowrap" }}>
            {headers.map((header) => (
              <TableCell
                key={header?.label}
                className={
                  header?.label === "Actions"
                    ? "TableComp__table__header__Actions"
                    : "TableComp__table__header"
                }
                width={
                  header?.width ? header?.width : `${100 / headers.length}%`
                }
              >
                {header?.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data?.length ? (
            <TableRow>
              <TableCell align="center" colSpan={headers?.length}>
                No records to show
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row) => (
              <TableRow key={row.id}>
                {row?.commonColumns.map((data, index) => (
                  <TableCell key={data} component="th" scope="row">
                    <Tooltip title={data} placement="top" arrow>
                      {data}
                    </Tooltip>
                  </TableCell>
                ))}
                {from === "bikeAssemblyList" &&
                userData.title !== "EMPLOYEE" ? null : (
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {from === "bikeAssemblyList" &&
                    userData.title === "EMPLOYEE" ? null : (
                      <IconButton onClick={() => onView(row?.data)}>
                        <Tooltip title={"View"} placement="top" arrow>
                          <VisibilityIcon className="TableComp__table__icon" />
                        </Tooltip>
                      </IconButton>
                    )}
                    <IconButton onClick={() => onEdit(row?.data)}>
                      <Tooltip title={"Edit"} placement="top" arrow>
                        <EditIcon className="TableComp__table__icon" />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(row?.data)}
                      disabled={row?.id === 1 && from === "adminUserList"}
                    >
                      <Tooltip title={"Delete"} placement="top" arrow>
                        <DeleteIcon className="TableComp__table__icon" />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DataTable;

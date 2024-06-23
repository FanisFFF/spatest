import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createRecord, deleteRecord, fetchData } from "../../api/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditRow from "../../components/EditRow";
import { DataType } from "../../types/DataType";

const INITIAL_FORM_DATA = {
  companySigDate: new Date(),
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: new Date(),
  employeeSignatureName: "",
};

const UserPage = () => {
  const [data, setData] = useState([] as DataType[]);
  const { token, logout } = useAuth();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState("");
  const [error, setError] = useState("");

  const queryFetchData = async () => {
    try {
      const response = await fetchData(token as string);
      return response;
    } catch (error) {
      setError("Failed to fetch data");
      return [];
    }
  };

  const {
    isLoading,
    data: documents,
    isError,
  } = useQuery({ queryKey: ["data"], queryFn: queryFetchData });

  const handleAdd = async () => {
    try {
      const response = await createRecord(token as string, formData);
      setData([...data, formData]);
      setFormData(INITIAL_FORM_DATA);
      setError("");
      return response;
    } catch (error) {
      setError("Failed to add document");
      return [];
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    await deleteRecord(token as string, id);
  };

  const { mutate: deleteDocument } = useMutation({
    mutationFn: (id: string) => handleDelete(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const { mutate: addDocument } = useMutation({
    mutationFn: () => handleAdd(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error loading data</Typography>;
  }

  return (
    <>
      <Button onClick={() => logout()}>Logout</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Sig Date</TableCell>
              <TableCell>Company Signature Name</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Document Status</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>Employee Number</TableCell>
              <TableCell>Employee Sig Date</TableCell>
              <TableCell>Employee Signature Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents?.map((row: DataType) =>
              edit === row.id ? (
                <EditRow row={row} key={row.id} onEdit={setEdit} />
              ) : (
                <TableRow key={row.id}>
                  <TableCell>
                    {new Date(row.companySigDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{row.companySignatureName}</TableCell>
                  <TableCell>{row.documentName}</TableCell>
                  <TableCell>{row.documentStatus}</TableCell>
                  <TableCell>{row.documentType}</TableCell>
                  <TableCell>{row.employeeNumber}</TableCell>
                  <TableCell>
                    {new Date(row.employeeSigDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{row.employeeSignatureName}</TableCell>
                  <TableCell>
                    <Button onClick={() => setEdit(row.id as string)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteDocument(row.id as string)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  value={formData.companySignatureName}
                  name="companySignatureName"
                  onChange={handleChange}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  name="documentName"
                  value={formData.documentName}
                  onChange={handleChange}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  name="documentStatus"
                  value={formData.documentStatus}
                  onChange={handleChange}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  name="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={handleChange}
                  type="text"
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  name="employeeSignatureName"
                  value={formData.employeeSignatureName}
                  onChange={handleChange}
                  type="text"
                />
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addDocument()}
                >
                  Add Record
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {error && <Typography color="error">{error}</Typography>}
    </>
  );
};

export default UserPage;

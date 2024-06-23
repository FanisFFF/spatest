import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { FC, useState } from "react";
import { updateRecord } from "../api/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { DataType } from "../types/DataType";

type EditRowTypes = {
  row: DataType;
  onEdit: (a: string) => void;
};

const EditRow: FC<EditRowTypes> = ({ row, onEdit }) => {
  const INITIAL_DATA = {
    companySigDate: new Date().toISOString(),
    companySignatureName: row.companySignatureName,
    documentName: row.documentName,
    documentStatus: row.documentStatus,
    documentType: row.documentType,
    employeeNumber: row.employeeNumber,
    employeeSigDate: new Date().toISOString(),
    employeeSignatureName: "",
  };

  const [formData, setFormData] = useState(INITIAL_DATA);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: updateDocument } = useMutation({
    mutationFn: () => handleApply(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const handleApply = async () => {
    await updateRecord(token as string, row.id as string, formData);
    onEdit("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
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
          onClick={() => updateDocument()}
        >
          Apply
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default EditRow;

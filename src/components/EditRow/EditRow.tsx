import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { FC, useState } from "react";
import { updateRecord } from "../../api/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { DataType } from "../../types/DataType";

type EditRowTypes = {
  row: DataType;
  onEdit: (a: string) => void;
};

const EditRow: FC<EditRowTypes> = ({ row, onEdit }) => {
  const INITIAL_DATA = {
    companySigDate: new Date(),
    postText: row.postText,
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
    await updateRecord(token as string, row._id as string, formData);
    onEdit("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="post-input-container">
      <div className="post-input__avatar-container">
        <img src="./avatar.png" alt="user-avatar" />
      </div>
      <div className="post-input__input-container">
        <div className="post-input__input">
          <textarea
            name="postText"
            onChange={(e) => handleChange(e)}
            placeholder={row.postText}
            value={formData.postText}
          />
        </div>
        <div className="post-input__post-button">
          <button onClick={() => updateDocument()} type="button">
            Apply
          </button>
        </div>
      </div>
    </div>
    // <Button
    //   variant="contained"
    //   color="primary"
    //   onClick={() => updateDocument()}
    // >
    //   Apply
    // </Button>
  );
};
export default EditRow;

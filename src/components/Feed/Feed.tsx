import { useState } from "react";
import PostInput from "../PostInput/post-input.component";
import { DataType } from "../../types/DataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecord, deleteRecord, fetchData } from "../../api/actions";
import { Button, CircularProgress, Typography } from "@mui/material";
import Post from "../Post/post.component";
import { useAuth } from "../../context/AuthContext";
import EditRow from "../EditRow/EditRow";

const INITIAL_FORM_DATA = {
  companySigDate: new Date(),
  postText: "",
};

function Feed() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [data, setData] = useState([] as DataType[]);
  const [edit, setEdit] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();

  const queryClient = useQueryClient();

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
      console.log(error);
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
  const documentsReverse = [].concat(documents).reverse();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error loading data</Typography>;
  }

  return (
    <>
      <div className="main-user-page">
        <div className="main__col-2"></div>
        <PostInput
          valueText={formData.postText}
          onAddPost={addDocument}
          onHandleChange={handleChange}
        ></PostInput>
        {documentsReverse.length > 0 ? (
          documentsReverse.map((row: DataType) =>
            edit === row._id ? (
              <EditRow row={row} key={row._id} onEdit={setEdit} />
            ) : (
              <Post
                key={row._id}
                data={row}
                deleteDocument={deleteDocument}
                setEdit={setEdit}
              />
            )
          )
        ) : (
          <Typography style={{ marginTop: "2rem" }} color="primary">
            Empty
          </Typography>
        )}

        {error && <Typography color="error">{error}</Typography>}
      </div>
    </>
  );
}
export default Feed;

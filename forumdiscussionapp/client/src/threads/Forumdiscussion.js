import React, {
  useState,
  useEffect,
  useTransition,
  useCallback,
  useMemo,
} from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Pagination,
} from "@mui/material";
import { useApi } from "../home-page/Api";
import { ThreadList } from "./ThreadList";
import { PostSection } from "./posts";

export const ForumDiscussion = ({ selectedCourse: courseId }) => {
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [forumName, setForumName] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [createForumName, setCreateForumName] = useState("");
  const [createForumDescription, setCreateForumDescription] = useState("");
  const { api } = useApi();
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchForums = useCallback(async () => {
    try {
      const response = await api.get(`/forums/forums/get/${courseId}`);
      setForums(response.data);
      if (response.data.length > 0) {
        const initialForum = response.data[0];
        setSelectedForum(initialForum);
        setForumName(initialForum.ForumName);
        setForumDescription(initialForum.ForumDescription);
        setLoadingThreads(false);
      }
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  }, [api, courseId]);

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateForum = useCallback(async () => {
    try {
      await api.post("/forums/forums/create", {
        courseId,
        forumName: createForumName,
        forumDescription: createForumDescription,
        createdByUserId: userId,
      });
      fetchForums();
      setOpenCreateDialog(false);
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  }, [
    api,
    courseId,
    createForumName,
    createForumDescription,
    userId,
    fetchForums,
  ]);

  const handleEditForum = useCallback(
    async (forum) => {
      const forumId = forum ? forum.ForumID : null;
      if (!forumId) return;
      try {
        await api.put(`/forums/forums/update/${forumId}`, {
          forumName,
          forumDescription,
          userId,
        });
        fetchForums();
        setOpenEditDialog(false);
      } catch (error) {
        console.error("Error editing forum:", error);
      }
    },
    [api, forumName, forumDescription, userId, fetchForums]
  );

  const handleDeleteForum = useCallback(
    async (forum) => {
      const forumId = forum ? forum.ForumID : null;
      if (!forumId) return;
      try {
        await api.delete(`/forums/forums/delete/${forumId}`);
        fetchForums();
      } catch (error) {
        console.error("Error deleting forum:", error);
      }
    },
    [api, fetchForums]
  );

  const handleOpenCreateDialog = () => {
    setCreateForumName("");
    setCreateForumDescription("");
    setOpenCreateDialog(true);
  };

  const handleOpenEditDialog = (forum) => {
    setSelectedForum(forum);
    setForumName(forum.ForumName);
    setForumDescription(forum.ForumDescription);
    setOpenEditDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
  };

  const renderDialog = useCallback(
    (title, actionButtonLabel, onClickAction) => (
      <Dialog
        open={openCreateDialog || openEditDialog}
        onClose={handleCloseDialogs}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Forum Name"
            value={openCreateDialog ? createForumName : forumName}
            onChange={(e) =>
              openCreateDialog
                ? setCreateForumName(e.target.value)
                : setForumName(e.target.value)
            }
          />
          <TextField
            label="Forum Description"
            value={openCreateDialog ? createForumDescription : forumDescription}
            onChange={(e) =>
              openCreateDialog
                ? setCreateForumDescription(e.target.value)
                : setForumDescription(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button onClick={onClickAction}>{actionButtonLabel}</Button>
        </DialogActions>
      </Dialog>
    ),
    [
      openCreateDialog,
      openEditDialog,
      forumName,
      forumDescription,
      createForumName,
      createForumDescription,
      handleCloseDialogs,
    ]
  );

  const itemsPerPage = 1;
  const indexOfLastForum = currentPage * itemsPerPage;
  const indexOfFirstForum = indexOfLastForum - itemsPerPage;
  const currentForums = forums.slice(indexOfFirstForum, indexOfLastForum);

  return (
    <>
      {roleId === "2" && (
        <Box
          sx={{
            padding: 3,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Button onClick={handleOpenCreateDialog}>Create Forum</Button>
        </Box>
      )}

      <Box
        sx={{
          my: 3,
          padding: 3,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        {currentForums.map((forum) => (
          <Box
            key={forum.ForumID}
            sx={{
              borderBottom: "1px solid #ccc",
              marginBottom: 2,
              paddingBottom: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              {forum.ForumName}
            </Typography>
            <Typography>{forum.ForumDescription}</Typography>
            <ThreadList roleId={roleId} forumId={forum.ForumID} />
            {selectedForum && selectedForum.ForumID === forum.ForumID && (
              <PostSection forumId={forum.ForumID} />
            )}

            {roleId === "2" && (
              <>
                <Button onClick={() => handleOpenEditDialog(forum)}>
                  Edit Forum
                </Button>
                <Button onClick={() => handleDeleteForum(forum)}>
                  Delete Forum
                </Button>

                {renderDialog(
                  `Edit Forum - ${forum.ForumName}`,
                  "Save Changes",
                  () => handleEditForum(forum)
                )}
              </>
            )}
          </Box>
        ))}

        {loadingThreads ? (
          <Typography>Loading threads...</Typography>
        ) : (
          <>
            {forums.length > 1 && (
              <Pagination
                count={Math.ceil(forums.length / itemsPerPage)}
                page={currentPage}
                onChange={(event, value) => paginate(value)}
                color="primary"
                sx={{ marginTop: 2 }}
              />
            )}

            {roleId === "2" && (
              <>{renderDialog("Create Forum", "Create", handleCreateForum)}</>
            )}
          </>
        )}
      </Box>
    </>
  );
};

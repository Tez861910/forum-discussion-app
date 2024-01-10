import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useApi } from "../home-page/Api";
import { ThreadList } from "./ThreadList";
import { PostSection } from "./posts";

const CreateDialog = ({
  openCreateDialog,
  handleCloseDialogs,
  createForumName,
  setCreateForumName,
  createForumDescription,
  setCreateForumDescription,
  handleCreateForum,
}) => (
  <Dialog open={openCreateDialog} onClose={handleCloseDialogs}>
    <DialogTitle>Create Forum</DialogTitle>
    <DialogContent>
      <TextField
        label="Forum Name"
        value={createForumName}
        onChange={(e) => setCreateForumName(e.target.value)}
      />
      <TextField
        label="Forum Description"
        value={createForumDescription}
        onChange={(e) => setCreateForumDescription(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialogs}>Cancel</Button>
      <Button onClick={handleCreateForum}>Create</Button>
    </DialogActions>
  </Dialog>
);

const EditDialog = ({
  openEditDialog,
  handleCloseDialogs,
  forumName,
  setForumName,
  forumDescription,
  setForumDescription,
  handleEditForum,
}) => (
  <Dialog open={openEditDialog} onClose={handleCloseDialogs}>
    <DialogTitle>Edit Forum</DialogTitle>
    <DialogContent>
      <TextField
        label="Forum Name"
        value={forumName}
        onChange={(e) => setForumName(e.target.value)}
      />
      <TextField
        label="Forum Description"
        value={forumDescription}
        onChange={(e) => setForumDescription(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialogs}>Cancel</Button>
      <Button onClick={handleEditForum}>Save Changes</Button>
    </DialogActions>
  </Dialog>
);

export const ForumDiscussion = ({ selectedCourse: courseId }) => {
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const { api } = useApi();
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [forumToDelete, setForumToDelete] = useState(null);
  const [forumName, setForumName] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [createForumName, setCreateForumName] = useState("");
  const [createForumDescription, setCreateForumDescription] = useState("");
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredForums = forums.filter((forum) =>
    forum.ForumName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleForumClick = (forum) => {
    setSelectedForum(forum);
  };

  const fetchForums = useCallback(async () => {
    try {
      const response = await api.get(`/forums/forums/get/${courseId}`);
      setForums(response.data);
      if (response.data.length > 0) {
        setLoadingThreads(false);
      }
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  }, [api, courseId]);

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

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

  const handleEditForum = useCallback(async () => {
    const forumId = selectedForum ? selectedForum.ForumID : null;
    if (!forumId) return;
    try {
      await api.put(`/forums/forums/update/${forumId}`, {
        forumName,
        forumDescription,
        userId,
      });

      // Update the selectedForum state with the new information
      const updatedSelectedForum = {
        ...selectedForum,
        ForumName: forumName,
        ForumDescription: forumDescription,
      };

      setSelectedForum(updatedSelectedForum);
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error editing forum:", error);
    }
  }, [api, forumName, forumDescription, userId, fetchForums, selectedForum]);

  const handleDeleteForum = useCallback(async () => {
    const forumId = selectedForum ? selectedForum.ForumID : null;
    if (!forumId) return;
    try {
      await api.delete(`/forums/forums/delete/${forumId}`);
      fetchForums();
      setSelectedForum(null);
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  }, [api, fetchForums, selectedForum]);

  const handleOpenCreateDialog = () => {
    setCreateForumName("");
    setCreateForumDescription("");
    setOpenCreateDialog(true);
  };

  const handleOpenEditDialog = () => {
    setForumName(selectedForum ? selectedForum.ForumName : "");
    setForumDescription(selectedForum ? selectedForum.ForumDescription : "");
    setOpenEditDialog(true);
  };

  const handleOpenDeleteConfirmation = () => {
    setForumToDelete(selectedForum);
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDialogs = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteForumConfirmed = () => {
    handleDeleteForum();
    setOpenDeleteConfirmation(false);
  };

  const renderDialog = useCallback(
    (title, actionButtonLabel, onClickAction) => (
      <Dialog
        open={(openCreateDialog || openEditDialog) && selectedForum === null}
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
      selectedForum,
      handleCloseDialogs,
    ]
  );

  const renderForumList = () => (
    <Box>
      <TextField
        label="Search Forum"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      {filteredForums.map((forum) => (
        <Box
          key={forum.ForumID}
          sx={{
            borderBottom: "1px solid #ccc",
            marginBottom: 2,
            paddingBottom: 2,
          }}
        >
          <Button onClick={() => handleForumClick(forum)}>
            <Typography variant="h5" gutterBottom>
              {forum.ForumName}
            </Typography>
          </Button>
        </Box>
      ))}
      {roleId === "2" && (
        <Box sx={{ marginTop: 2 }}>
          <Button onClick={handleOpenCreateDialog}>Create Forum</Button>
        </Box>
      )}
      <CreateDialog
        openCreateDialog={openCreateDialog}
        handleCloseDialogs={handleCloseDialogs}
        createForumName={createForumName}
        setCreateForumName={setCreateForumName}
        createForumDescription={createForumDescription}
        setCreateForumDescription={setCreateForumDescription}
        handleCreateForum={handleCreateForum}
      />
    </Box>
  );

  const renderForumPage = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        {selectedForum.ForumName}
      </Typography>
      <Typography>{selectedForum.ForumDescription}</Typography>
      <ThreadList roleId={roleId} forumId={selectedForum.ForumID} />

      {roleId === "2" && (
        <>
          <Button onClick={handleOpenEditDialog}>Edit Forum</Button>
          <Button onClick={handleOpenDeleteConfirmation}>Delete Forum</Button>
        </>
      )}

      {openEditDialog && (
        <EditDialog
          openEditDialog={openEditDialog}
          handleCloseDialogs={handleCloseDialogs}
          forumName={forumName}
          setForumName={setForumName}
          forumDescription={forumDescription}
          setForumDescription={setForumDescription}
          handleEditForum={handleEditForum}
        />
      )}
      {openDeleteConfirmation && (
        <Dialog open={openDeleteConfirmation} onClose={handleCloseDialogs}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the forum?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogs}>Cancel</Button>
            <Button onClick={handleDeleteForumConfirmed}>Delete</Button>
          </DialogActions>
        </Dialog>
      )}

      <PostSection
        key={selectedForum.ForumID}
        forumId={selectedForum.ForumID}
      />

      <Box sx={{ marginTop: 2 }}>
        <Button onClick={() => setSelectedForum(null)}>
          Back to Forum List
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      {selectedForum === null ? renderForumList() : renderForumPage()}
      {loadingThreads && <Typography>Loading threads...</Typography>}
    </Box>
  );
};

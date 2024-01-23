import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  TextareaAutosize,
  Box,
  styled,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useApi } from "../home-page/Api";
import { ReplySection } from "./replies";

const PostItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  position: "relative",
}));

const EditDeleteWrapper = styled(Box)({
  marginLeft: "auto",
});

export const PostSection = ({ forumId }) => {
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);
  const [usernamesMap, setUsernamesMap] = useState({});
  const [newPost, setNewPost] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const { api } = useApi();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await api.get(`/forums/posts/get/${forumId}`);
      const responseData = response.data;

      console.log("Response Data:", responseData);

      if (responseData !== null) {
        const posts = Array.isArray(responseData)
          ? responseData
          : [responseData];
        setPosts(posts);
        setFetchError(null);
        return posts;
      } else {
        console.warn("No posts available for the forum.");
        setFetchError("No posts available for the forum.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setFetchError("Error loading posts");
    }
  }, [api, forumId]);

  const fetchUsernames = useCallback(
    async (postsToFetchUsernames) => {
      try {
        if (
          Array.isArray(postsToFetchUsernames) &&
          postsToFetchUsernames.length > 0
        ) {
          const userIds = Array.from(
            new Set(postsToFetchUsernames.map((post) => post.UserID))
          );
          const usernamesResponse = await api.post(
            "/users/users/getUsernames",
            {
              userIds,
            }
          );
          const usernames = usernamesResponse.data.usernames;

          const usernameMap = {};
          userIds.forEach((userId) => {
            usernameMap[userId] = usernames[userId] || "Unknown User";
          });

          setUsernamesMap((prevUsernamesMap) => ({
            ...prevUsernamesMap,
            ...usernameMap,
          }));
        } else {
          console.warn("No posts to fetch usernames for.");
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    },
    [api]
  );

  const createPost = async () => {
    if (forumId && newPost.trim() !== "") {
      try {
        await api.post(`/forums/posts/create/${forumId}`, {
          postContent: newPost,
          userId,
        });

        setNewPost("");
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  const editPost = async (postId) => {
    try {
      const editedPost = posts.find((post) => post.ForumPostID === postId);

      if (editedPost) {
        await api.put(`/forums/posts/update/${postId}`, {
          postContent: editedContent,
        });

        setEditingPost(null);
        setEditedContent("");
      } else {
        console.error("Post not found for editing:", postId);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await api.delete(`/forums/posts/delete/${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    await createPost();
    const newPosts = await fetchPosts();
    fetchUsernames(newPosts);
  };

  const handleEditPost = async (postId) => {
    await editPost(postId);
    await fetchPosts();
    await fetchUsernames(posts);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    await fetchPosts();
    await fetchUsernames(posts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch posts
        const newPosts = await fetchPosts();

        // Check if posts are fetched successfully before proceeding
        if (newPosts) {
          // Fetch usernames based on the retrieved posts
          await fetchUsernames(newPosts);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError("Error loading data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchPosts, fetchUsernames]);

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", color: "black" }}>
        Post Section
      </Typography>

      {fetchError && <p>{fetchError}</p>}

      {(roleId === "2" || roleId === "3") && (
        <form onSubmit={handlePostSubmit}>
          <TextareaAutosize
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            aria-label="new post"
            minRows={4}
            placeholder="Add a post..."
            sx={{ width: "100%", marginTop: 2, fontWeight: "bold" }}
          />
          {newPost.trim() !== "" && (
            <>
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
              <IconButton onClick={() => setNewPost("")}>
                <CloseIcon />
              </IconButton>
            </>
          )}
        </form>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ mt: 2 }}>
          {posts.map((post) => (
            <PostItem key={post?.ForumPostID}>
              {editingPost === post?.ForumPostID ? (
                <Box>
                  <TextareaAutosize
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    aria-label="edit post"
                    minRows={4}
                    placeholder="Edit your post..."
                    sx={{ width: "100%", marginBottom: 2, fontWeight: "bold" }}
                  />
                  <IconButton onClick={() => handleEditPost(post?.ForumPostID)}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditingPost(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    mb={2}
                    sx={{ fontWeight: "bold" }}
                  >
                    {post?.PostContent}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    by {usernamesMap[post.UserID]}
                  </Typography>
                  {(roleId === "2" ||
                    (roleId === "3" && userId === post?.UserID)) && (
                    <EditDeleteWrapper>
                      <IconButton
                        onClick={() => {
                          setEditingPost(post?.ForumPostID);
                          setEditedContent(post?.PostContent);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeletePost(post?.ForumPostID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </EditDeleteWrapper>
                  )}
                </>
              )}
              <ReplySection postId={post?.ForumPostID} />
            </PostItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

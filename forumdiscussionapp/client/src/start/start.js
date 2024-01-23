import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";
import logo from "./logo.png";
import { useApi } from "../home-page/Api";

const NavigationButton = ({ to, color, children }) => (
  <Button
    variant="contained"
    component={RouterLink}
    to={to}
    color={color}
    sx={{
      fontSize: "1.2rem",
      py: 1,
      px: 2,
      borderRadius: 2,
      textTransform: "none",
      ml: 2,
    }}
  >
    {children}
  </Button>
);

const fetchDepartments = async (api) => {
  try {
    const response = await api.get("/users/departments/get/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

const fetchFacultyMembers = async (api) => {
  try {
    const response = await api.get("/users/facultymembers/get/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching faculty members:", error);
    return [];
  }
};

const fetchCourses = async (api) => {
  try {
    const response = await api.get("/users/courses/get");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const Start = () => {
  const { api } = useApi();
  const theme = useTheme();
  const [departmentsData, setDepartmentsData] = React.useState([]);
  const [facultyMembersData, setFacultyMembersData] = React.useState([]);
  const [coursesData, setCoursesData] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const departments = await fetchDepartments(api);
      const facultyMembers = await fetchFacultyMembers(api);
      const courses = await fetchCourses(api);

      setDepartmentsData(departments);
      setFacultyMembersData(facultyMembers);
      setCoursesData(courses);
    };

    fetchData();
  }, [api]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Container sx={{ p: 6, mb: 4, mt: 4 }}>
        <AppBar
          position="static"
          sx={{ boxShadow: 2, bgcolor: theme.palette.background.paper }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="div">
                University Website
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <NavigationButton to="/login" color="primary">
                Login
              </NavigationButton>
              <NavigationButton to="/sign-up" color="secondary">
                Signup
              </NavigationButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ width: 240 }}
        >
          {/* Drawer content */}
        </Drawer>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  mt: 4,
                  borderRadius: 2,
                  bgcolor: theme.palette.background.paper,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: 0.9,
                  transition: "opacity .3s",
                  "&:hover": { opacity: 1 },
                }}
              >
                <Avatar
                  src={logo}
                  alt="Logo"
                  sx={{ width: 200, height: 200 }}
                />
                <Typography variant="h1" sx={{ mt: 4, textAlign: "center" }}>
                  Welcome to the University Website!
                </Typography>
              </Paper>
            </Grid>

            {/* Display Departments */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h2">Departments:</Typography>
                  <List>
                    {departmentsData.map((department) => (
                      <ListItem key={department.DepartmentID}>
                        <ListItemText
                          primary={department.DepartmentName}
                          secondary={department.DepartmentDescription}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Display Faculty Members */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h2">Faculty Members:</Typography>
                  <List>
                    {facultyMembersData.map((faculty) => (
                      <ListItem key={faculty.FacultyID}>
                        <ListItemText
                          primary={faculty.FacultyName}
                          secondary={`Department ID: ${faculty.DepartmentID}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Display Courses */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h2">Courses:</Typography>
                  <List>
                    {coursesData.map((course) => (
                      <ListItem key={course.CourseID}>
                        <ListItemText
                          primary={course.CourseName}
                          secondary={course.CourseDescription}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Suspense>
  );
};

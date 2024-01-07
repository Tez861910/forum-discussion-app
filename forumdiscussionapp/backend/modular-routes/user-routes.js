import express from "express";
import { handleError } from "../authvalid.js";

import usersRoutes from "../routes/user-routes/users.js";
import coursesRoutes from "../routes/user-routes/courses.js";
import usercoursesRoutes from "../routes/user-routes/user-courses.js";
import rolesRoutes from "../routes/user-routes/roles.js";
import userrolesRoutes from "../routes/user-routes/user-roles.js";
import departmentsRoutes from "../routes/user-routes/departments.js";
import facultymembersRouters from "../routes/user-routes/faculty-members.js";
import coursematerialsRouters from "../routes/user-routes/course-materials.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/courses", coursesRoutes);
router.use("/usercourses", usercoursesRoutes);
router.use("/roles", rolesRoutes);
router.use("/userroles", userrolesRoutes);
router.use("/departments", departmentsRoutes);
router.use("/facultymembers", facultymembersRouters);
router.use("/coursematerials", coursematerialsRouters);

// Error handling middleware
router.use(handleError);

export default router;

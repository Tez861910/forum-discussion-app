import { Sequelize } from "sequelize";
import CommonAttributesModel from "./models/CommonAttributes.js";
import RolesModel from "./models/Roles.js";
import CoursesModel from "./models/Courses.js";
import UserModel from "./models/User.js";
import GenderModel from "./models/Gender.js";
import UserRoleModel from "./models/UserRoles.js";
import UserCoursesModel from "./models/UserCourses.js";
import DepartmentsModel from "./models/Departments.js";
import FacultyMembersModel from "./models/FacultyMembers.js";
import CourseMaterialsModel from "./models/CourseMaterials.js";

import ForumsModel from "./models/Forums.js";
import ThreadsModel from "./models/Threads.js";
import CommentsModel from "./models/Comments.js";
import ResponsesModel from "./models/Responses.js";
import ForumPostsModel from "./models/ForumPosts.js";
import ForumRepliesModel from "./models/ForumReplies.js";
import ForumModeratorsModel from "./models/ForumModerators.js";
import PollsModel from "./models/Polls.js";
import PollOptionsModel from "./models/PollOptions.js";
import UserPollVotesModel from "./models/UserPollVotes.js";

import ExamCategoryModel from "./models/ExamCategory.js";
import ExamsModel from "./models/Exams.js";
import QuestionTypeModel from "./models/QuestionType.js";
import QuestionModel from "./models/Question.js";
import McqOptionsModel from "./models/McqOptions.js";
import AnswersModel from "./models/Answers.js";
import ExamScheduleModel from "./models/ExamSchedule.js";
import ResultsModel from "./models/Results.js";
import ExamAttemptModel from "./models/ExamAttempt.js";
import UserResponsesModel from "./models/UserResponses.js";

import EventsModel from "./models/Events.js";
import RecurringEventsModel from "./models/RecurringEvents.js";
import RemindersModel from "./models/Reminders.js";
import EventCategoriesModel from "./models/EventCategories.js";
import EventCategoryMapModel from "./models/EventCategoryMap.js";
import EventImagesModel from "./models/EventImages.js";
import GuestSpeakerModel from "./models/GuestSpeaker.js";

import UserStatusModel from "./models/UserStatus.js";
import FriendRequestsModel from "./models/FriendRequests.js";
import FriendsModel from "./models/Friends.js";
import PrivateMessagesModel from "./models/PrivateMessages.js";
import ReadReceiptsModel from "./models/ReadReceipts.js";
import RealTimeUpdatesModel from "./models/RealTimeUpdates.js";

import GroupChatModel from "./models/GroupChat.js";
import GroupManagerModel from "./models/GroupManager.js";
import GroupMembersModel from "./models/GroupMembers.js";
import GroupMessagesModel from "./models/GroupMessages.js";
import ReadReceiptsGroupModel from "./models/ReadReceiptsGroup.js";
import RealTimeGroupUpdatesModel from "./models/RealTimeGroupUpdates.js";

import AttachmentTypeModel from "./models/AttachmentType.js";
import AttachmentsModel from "./models/Attachments.js";
import ReactionTypeModel from "./models/ReactionType.js";
import ReactionsModel from "./models/Reactions.js";

import AnnouncementsModel from "./models/Announcements.js";
import NotificationsModel from "./models/Notifications.js";

import BansModel from "./models/Bans.js";
import UserReportsModel from "./models/UserReports.js";

import UserActivityLogModel from "./models/UserActivityLog.js";
import UserSettingsModel from "./models/UserSettings.js";

import config from "./config.js";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

export const CommonAttributes = CommonAttributesModel(sequelize);
export const Roles = RolesModel(sequelize);
export const Courses = CoursesModel(sequelize);
export const User = UserModel(sequelize);
export const Gender = GenderModel(sequelize);
export const UserRoles = UserRoleModel(sequelize);
export const UserCourses = UserCoursesModel(sequelize);
export const Departments = DepartmentsModel(sequelize);
export const FacultyMembers = FacultyMembersModel(sequelize);
export const CourseMaterials = CourseMaterialsModel(sequelize);

export const Forums = ForumsModel(sequelize);
export const Threads = ThreadsModel(sequelize);
export const Comments = CommentsModel(sequelize);
export const Responses = ResponsesModel(sequelize);
export const ForumPosts = ForumPostsModel(sequelize);
export const ForumReplies = ForumRepliesModel(sequelize);
export const ForumModerators = ForumModeratorsModel(sequelize);
export const Polls = PollsModel(sequelize);
export const PollOptions = PollOptionsModel(sequelize);
export const UserPollVotes = UserPollVotesModel(sequelize);

export const ExamCategory = ExamCategoryModel(sequelize);
export const Exams = ExamsModel(sequelize);
export const QuestionType = QuestionTypeModel(sequelize);
export const Question = QuestionModel(sequelize);
export const McqOptions = McqOptionsModel(sequelize);
export const Answers = AnswersModel(sequelize);
export const ExamSchedule = ExamScheduleModel(sequelize);
export const Results = ResultsModel(sequelize);
export const ExamAttempt = ExamAttemptModel(sequelize);
export const UserResponses = UserResponsesModel(sequelize);

export const Events = EventsModel(sequelize);
export const RecurringEvents = RecurringEventsModel(sequelize);
export const Reminders = RemindersModel(sequelize);
export const EventCategories = EventCategoriesModel(sequelize);
export const EventCategoryMap = EventCategoryMapModel(sequelize);
export const EventImages = EventImagesModel(sequelize);
export const GuestSpeaker = GuestSpeakerModel(sequelize);

export const UserStatus = UserStatusModel(sequelize);
export const FriendRequests = FriendRequestsModel(sequelize);
export const Friends = FriendsModel(sequelize);
export const PrivateMessages = PrivateMessagesModel(sequelize);
export const ReadReceipts = ReadReceiptsModel(sequelize);
export const RealTimeUpdates = RealTimeUpdatesModel(sequelize);

export const GroupChat = GroupChatModel(sequelize);
export const GroupManager = GroupManagerModel(sequelize);
export const GroupMembers = GroupMembersModel(sequelize);
export const GroupMessages = GroupMessagesModel(sequelize);
export const ReadReceiptsGroup = ReadReceiptsGroupModel(sequelize);
export const RealTimeGroupUpdates = RealTimeGroupUpdatesModel(sequelize);

export const AttachmentType = AttachmentTypeModel(sequelize);
export const Attachments = AttachmentsModel(sequelize);
export const ReactionType = ReactionTypeModel(sequelize);
export const Reactions = ReactionsModel(sequelize);

export const Announcements = AnnouncementsModel(sequelize);
export const Notifications = NotificationsModel(sequelize);

export const Bans = BansModel(sequelize);
export const UserReports = UserReportsModel(sequelize);

export const UserActivityLog = UserActivityLogModel(sequelize);
export const UserSettings = UserSettingsModel(sequelize);

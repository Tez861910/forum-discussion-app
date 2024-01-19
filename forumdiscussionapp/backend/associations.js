export const setAssociations = (models) => {
  const {
    CommonAttributesModel: CommonAttributes,
    RolesModel: Roles,
    CoursesModel: Courses,
    UsersModel: Users,
    GendersModel: Genders,
    UserRolesModel: UserRoles,
    UserCoursesModel: UserCourses,
    DepartmentsModel: Departments,
    FacultyMembersModel: FacultyMembers,
    CourseMaterialsModel: CourseMaterials,
    ForumsModel: Forums,
    ThreadsModel: Threads,
    CommentsModel: Comments,
    ResponsesModel: Responses,
    ForumPostsModel: ForumPosts,
    ForumRepliesModel: ForumReplies,
    ForumModeratorsModel: ForumModerators,
    PollsModel: Polls,
    PollOptionsModel: PollOptions,
    UserPollVotesModel: UserPollVotes,
    ExamCategorysModel: ExamCategorys,
    ExamsModel: Exams,
    QuestionTypesModel: QuestionTypes,
    QuestionsModel: Questions,
    MCQOptionsModel: MCQOptions,
    AnswersModel: Answers,
    ExamSchedulesModel: ExamSchedules,
    ResultsModel: Results,
    ExamAttemptsModel: ExamAttempts,
    UserResponsesModel: UserResponses,
    EventsModel: Events,
    RecurringEventsModel: RecurringEvents,
    RemindersModel: Reminders,
    EventCategoriesModel: EventCategories,
    EventCategoryMappingsModel: EventCategoryMappings,
    EventImagesModel: EventImages,
    GuestSpeakersModel: GuestSpeakers,
    UserStatusModel: UserStatus,
    FriendRequestsModel: FriendRequests,
    FriendsModel: Friends,
    PrivateMessagesModel: PrivateMessages,
    ReadReceiptsModel: ReadReceipts,
    RealTimeUpdatesModel: RealTimeUpdates,
    GroupChatsModel: GroupChats,
    GroupManagersModel: GroupManagers,
    GroupMembersModel: GroupMembers,
    GroupMessagesModel: GroupMessages,
    ReadReceiptsGroupsModel: ReadReceiptsGroups,
    RealTimeGroupUpdatesModel: RealTimeGroupUpdates,
    AttachmentTypesModel: AttachmentTypes,
    AttachmentsModel: Attachments,
    ReactionTypesModel: ReactionTypes,
    ReactionsModel: Reactions,
    AnnouncementsModel: Announcements,
    NotificationsModel: Notifications,
    BansModel: Bans,
    UserReportsModel: UserReports,
    UserActivityLogsModel: UserActivityLogs,
    UserSettingsModel: UserSettings,
  } = models;

  // CommonAttributes model associations
  // CommonAttributes.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  //CommonAttributes.belongsTo(Users, { foreignKey: "UpdatedByUserID" });
  //CommonAttributes.belongsTo(Users, { foreignKey: "DeletedByUserID" });
  CommonAttributes.hasMany(Users, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Courses, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Roles, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(UserRoles, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(UserCourses, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(FacultyMembers, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Departments, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(CourseMaterials, {
    foreignKey: "CommonAttributeID",
  });

  CommonAttributes.hasMany(Forums, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Threads, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Comments, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Responses, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ForumPosts, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ForumReplies, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ForumModerators, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(Polls, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(PollOptions, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(UserPollVotes, { foreignKey: "CommonAttributeID" });

  CommonAttributes.hasMany(Exams, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ExamCategorys, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ExamSchedules, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Questions, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(QuestionTypes, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(MCQOptions, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Answers, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(UserResponses, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ExamAttempts, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Results, { foreignKey: "CommonAttributeID" });

  CommonAttributes.hasMany(Events, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(EventCategories, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(EventCategoryMappings, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(RecurringEvents, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(Reminders, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(EventImages, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(GuestSpeakers, { foreignKey: "CommonAttributeID" });

  CommonAttributes.hasMany(UserStatus, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(FriendRequests, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Friends, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(PrivateMessages, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(ReadReceipts, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(RealTimeUpdates, {
    foreignKey: "CommonAttributeID",
  });

  CommonAttributes.hasMany(GroupChats, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(GroupMembers, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(GroupMessages, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(GroupManagers, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(ReadReceiptsGroups, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(RealTimeGroupUpdates, {
    foreignKey: "CommonAttributeID",
  });

  CommonAttributes.hasMany(Attachments, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Reactions, { foreignKey: "CommonAttributeID" });

  CommonAttributes.hasMany(Announcements, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(Notifications, { foreignKey: "CommonAttributeID" });

  CommonAttributes.hasMany(Bans, { foreignKey: "CommonAttributeID" });
  CommonAttributes.hasMany(UserReports, { foreignKey: "CommonAttributeID" });

  CommonAttributes.hasMany(UserActivityLogs, {
    foreignKey: "CommonAttributeID",
  });
  CommonAttributes.hasMany(UserSettings, { foreignKey: "CommonAttributeID" });

  // User model associations
  Users.hasMany(UserRoles, { foreignKey: "UserID" });
  Users.hasMany(UserCourses, { foreignKey: "UserID" });
  Users.hasMany(Forums, { foreignKey: "CreatedByUserID" });
  Users.hasMany(Threads, { foreignKey: "UserID" });
  Users.hasMany(Comments, { foreignKey: "CreatedByUserID" });
  Users.hasMany(Responses, { foreignKey: "CreatedByUserID" });
  Users.hasMany(ForumPosts, { foreignKey: "UserID" });
  Users.hasMany(ForumReplies, { foreignKey: "UserID" });
  Users.hasMany(UserStatus, { foreignKey: "UserID" });
  Users.hasMany(FriendRequests, { foreignKey: "SenderID" });
  Users.hasMany(Friends, { foreignKey: "UserID1" });
  Users.hasMany(PrivateMessages, { foreignKey: "SenderID" });
  Users.hasMany(ReadReceipts, { foreignKey: "UserID" });
  Users.hasMany(RealTimeUpdates, { foreignKey: "UserID" });
  Users.hasMany(GroupChats, { foreignKey: "CreatorUserID" });
  Users.hasMany(GroupChats, { foreignKey: "ModeratorUserID" });
  Users.hasMany(GroupMembers, { foreignKey: "UserID" });
  Users.hasMany(GroupMessages, { foreignKey: "SenderID" });
  Users.hasMany(GroupManagers, { foreignKey: "ManagerUserID" });
  Users.hasMany(ReadReceiptsGroups, { foreignKey: "UserID" });
  Users.hasMany(RealTimeGroupUpdates, { foreignKey: "UserID" });
  Users.hasMany(Attachments, { foreignKey: "AttachedByUserID" });
  Users.hasMany(Reactions, { foreignKey: "ReactionByUserID" });
  Users.hasMany(Announcements, { foreignKey: "CreatedByUserID" });
  Users.hasMany(Notifications, { foreignKey: "UserID" });
  Users.hasMany(Bans, { foreignKey: "BannedByUserID" });
  Users.hasMany(Bans, { foreignKey: "BannedUserID" });
  Users.hasMany(UserReports, { foreignKey: "ReporterID" });
  Users.hasMany(UserReports, { foreignKey: "ReportedUserID" });
  Users.hasMany(UserActivityLogs, { foreignKey: "UserID" });
  Users.hasOne(UserSettings, { foreignKey: "UserID" });
  //Users.hasMany(CommonAttributes, { foreignKey: "CreatedByUserID" });
  //Users.hasMany(CommonAttributes, { foreignKey: "UpdatedByUserID" });
  //Users.hasMany(CommonAttributes, { foreignKey: "DeletedByUserID" });
  Users.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // Genders model associations
  Genders.hasMany(Users, { foreignKey: "GenderID" });

  // Courses model associations
  Courses.hasMany(UserCourses, { foreignKey: "CourseID" });
  Courses.hasMany(Exams, { foreignKey: "CourseID" });
  Courses.hasMany(Forums, { foreignKey: "CourseID" });
  Courses.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // Roles model associations
  Roles.hasMany(UserRoles, { foreignKey: "RoleID" });
  Roles.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // UserRoles model associations
  UserRoles.belongsTo(Roles, { foreignKey: "RoleID" });
  UserRoles.belongsTo(Users, { foreignKey: "UserID" });
  UserRoles.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // UserCourses model associations
  UserCourses.belongsTo(Users, { foreignKey: "UserID" });
  UserCourses.belongsTo(Courses, { foreignKey: "CourseID" });
  UserCourses.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Departments model associations
  Departments.hasMany(FacultyMembers, { foreignKey: "DepartmentID" });
  Departments.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // FacultyMembers model associations
  FacultyMembers.belongsTo(Departments, { foreignKey: "DepartmentID" });
  FacultyMembers.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // CourseMaterials model associations
  CourseMaterials.belongsTo(Courses, { foreignKey: "CourseID" });
  CourseMaterials.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Forum model associations
  Forums.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });
  Forums.belongsTo(Courses, { foreignKey: "CourseID" });
  Forums.hasMany(ForumPosts, { foreignKey: "ForumID" });
  Forums.hasMany(ForumModerators, { foreignKey: "ForumID" });

  // Thread model associations
  Threads.belongsTo(Users, { foreignKey: "UserID" });
  Threads.belongsTo(Forums, { foreignKey: "ForumID" });
  Threads.hasMany(Comments, { foreignKey: "ThreadID" });
  Threads.hasMany(Reactions, { foreignKey: "ReactedToID", constraints: false });
  Threads.hasMany(Attachments, {
    foreignKey: "AttachedToID",
    constraints: false,
  });
  Threads.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // Comment model associations
  Comments.belongsTo(Threads, { foreignKey: "ThreadID" });
  Comments.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Comments.hasMany(Responses, { foreignKey: "CommentID" });
  Comments.hasMany(Reactions, {
    foreignKey: "ReactedToID",
    constraints: false,
  });
  Comments.hasMany(Attachments, {
    foreignKey: "AttachedToID",
    constraints: false,
  });
  Comments.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // Response model associations
  Responses.belongsTo(Comments, { foreignKey: "CommentID" });
  Responses.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Responses.hasMany(Reactions, {
    foreignKey: "ReactedToID",
    constraints: false,
  });
  Responses.hasMany(Attachments, {
    foreignKey: "AttachedToID",
    constraints: false,
  });
  Responses.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // ForumPosts model associations
  ForumPosts.belongsTo(Forums, { foreignKey: "ForumID" });
  ForumPosts.hasMany(ForumReplies, { foreignKey: "PostID" });
  ForumPosts.belongsTo(Users, { foreignKey: "UserID" });
  ForumPosts.hasMany(Reactions, {
    foreignKey: "ReactedToID",
    constraints: false,
  });
  ForumPosts.hasMany(Attachments, {
    foreignKey: "AttachedToID",
    constraints: false,
  });
  ForumPosts.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // ForumReplies model associations
  ForumReplies.belongsTo(ForumPosts, { foreignKey: "ForumPostID" });
  ForumReplies.belongsTo(Users, { foreignKey: "UserID" });
  ForumReplies.hasMany(Reactions, {
    foreignKey: "ReactedToID",
    constraints: false,
  });
  ForumReplies.hasMany(Attachments, {
    foreignKey: "AttachedToID",
    constraints: false,
  });
  ForumReplies.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // ForumModerators model associations
  ForumModerators.belongsTo(Forums, { foreignKey: "ForumID" });
  ForumModerators.belongsTo(Users, { foreignKey: "ModeratorUserID" });
  ForumModerators.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Polls model associations
  Polls.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Polls.hasMany(PollOptions, { foreignKey: "PollOptionID" });
  Polls.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // PollOptions model associations
  PollOptions.belongsTo(Polls, { foreignKey: "PollID" });
  PollOptions.hasMany(UserPollVotes, { foreignKey: "PollOptionID" });
  PollOptions.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // UserPollVotes model associations
  UserPollVotes.belongsTo(Users, { foreignKey: "UserID" });
  UserPollVotes.belongsTo(PollOptions, { foreignKey: "PollOptionID" });
  UserPollVotes.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Exam model associations
  Exams.belongsTo(Courses, { foreignKey: "CourseID" });
  Exams.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });
  Exams.belongsTo(ExamCategorys, { foreignKey: "CategoryID" });
  Exams.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Exams.hasMany(ExamSchedules, { foreignKey: "ExamID" });
  Exams.hasMany(Questions, { foreignKey: "ExamID" });

  // ExamCategory model associations
  ExamCategorys.hasMany(Exams, { foreignKey: "CategoryID" });

  // ExamSchedule model associations
  ExamSchedules.belongsTo(Exams, { foreignKey: "ExamID" });
  ExamSchedules.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  ExamSchedules.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Questions model associations
  Questions.belongsTo(QuestionTypes, { foreignKey: "QuestionTypeID" });
  Questions.hasMany(MCQOptions, { foreignKey: "QuestionID" });
  Questions.belongsTo(Exams, { foreignKey: "ExamID" });
  Questions.belongsTo(Courses, { foreignKey: "CourseID" });
  Questions.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Questions.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // QuestionType model associations
  QuestionTypes.hasMany(Questions, { foreignKey: "QuestionTypeID" });

  // MCQOptions model associations
  MCQOptions.belongsTo(Questions, { foreignKey: "QuestionID" });
  MCQOptions.hasOne(Answers, { foreignKey: "OptionID" });
  MCQOptions.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  MCQOptions.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // Answers model associations
  Answers.belongsTo(MCQOptions, { foreignKey: "OptionID" });
  Answers.belongsTo(Questions, { foreignKey: "QuestionID" });
  Answers.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Answers.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // UserResponses model associations
  UserResponses.belongsTo(Users, { foreignKey: "UserID" });
  UserResponses.belongsTo(Questions, { foreignKey: "QuestionID" });
  UserResponses.belongsTo(MCQOptions, { foreignKey: "AnswerID" });
  UserResponses.belongsTo(ExamAttempts, { foreignKey: "AttemptID" });
  UserResponses.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // ExamAttempts model associations
  ExamAttempts.belongsTo(Users, { foreignKey: "UserID" });
  ExamAttempts.belongsTo(Exams, { foreignKey: "ExamID" });

  // Results model associations
  Results.belongsTo(Users, { foreignKey: "UserID" });
  Results.belongsTo(Exams, { foreignKey: "ExamID" });
  Results.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // Events model associations
  Events.belongsTo(EventCategories, { foreignKey: "CategoryID" });
  Events.hasMany(EventImages, { foreignKey: "EventID" });
  Events.hasMany(GuestSpeakers, { foreignKey: "EventID" });
  Events.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // EventsCategory model associations
  EventCategories.hasMany(Events, { foreignKey: "CategoryID" });

  // EventCategoryMapping model associations
  EventCategoryMappings.belongsTo(Events, { foreignKey: "EventID" });
  EventCategoryMappings.belongsTo(EventCategories, {
    foreignKey: "CategoryID",
  });
  EventCategoryMappings.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  RecurringEvents.belongsTo(Events, { foreignKey: "EventID" });
  RecurringEvents.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Reminders model associations
  Reminders.belongsTo(Events, { foreignKey: "EventID" });
  Reminders.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // EventImages model associations
  EventImages.belongsTo(Events, { foreignKey: "EventID" });
  EventImages.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // GuestSpeakers model associations
  GuestSpeakers.belongsTo(Events, { foreignKey: "EventID" });
  GuestSpeakers.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // UserStatus model associations
  UserStatus.belongsTo(Users, { foreignKey: "UserID" });
  UserStatus.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // FriendRequests model associations
  FriendRequests.belongsTo(Users, { foreignKey: "SenderID" });
  FriendRequests.belongsTo(Users, { foreignKey: "ReceiverID" });
  FriendRequests.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Friends model associations
  Friends.belongsTo(Users, { foreignKey: "UserID1" });
  Friends.belongsTo(Users, { foreignKey: "UserID2" });
  Friends.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // PrivateMessages model associations
  PrivateMessages.belongsTo(Users, { foreignKey: "SenderID" });
  PrivateMessages.belongsTo(Users, { foreignKey: "ReceiverID" });
  PrivateMessages.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // ReadReceipts model associations
  ReadReceipts.belongsTo(PrivateMessages, { foreignKey: "MessageID" });
  ReadReceipts.belongsTo(Users, { foreignKey: "UserID" });

  // RealTimeUpdates model associations
  RealTimeUpdates.belongsTo(Users, { foreignKey: "UserID" });

  // GroupChat model associations
  GroupChats.belongsTo(Users, { foreignKey: "CreatorUserID" });
  GroupChats.belongsTo(Users, { foreignKey: "ModeratorUserID" });
  GroupChats.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // GroupMembers model associations
  GroupMembers.belongsTo(GroupChats, { foreignKey: "GroupID" });
  GroupMembers.belongsTo(Users, { foreignKey: "UserID" });
  GroupMembers.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // GroupMessages model associations
  GroupMessages.belongsTo(GroupChats, { foreignKey: "GroupID" });
  GroupMessages.belongsTo(Users, { foreignKey: "SenderID" });
  GroupMessages.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // GroupManager model associations
  GroupManagers.belongsTo(GroupChats, { foreignKey: "GroupID" });
  GroupManagers.belongsTo(Users, { foreignKey: "ManagerUserID" });
  GroupManagers.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // ReadReceiptsGroup model associations
  ReadReceiptsGroups.belongsTo(GroupMessages, { foreignKey: "GroupMessageID" });
  ReadReceiptsGroups.belongsTo(Users, { foreignKey: "UserID" });

  // RealTimeGroupUpdates model associations
  RealTimeGroupUpdates.belongsTo(GroupChats, { foreignKey: "GroupID" });
  RealTimeGroupUpdates.belongsTo(Users, { foreignKey: "UserID" });

  // Attachments model associations
  Attachments.belongsTo(Users, { foreignKey: "AttachedByUserID" });
  Attachments.belongsTo(AttachmentTypes, { foreignKey: "AttachmentTypeID" });
  Attachments.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // AttachmentType model associations
  AttachmentTypes.hasMany(Attachments, { foreignKey: "AttachmentTypeID" });

  // Reactions model associations
  Reactions.belongsTo(Users, { foreignKey: "ReactionByUserID" });
  Reactions.belongsTo(ReactionTypes, { foreignKey: "ReactionTypeID" });
  Reactions.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // ReactionType model associations
  ReactionTypes.hasMany(Reactions, { foreignKey: "ReactionTypeID" });

  // Announcements model associations
  Announcements.belongsTo(Users, { foreignKey: "CreatedByUserID" });
  Announcements.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Notifications model associations
  Notifications.belongsTo(Users, { foreignKey: "UserID" });
  Notifications.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // Bans model associations
  Bans.belongsTo(Users, { foreignKey: "BannedUserID" });
  Bans.belongsTo(Users, { foreignKey: "BannedByUserID" });
  Bans.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // UserReports model associations
  UserReports.belongsTo(Users, { foreignKey: "ReporterID" });
  UserReports.belongsTo(Users, { foreignKey: "ReportedUserID" });
  UserReports.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });

  // UserActivityLog model associations
  UserActivityLogs.belongsTo(Users, { foreignKey: "UserID" });
  UserActivityLogs.belongsTo(CommonAttributes, {
    foreignKey: "CommonAttributeID",
  });

  // UserSettings model associations
  UserSettings.belongsTo(Users, { foreignKey: "UserID" });
  UserSettings.belongsTo(CommonAttributes, { foreignKey: "CommonAttributeID" });
};

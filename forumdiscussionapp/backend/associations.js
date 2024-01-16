import * as models from "./models.js";

export const setAssociations = function () {
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

  // Define associations between models
  CommonAttributes.hasMany(Roles);
  Roles.belongsTo(CommonAttributes);

  Users.belongsTo(Genders);
  Genders.hasMany(Users);

  Users.belongsToMany(Roles, { through: UserRoles });
  Roles.belongsToMany(Users, { through: UserRoles });

  Users.belongsToMany(Courses, { through: UserCourses });
  Courses.belongsToMany(Users, { through: UserCourses });

  Departments.hasMany(FacultyMembers);
  FacultyMembers.belongsTo(Departments);

  Courses.hasMany(CourseMaterials);
  CourseMaterials.belongsTo(Courses);

  Forums.hasMany(Threads);
  Threads.belongsTo(Forums);

  Threads.hasMany(Comments);
  Comments.belongsTo(Threads);

  Comments.hasMany(Responses);
  Responses.belongsTo(Comments);

  ForumPosts.belongsTo(Threads);
  Threads.hasMany(ForumPosts);

  ForumReplies.belongsTo(Comments);
  Comments.hasMany(ForumReplies);

  Users.belongsToMany(Forums, {
    through: ForumModerators,
    as: "ModeratedForums",
  });
  Forums.belongsToMany(Users, {
    through: ForumModerators,
    as: "Moderators",
  });

  Polls.hasMany(PollOptions);
  PollOptions.belongsTo(Polls);

  Users.belongsToMany(Polls, { through: UserPollVotes });
  Polls.belongsToMany(Users, { through: UserPollVotes });

  ExamCategorys.hasMany(Exams);
  Exams.belongsTo(ExamCategorys);

  Exams.belongsTo(QuestionTypes);
  QuestionTypes.hasMany(Exams);

  Questions.hasMany(MCQOptions);
  MCQOptions.belongsTo(Questions);

  Exams.hasMany(Questions);
  Questions.belongsTo(Exams);

  Exams.hasMany(ExamSchedules);
  ExamSchedules.belongsTo(Exams);

  Exams.hasMany(Results);
  Results.belongsTo(Exams);

  Users.hasMany(UserResponses);
  UserResponses.belongsTo(Users);

  Events.hasMany(RecurringEvents);
  RecurringEvents.belongsTo(Events);

  Events.hasMany(Reminders);
  Reminders.belongsTo(Events);

  Events.belongsToMany(EventCategories, { through: EventCategoryMappings });
  EventCategories.belongsToMany(Events, { through: EventCategoryMappings });

  Events.hasMany(EventImages);
  EventImages.belongsTo(Events);

  Events.hasMany(GuestSpeakers);
  GuestSpeakers.belongsTo(Events);

  Users.hasMany(UserStatus);
  UserStatus.belongsTo(Users);

  Users.belongsToMany(Users, {
    through: FriendRequests,
    as: "RequestedFriends",
    foreignKey: "RequesterID",
  });
  Users.belongsToMany(Users, {
    through: FriendRequests,
    as: "ReceivedFriends",
    foreignKey: "ReceiverID",
  });

  Users.belongsToMany(Users, {
    through: Friends,
    as: "User1Friends",
    foreignKey: "User1ID",
  });
  Users.belongsToMany(Users, {
    through: Friends,
    as: "User2Friends",
    foreignKey: "User2ID",
  });

  PrivateMessages.hasMany(ReadReceipts);
  ReadReceipts.belongsTo(PrivateMessages);

  PrivateMessages.belongsTo(Users, { as: "Sender" });
  PrivateMessages.belongsTo(Users, { as: "Receiver" });

  RealTimeUpdates.belongsTo(Users);
  Users.hasMany(RealTimeUpdates);

  GroupChats.hasMany(GroupManagers);
  GroupManagers.belongsTo(GroupChats);

  GroupChats.hasMany(GroupMembers);
  GroupMembers.belongsTo(GroupChats);

  GroupChats.hasMany(GroupMessages);
  GroupMessages.belongsTo(GroupChats);

  GroupMessages.hasMany(ReadReceiptsGroups);
  ReadReceiptsGroups.belongsTo(GroupMessages);

  GroupChats.hasMany(RealTimeGroupUpdates);
  RealTimeGroupUpdates.belongsTo(GroupChats);

  Attachments.belongsTo(AttachmentTypes);
  AttachmentTypes.hasMany(Attachments);

  Attachments.belongsTo(Users, { as: "AttachedBy" });

  Reactions.belongsTo(ReactionTypes);
  ReactionTypes.hasMany(Reactions);

  Reactions.belongsTo(Users, { as: "ReactionBy" });

  Announcements.belongsTo(Users, { as: "CreatedBy" });

  Notifications.belongsTo(Users);
  Users.hasMany(Notifications);

  Bans.belongsTo(Users, { as: "BannedUser" });
  Bans.belongsTo(Users, { as: "BannedByUser" });

  UserReports.belongsTo(Users, { as: "Reporter" });
  UserReports.belongsTo(Users, { as: "ReportedUser" });

  UserActivityLogs.belongsTo(Users);

  UserSettings.belongsTo(Users);
};

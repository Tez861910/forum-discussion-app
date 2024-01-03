-- main.sql
-- Include CreateDB Table
EXEC sp_executesql @stmt = N':r createdb.sql';
-- Include Common Attributes Table
EXEC sp_executesql @stmt = N':r common-attributes.sql';
-- Include Roles Table
EXEC sp_executesql @stmt = N':r roles.sql';
-- Include Courses Table
EXEC sp_executesql @stmt = N':r courses.sql';
-- Include Users Table
EXEC sp_executesql @stmt = N':r users.sql';
-- Include Gender Table
EXEC sp_executesql @stmt = N':r gender.sql';
-- Include UserRoles Table
EXEC sp_executesql @stmt = N':r userroles.sql';
-- Include UserCourses Table
EXEC sp_executesql @stmt = N':r usercourses.sql';
-- Include Forums Table
EXEC sp_executesql @stmt = N':r forums.sql';
-- Include Threads Table
EXEC sp_executesql @stmt = N':r threads.sql';
-- Include Comments Table
EXEC sp_executesql @stmt = N':r comments.sql';
-- Include Responses Table
EXEC sp_executesql @stmt = N':r responses.sql';
-- Include ThreadsForums Table
EXEC sp_executesql @stmt = N':r threadsforums.sql';
-- Include ForumsPosts Table
EXEC sp_executesql @stmt = N':r forumsposts.sql';
-- Include ForumsReplies Table
EXEC sp_executesql @stmt = N':r forumsreplies.sql';
-- Include ForumsModerators Table
EXEC sp_executesql @stmt = N':r forummoderators.sql';
-- Include Polls Tables
EXEC sp_executesql @stmt = N':r polls.sql';
-- Include PollOptions Tables
EXEC sp_executesql @stmt = N':r poll-options.sql';
-- Include UserPollVotes Tables
EXEC sp_executesql @stmt = N':r user-poll-votes.sql';
-- Include Exam Tables
EXEC sp_executesql @stmt = N':r exam.sql';
-- Include QuestionType Tables
EXEC sp_executesql @stmt = N':r question-types.sql';
-- Include Question Tables
EXEC sp_executesql @stmt = N':r questions.sql';
-- Include MCQOptions Tables
EXEC sp_executesql @stmt = N':r mcq-options.sql';
-- Include Answer Tables
EXEC sp_executesql @stmt = N':r answers.sql';
-- Include UserResponses Tables
EXEC sp_executesql @stmt = N':r user-responses.sql';
-- Include Events Tables
EXEC sp_executesql @stmt = N':r events.sql';
-- Include RecurringEvents Tables
EXEC sp_executesql @stmt = N':r recurring-events.sql';
-- Include Reminders Tables
EXEC sp_executesql @stmt = N':r reminders.sql';
-- Include EventCategories Tables
EXEC sp_executesql @stmt = N':r event-categories.sql';
-- Include EventCategoryMapping Tables
EXEC sp_executesql @stmt = N':r event-category0mappings.sql';
-- Include GuestSpeakers Tables
EXEC sp_executesql @stmt = N':r guest-speakers.sql';
-- Include PrivateMessages Tables
EXEC sp_executesql @stmt = N':r private-messages.sql';
-- Include GroupChat Tables
EXEC sp_executesql @stmt = N':r group-chats.sql';
-- Include GroupMembers Tables
EXEC sp_executesql @stmt = N':r group-members.sql';
-- Include GroupMessages Tables
EXEC sp_executesql @stmt = N':r group-messages.sql';
-- Include AttachmentTypes Tables
EXEC sp_executesql @stmt = N':r attachmenttypes.sql';
-- Include Attachments Tables
EXEC sp_executesql @stmt = N':r attachments.sql';
-- Include ReactionType Tables
EXEC sp_executesql @stmt = N':r reaction-types.sql';
-- Include Reactions Tables
EXEC sp_executesql @stmt = N':r reactions.sql';
-- Include Announcements Tables
EXEC sp_executesql @stmt = N':r announcements.sql';
-- Include Notifications Tables
EXEC sp_executesql @stmt = N':r notifications.sql';
-- Include Bans Tables
EXEC sp_executesql @stmt = N':r bans.sql';
-- Include UserReports Tables
EXEC sp_executesql @stmt = N':r user-reports.sql';
-- Include UserActivityLog Tables
EXEC sp_executesql @stmt = N':r user-activity-logs.sql';
-- Include UserSettings Tables
EXEC sp_executesql @stmt = N':r user-settings.sql';
-- All other tables...
-- Optionally, you can add any additional SQL statements or queries here.
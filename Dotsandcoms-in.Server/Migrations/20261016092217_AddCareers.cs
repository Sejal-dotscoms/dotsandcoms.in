using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Dotsandcoms_in.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddCareers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CareerMassEmails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResumeSet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    HtmlBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecipientCount = table.Column<int>(type: "int", nullable: false),
                    Error = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerMassEmails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CareerOtps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(320)", maxLength: 320, nullable: false),
                    Purpose = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobSlug = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RevealAllowed = table.Column<bool>(type: "bit", nullable: false),
                    Used = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerOtps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CareerStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShortLabel = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    LockDays = table.Column<int>(type: "int", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    ShowInRadio = table.Column<bool>(type: "bit", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobApplications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferenceCode = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    DraftToken = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    IsSubmitted = table.Column<bool>(type: "bit", nullable: false),
                    CompletedStep = table.Column<int>(type: "int", nullable: false),
                    JobSlug = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(320)", maxLength: 320, nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhotoStoredName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhotoOriginalName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SchoolMedium = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Facebook = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkedIn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Twitter = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GraduationDegree = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GraduationInstitute = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GraduationCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostGraduationDegree = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostGraduationInstitute = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostGraduationCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsFresher = table.Column<bool>(type: "bit", nullable: false),
                    ExperienceYears = table.Column<int>(type: "int", nullable: false),
                    ExperienceMonths = table.Column<int>(type: "int", nullable: false),
                    CurrentlyWorking = table.Column<bool>(type: "bit", nullable: false),
                    CurrentCompany = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentDesignation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentDurationMonths = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentProfile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastCompany = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastDesignation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastDurationMonths = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastProfile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondCompany = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondDesignation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondDurationMonths = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondProfile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JoinDays = table.Column<int>(type: "int", nullable: true),
                    ResumeStoredName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResumeOriginalName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeardFrom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeardFromNote = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    StatusUpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReapplyAfter = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OfficeNote = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsOldResume = table.Column<bool>(type: "bit", nullable: false),
                    IsHidden = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplications_CareerStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "CareerStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "CareerStatuses",
                columns: new[] { "Id", "Icon", "IsDefault", "LockDays", "ShortLabel", "ShowInRadio", "SortOrder", "Summary" },
                values: new object[,]
                {
                    { 1, "unprocessed.png", true, 0, "Review Pending", false, 0, "Your application has been received and is waiting for review." },
                    { 4, "accept.png", false, 0, "Accepted", false, 4, "Your application has been accepted." },
                    { 10, "reject.png", false, 365, "Rejected English", true, 10, "Thank you for your application. The English communication requirement for this role was not met. You can apply again after 365 days." },
                    { 11, "reject.png", false, 365, "Rejected Profile", true, 11, "Thank you for your application. Your profile does not match the requirements of this role. You can apply again after 365 days." },
                    { 12, "future.png", false, 0, "Re-Apply", true, 12, "Please update your details and apply again for a current opening." },
                    { 13, "incomplete.png", false, 0, "Incomplete", true, 13, "Your application is incomplete. Please complete the missing details so it can be reviewed." },
                    { 14, "onhold.png", false, 0, "On-Hold No Vacancy", true, 14, "There is no open vacancy for this role at the moment. Your application is on hold." },
                    { 15, "process.png", false, 0, "Shortlisted", true, 15, "Your application has been shortlisted. Our team will contact you about the next step." },
                    { 16, "accept.png", false, 0, "Hired", true, 16, "You have been selected for this role. Our team will contact you about joining." },
                    { 17, "reject.png", false, 0, "Offer not accepted by Candidate", true, 17, "The offer for this role was not accepted." }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CareerOtps_Email_Purpose",
                table: "CareerOtps",
                columns: new[] { "Email", "Purpose" });

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_DraftToken",
                table: "JobApplications",
                column: "DraftToken");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_Email",
                table: "JobApplications",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_StatusId",
                table: "JobApplications",
                column: "StatusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CareerMassEmails");

            migrationBuilder.DropTable(
                name: "CareerOtps");

            migrationBuilder.DropTable(
                name: "JobApplications");

            migrationBuilder.DropTable(
                name: "CareerStatuses");
        }
    }
}

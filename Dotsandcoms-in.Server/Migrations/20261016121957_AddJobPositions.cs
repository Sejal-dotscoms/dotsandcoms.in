using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dotsandcoms_in.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddJobPositions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobPositions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Slug = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ApplyFor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    SeoTitle = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    SeoDescription = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    SeoKeywords = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    PageHeading = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    FreshersCanApply = table.Column<bool>(type: "bit", nullable: false),
                    IsVacancyOpen = table.Column<bool>(type: "bit", nullable: false),
                    CardTitle = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    CardSubtitles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IconUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CardBullets = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillIcons = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BodyHtml = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobPositions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobPositions_Slug",
                table: "JobPositions",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobPositions");
        }
    }
}

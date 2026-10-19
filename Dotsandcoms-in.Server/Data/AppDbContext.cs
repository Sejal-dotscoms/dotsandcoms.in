using Dotsandcoms_in.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Dotsandcoms_in.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
    : base(options) { }

        public DbSet<HostingOrder> HostingOrders { get; set; }

        /// <summary>Poweradmin administrator accounts.</summary>
        public DbSet<AdminUser> AdminUsers { get; set; }

        /// <summary>Blog posts managed via Poweradmin.</summary>
        public DbSet<Blog> Blogs { get; set; }

        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<CareerStatus> CareerStatuses { get; set; }
        public DbSet<CareerOtp> CareerOtps { get; set; }
        public DbSet<CareerMassEmail> CareerMassEmails { get; set; }
        public DbSet<JobPosition> JobPositions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Blog>(entity =>
            {
                // Store image as unlimited text (base64 or URL)
                entity.Property(b => b.ImageUrl).HasColumnType("nvarchar(max)");

                // Explicit decimal precision for any future numeric fields
                entity.Property(b => b.Title).HasMaxLength(500);
                entity.Property(b => b.ShortDescription).HasMaxLength(1000);
            });

            modelBuilder.Entity<HostingOrder>(entity =>
            {
                entity.Property(o => o.Price).HasColumnType("decimal(18,2)");
                entity.Property(o => o.TotalPrice).HasColumnType("decimal(18,2)");
            });

            modelBuilder.Entity<CareerStatus>(entity =>
            {
                entity.Property(s => s.ShortLabel).HasMaxLength(120);
                entity.Property(s => s.Summary).HasMaxLength(2000);
                entity.Property(s => s.Icon).HasMaxLength(80);
                entity.HasData(CareerStatusSeed.All);
            });

            modelBuilder.Entity<JobApplication>(entity =>
            {
                entity.Property(a => a.Email).HasMaxLength(320);
                entity.Property(a => a.ReferenceCode).HasMaxLength(40);
                entity.Property(a => a.DraftToken).HasMaxLength(80);
                entity.HasIndex(a => a.Email);
                entity.HasIndex(a => a.DraftToken);
                entity.Property(a => a.OfficeNote).HasColumnType("nvarchar(max)");
                entity.Property(a => a.CurrentProfile).HasColumnType("nvarchar(max)");
                entity.Property(a => a.LastProfile).HasColumnType("nvarchar(max)");
                entity.Property(a => a.SecondProfile).HasColumnType("nvarchar(max)");
                entity.HasOne(a => a.Status)
                    .WithMany()
                    .HasForeignKey(a => a.StatusId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<CareerOtp>(entity =>
            {
                entity.Property(o => o.Email).HasMaxLength(320);
                entity.Property(o => o.Code).HasMaxLength(12);
                entity.HasIndex(o => new { o.Email, o.Purpose });
            });

            modelBuilder.Entity<CareerMassEmail>(entity =>
            {
                entity.Property(m => m.HtmlBody).HasColumnType("nvarchar(max)");
                entity.Property(m => m.Subject).HasMaxLength(300);
            });

            modelBuilder.Entity<JobPosition>(entity =>
            {
                entity.Property(p => p.Slug).HasMaxLength(200);
                entity.HasIndex(p => p.Slug).IsUnique();
                entity.Property(p => p.ApplyFor).HasMaxLength(20);
                entity.Property(p => p.SeoTitle).HasMaxLength(500);
                entity.Property(p => p.SeoDescription).HasMaxLength(2000);
                entity.Property(p => p.SeoKeywords).HasMaxLength(1000);
                entity.Property(p => p.PageHeading).HasMaxLength(300);
                entity.Property(p => p.Summary).HasMaxLength(2000);
                entity.Property(p => p.Location).HasMaxLength(200);
                entity.Property(p => p.CardTitle).HasMaxLength(300);
                entity.Property(p => p.IconUrl).HasMaxLength(500);
                entity.Property(p => p.CardSubtitles).HasColumnType("nvarchar(max)");
                entity.Property(p => p.CardBullets).HasColumnType("nvarchar(max)");
                entity.Property(p => p.SkillIcons).HasColumnType("nvarchar(max)");
                entity.Property(p => p.BodyHtml).HasColumnType("nvarchar(max)");
            });
        }
    }
}

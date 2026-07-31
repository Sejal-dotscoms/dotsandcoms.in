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
        }
    }
}

using Microsoft.EntityFrameworkCore;

namespace JuliaAPI.Models;

public class JuliaContext : DbContext
{
    public JuliaContext(DbContextOptions<JuliaContext> options)
        : base(options)
    {
    }

    public DbSet<Jscripts> Jscripts { get; set; } = null!;
}
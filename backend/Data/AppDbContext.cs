using Microsoft.EntityFrameworkCore;
using InterviewAI.API.Models;
using System.Text.Json;

namespace InterviewAI.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Interview> Interviews => Set<Interview>();
    public DbSet<InterviewQuestion> InterviewQuestions => Set<InterviewQuestion>();
    public DbSet<CvUpload> CvUploads => Set<CvUpload>();
    public DbSet<LearningResource> LearningResources => Set<LearningResource>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // JSON serialization for List<string> columns
        modelBuilder.Entity<CvUpload>()
            .Property(c => c.ExtractedSkills)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        modelBuilder.Entity<CvUpload>()
            .Property(c => c.MissingKeywords)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        modelBuilder.Entity<CvUpload>()
            .Property(c => c.Strengths)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        modelBuilder.Entity<CvUpload>()
            .Property(c => c.Suggestions)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        modelBuilder.Entity<InterviewQuestion>()
            .Property(q => q.Strengths)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        modelBuilder.Entity<InterviewQuestion>()
            .Property(q => q.Weaknesses)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        modelBuilder.Entity<InterviewQuestion>()
            .Property(q => q.Tags)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Name = "Alex Thompson", Email = "alex@example.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"), Plan = "Pro", CreatedAt = DateTime.UtcNow }
        );

        modelBuilder.Entity<LearningResource>().HasData(
            new LearningResource { Id = 1, Title = "Mastering Load Balancers", Type = "Video Course", Duration = "2.5 Hours", Difficulty = "Advanced", Url = "#", Category = "System Design" },
            new LearningResource { Id = 2, Title = "Microservices Anti-patterns", Type = "Article", Duration = "5 min read", Difficulty = "Expert", Url = "#", Category = "Architecture" },
            new LearningResource { Id = 3, Title = "Design a TinyURL Service", Type = "Practice Task", Duration = "45 min", Difficulty = "Mid", Url = "#", Category = "System Design" }
        );
    }
}

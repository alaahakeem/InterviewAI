using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InterviewAI.API.Data;

namespace InterviewAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        // Simulated dashboard data matching the Figma design
        var recentInterviews = await db.Interviews
            .OrderByDescending(i => i.CreatedAt)
            .Take(5)
            .Select(i => new {
                i.Id,
                i.Role,
                Date = i.CreatedAt.ToString("MMM dd, yyyy"),
                Score = i.OverallScore,
                Status = i.Status
            }).ToListAsync();

        var totalInterviews = await db.Interviews.CountAsync();
        var avgScore = totalInterviews > 0 ? await db.Interviews.AverageAsync(i => (double)i.OverallScore) : 0;

        return Ok(new {
            stats = new {
                interviewsCompleted = totalInterviews,
                averageScore = Math.Round(avgScore, 1),
                improvementPercent = 18.4,
                nextGoal = "Senior Role",
                dailyGoalPercent = 75
            },
            recentInterviews,
            performanceChart = new[] {
                new { week = "W1", score = 65 },
                new { week = "W2", score = 58 },
                new { week = "W3", score = 72 },
                new { week = "W4", score = 68 },
                new { week = "W5", score = 78 },
                new { week = "W6", score = 82 },
                new { week = "Current", score = 88 }
            },
            recommended = new[] {
                new { title = "Behavioral Deep-Dive", desc = "Improve your STAR technique response scores.", duration = "15 MIN", difficulty = "HARD" },
                new { title = "System Design Basics", desc = "Practice scalability and load balancing topics.", duration = "30 MIN", difficulty = "EXPERT" },
                new { title = "Tone & Clarity Drill", desc = "Refine your vocal delivery for better confidence.", duration = "10 MIN", difficulty = "EASY" }
            }
        });
    }
}

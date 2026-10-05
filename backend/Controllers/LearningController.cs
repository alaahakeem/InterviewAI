using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InterviewAI.API.Data;

namespace InterviewAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LearningController(AppDbContext db) : ControllerBase
{
    [HttpGet("roadmap")]
    public IActionResult GetRoadmap()
    {
        return Ok(new {
            currentLevel = "Senior Engineer",
            progressPercent = 75,
            nextMilestone = "Staff Engineer",
            roadmapSteps = new object[] {
                new { title = "Data Structures Review", status = "Completed", completedDate = "Jul 12", description = "Mastered Big O analysis, Hash Maps, and Complex Tree traversals." },
                new { title = "System Design Basics", status = "Active", stepNumber = "Step 2 of 5", progressPercent = 45, description = "Active Module - Priority High", upcomingMock = "Load Balancing & Caching", keyReading = "Distributed Systems Primer" },
                new { title = "Scalability & Reliability", status = "Locked", description = "Deep dive into sharding, replication, and disaster recovery strategies." },
                new { title = "Behavioral Leadership", status = "Locked", description = "Preparing for the 'Managerial' round and conflict resolution scenarios." }
            },
            weeklyPlan = new object[] {
                new { day = "MON", activity = "Mock 1", type = "mock" },
                new { day = "TUE", activity = "Review", type = "active" },
                new { day = "WED", activity = "Reading", type = "reading" },
                new { day = "THU", activity = "Mock 2", type = "mock" },
                new { day = "FRI", activity = "Add Task", type = "add" },
                new { day = "SAT", activity = "Rest", type = "rest" },
                new { day = "SUN", activity = "Audit", type = "audit" }
            },
            aiCoachMessage = "You're making great progress in Distributed Systems. I've updated your roadmap to prioritize 'CAP Theorem' as it's a common gap for Staff level roles."
        });
    }

    [HttpGet("resources")]
    public async Task<IActionResult> GetResources()
    {
        var resources = await db.LearningResources.ToListAsync();
        return Ok(resources);
    }
}

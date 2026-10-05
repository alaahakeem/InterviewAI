using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InterviewAI.API.Data;
using InterviewAI.API.Models;

namespace InterviewAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InterviewController(AppDbContext db) : ControllerBase
{
    [HttpPost("setup")]
    public async Task<IActionResult> Setup([FromBody] SetupDto dto)
    {
        var mockQuestions = GetMockQuestions(dto.Type);
        var interview = new Interview
        {
            UserId = 1,
            Role = dto.Role,
            Type = dto.Type,
            Difficulty = dto.Difficulty,
            Status = "InProgress",
            Questions = mockQuestions
        };
        db.Interviews.Add(interview);
        await db.SaveChangesAsync();
        return Ok(new { interviewId = interview.Id, questions = mockQuestions.Select(q => new { q.Question, q.Tags }) });
    }

    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(int id)
    {
        var interview = await db.Interviews.Include(i => i.Questions).FirstOrDefaultAsync(i => i.Id == id);
        if (interview == null) return NotFound();
        interview.Status = "Completed";
        interview.OverallScore = Random.Shared.Next(75, 96);
        interview.TechnicalScore = Random.Shared.Next(85, 99);
        interview.CommunicationScore = Random.Shared.Next(75, 90);
        interview.ConfidenceScore = Random.Shared.Next(70, 85);
        interview.ProblemSolvingScore = Random.Shared.Next(60, 80);
        // Simulate AI evaluation of answers
        foreach (var q in interview.Questions)
        {
            q.Rating = new[] { "Excellent", "Average", "Excellent" }[Random.Shared.Next(3)];
            q.Strengths = new List<string> { "Used the STAR method effectively.", "Emphasized empathy and active listening." };
            q.Weaknesses = new List<string> { "Could quantify the outcome more specifically." };
            q.SuggestedAnswer = "A more structured answer using the STAR method with quantified outcomes would score higher.";
        }
        await db.SaveChangesAsync();
        return Ok(new { message = "Interview completed", interviewId = id });
    }

    [HttpGet("{id}/results")]
    public async Task<IActionResult> GetResults(int id)
    {
        var interview = await db.Interviews.Include(i => i.Questions).FirstOrDefaultAsync(i => i.Id == id);
        if (interview == null) return NotFound();
        return Ok(interview);
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetHistory()
    {
        var history = await db.Interviews
            .OrderByDescending(i => i.CreatedAt)
            .Select(i => new { i.Id, i.Role, i.Type, i.Difficulty, i.OverallScore, i.Status, Date = i.CreatedAt.ToString("MMM dd, yyyy") })
            .ToListAsync();
        return Ok(history);
    }

    private List<InterviewQuestion> GetMockQuestions(string type) => type switch
    {
        "Behavioral" => new List<InterviewQuestion> {
            new() { Question = "Tell me about a time you had to manage a conflicting set of priorities between stakeholders. How did you resolve the situation and what was the final outcome?", Tags = new List<string> { "LEADERSHIP", "BEHAVIORAL" } },
            new() { Question = "Describe a situation where you had to deliver bad news to a client or team member. How did you handle it?", Tags = new List<string> { "COMMUNICATION", "BEHAVIORAL" } },
            new() { Question = "What is your greatest weakness as a software engineer?", Tags = new List<string> { "SELF-AWARENESS", "BEHAVIORAL" } }
        },
        "Mixed" => new List<InterviewQuestion> {
            new() { Question = "Explain the concept of 'Event Loop' in Node.js to a non-technical person.", Tags = new List<string> { "TECHNICAL", "COMMUNICATION" } },
            new() { Question = "Tell me about a time you had to manage a conflicting set of priorities.", Tags = new List<string> { "LEADERSHIP", "BEHAVIORAL" } },
            new() { Question = "Design a URL shortening service like bit.ly.", Tags = new List<string> { "SYSTEM DESIGN", "TECHNICAL" } }
        },
        _ => new List<InterviewQuestion> {
            new() { Question = "Explain the concept of 'Event Loop' in Node.js to a non-technical person.", Tags = new List<string> { "TECHNICAL" } },
            new() { Question = "What is the difference between SQL and NoSQL databases? When would you use each?", Tags = new List<string> { "TECHNICAL", "DATABASE" } },
            new() { Question = "Design a URL shortening service like bit.ly. Walk me through your system design.", Tags = new List<string> { "SYSTEM DESIGN" } }
        }
    };
}

public record SetupDto(string Role, string Type, string Difficulty, bool VoiceMode);

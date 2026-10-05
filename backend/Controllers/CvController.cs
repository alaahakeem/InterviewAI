using Microsoft.AspNetCore.Mvc;
using InterviewAI.API.Data;
using InterviewAI.API.Models;

namespace InterviewAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CvController(AppDbContext db) : ControllerBase
{
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "No file uploaded" });

        if (!file.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
            return BadRequest(new { message = "Only PDF files are supported" });

        if (file.Length > 5 * 1024 * 1024)
            return BadRequest(new { message = "File size must be less than 5MB" });

        var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
        Directory.CreateDirectory(uploadsPath);
        var fileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
            await file.CopyToAsync(stream);

        // Simulate AI CV Analysis
        var cvUpload = new CvUpload
        {
            UserId = 1,
            FileName = file.FileName,
            FilePath = filePath,
            AtsScore = Random.Shared.Next(70, 96),
            ExtractedSkills = new List<string> { "User Experience (UX)", "Visual Design", "Prototyping", "Design Systems", "Accessibility" },
            MissingKeywords = new List<string> { "Strategic Vision", "Cross-functional Leadership", "Market Research", "Stakeholder Management" },
            Strengths = new List<string> {
                "Strong quantitative metrics used in experience descriptions.",
                "Consistent career progression with clear leadership roles.",
                "Excellent formatting for ATS readability."
            },
            Suggestions = new List<string> {
                "Quantify your early career achievements more specifically.",
                "Add a brief 'Professional Summary' section at the top.",
                "Link to your portfolio site more prominently."
            }
        };

        db.CvUploads.Add(cvUpload);
        await db.SaveChangesAsync();
        return Ok(new { id = cvUpload.Id, message = "CV uploaded and analyzed successfully" });
    }

    [HttpGet("analysis/{id}")]
    public async Task<IActionResult> GetAnalysis(int id)
    {
        var cv = await db.CvUploads.FindAsync(id);
        if (cv == null) return NotFound();
        return Ok(new {
            cv.Id,
            cv.FileName,
            cv.AtsScore,
            cv.ExtractedSkills,
            cv.MissingKeywords,
            cv.Strengths,
            cv.Suggestions,
            cv.UploadedAt
        });
    }
}

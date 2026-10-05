namespace InterviewAI.API.Models;

public class CvUpload
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public int AtsScore { get; set; }
    public List<string> ExtractedSkills { get; set; } = new();
    public List<string> MissingKeywords { get; set; } = new();
    public List<string> Strengths { get; set; } = new();
    public List<string> Suggestions { get; set; } = new();
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}

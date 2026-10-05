namespace InterviewAI.API.Models;

public class Interview
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string Role { get; set; } = string.Empty;
    public string Type { get; set; } = "Technical"; // Technical, Behavioral, Mixed
    public string Difficulty { get; set; } = "Mid";  // Entry, Mid, Senior
    public int OverallScore { get; set; }
    public int TechnicalScore { get; set; }
    public int CommunicationScore { get; set; }
    public int ConfidenceScore { get; set; }
    public int ProblemSolvingScore { get; set; }
    public string Status { get; set; } = "Completed"; // Completed, InProgress
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<InterviewQuestion> Questions { get; set; } = new List<InterviewQuestion>();
}

namespace InterviewAI.API.Models;

public class InterviewQuestion
{
    public int Id { get; set; }
    public int InterviewId { get; set; }
    public Interview? Interview { get; set; }
    public string Question { get; set; } = string.Empty;
    public string UserAnswer { get; set; } = string.Empty;
    public string Rating { get; set; } = "Average"; // Excellent, Average, Poor
    public List<string> Strengths { get; set; } = new();
    public List<string> Weaknesses { get; set; } = new();
    public string SuggestedAnswer { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
}

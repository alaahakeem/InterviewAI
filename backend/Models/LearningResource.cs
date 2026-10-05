namespace InterviewAI.API.Models;

public class LearningResource
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // Video Course, Article, Practice Task
    public string Duration { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}

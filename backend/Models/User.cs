namespace InterviewAI.API.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Plan { get; set; } = "Free"; // Free, Pro, Enterprise
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}

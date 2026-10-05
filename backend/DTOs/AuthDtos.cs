namespace InterviewAI.API.DTOs;

public record RegisterDto(string Name, string Email, string Password);
public record LoginDto(string Email, string Password);
public record AuthResponseDto(string Token, UserDto User);
public record UserDto(int Id, string Name, string Email, string Plan);

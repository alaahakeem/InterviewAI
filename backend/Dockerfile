FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy everything and build
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

# Hugging Face exposes port 7860 by default for web services
EXPOSE 7860
ENV ASPNETCORE_URLS=http://+:7860

ENTRYPOINT ["dotnet", "InterviewAI.API.dll"]

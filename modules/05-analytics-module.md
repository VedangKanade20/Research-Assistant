# Analytics Module

## Responsibility
Track application usage and AI consumption metrics.

## Dashboard Metrics
- Total documents uploaded
- Total AI requests
- Total tokens used
- Average response time
- Questions asked
- Summaries generated

## Data Sources
- documents table
- ai_requests table
- chat history
- token usage logs

## Endpoints
- GET /dashboard/metrics
- GET /dashboard/activity

## Example Metrics Response
{
  "documents": 12,
  "aiRequests": 54,
  "tokensUsed": 182340,
  "questionsAsked": 41,
  "summariesGenerated": 12
}

## UI Usage
Display metrics as dashboard cards with recent activity and trends.

## Interview Talking Points
- Why track token usage
- Cost monitoring
- Usage analytics
- Future billing integration

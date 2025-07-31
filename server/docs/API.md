# Zanist API Documentation

## Overview

The Zanist API provides comprehensive backend functionality for the scientific research platform. It includes authentication, content management, search, analytics, and more.

## Base URL

- Development: `http://localhost:3001/api`
- Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication using Bearer tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication (`/api/auth`)

#### POST `/auth/register`
Register a new user account.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST `/auth/login`
Login with email and password.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/auth/logout`
Logout current user (requires authentication).

#### GET `/auth/me`
Get current user profile (requires authentication).

#### PUT `/auth/profile`
Update user profile (requires authentication).

**Body:**
```json
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

### Articles (`/api/articles`)

#### GET `/articles`
Get published articles with optional filters.

**Query Parameters:**
- `category` - Filter by category slug
- `university` - Filter by university slug
- `featured` - Filter featured articles (true/false)
- `search` - Search in title, summary, content
- `timeFilter` - Filter by time (week/month/year)
- `limit` - Number of results (default: 20)
- `offset` - Pagination offset (default: 0)

#### GET `/articles/:slug`
Get single article by slug.

#### POST `/articles`
Create new article (requires authentication).

**Body:**
```json
{
  "title": "Article Title",
  "summary": "Article summary",
  "content": "Full article content",
  "imageUrl": "https://example.com/image.jpg",
  "categoryId": "uuid",
  "universityId": "uuid",
  "professorId": "uuid",
  "referenceLink": "https://doi.org/...",
  "tags": ["tag1", "tag2"],
  "readTime": 5,
  "isFeatured": false,
  "isPublished": true
}
```

#### PUT `/articles/:id`
Update article (requires authentication and ownership or moderator role).

#### DELETE `/articles/:id`
Delete article (requires moderator role).

#### PATCH `/articles/:id/featured`
Toggle featured status (requires moderator role).

#### GET `/articles/:id/comments`
Get article comments.

#### POST `/articles/:id/comments`
Add comment to article (requires authentication).

### Categories (`/api/categories`)

#### GET `/categories`
Get all active categories.

**Query Parameters:**
- `includeInactive` - Include inactive categories (true/false)

#### GET `/categories/:slug`
Get category by slug.

#### POST `/categories`
Create new category (requires moderator role).

#### PUT `/categories/:id`
Update category (requires moderator role).

#### DELETE `/categories/:id`
Delete category (requires moderator role).

#### GET `/categories/:slug/articles`
Get articles in category.

### Universities (`/api/universities`)

#### GET `/universities`
Get all universities.

**Query Parameters:**
- `country` - Filter by country
- `ranking` - Filter by maximum ranking
- `limit` - Number of results
- `offset` - Pagination offset

#### GET `/universities/:slug`
Get university by slug.

#### GET `/universities/country/:country`
Get universities by country.

#### GET `/universities/:slug/articles`
Get university's articles.

#### GET `/universities/:slug/professors`
Get university's professors.

#### POST `/universities`
Create university (requires moderator role).

#### PUT `/universities/:id`
Update university (requires moderator role).

#### GET `/universities/meta/countries`
Get countries with university counts.

### Professors (`/api/professors`)

#### GET `/professors`
Get all professors.

**Query Parameters:**
- `university` - Filter by university slug
- `field` - Filter by research field
- `limit` - Number of results
- `offset` - Pagination offset

#### GET `/professors/:id`
Get professor by ID.

#### GET `/professors/:id/articles`
Get professor's articles.

#### GET `/professors/search/:query`
Search professors.

#### POST `/professors`
Create professor (requires moderator role).

#### PUT `/professors/:id`
Update professor (requires moderator role).

#### DELETE `/professors/:id`
Delete professor (requires moderator role).

### Search (`/api/search`)

#### GET `/search`
Global search across all content.

**Query Parameters:**
- `q` - Search query (required)
- `category` - Filter by category
- `university` - Filter by university
- `limit` - Number of results
- `offset` - Pagination offset

#### GET `/search/suggestions`
Get search suggestions/autocomplete.

**Query Parameters:**
- `q` - Search query
- `limit` - Number of suggestions

#### GET `/search/popular`
Get popular search terms.

### Analytics (`/api/analytics`)

#### GET `/analytics/dashboard`
Get dashboard analytics (requires moderator role).

#### GET `/analytics/articles`
Get article analytics (requires moderator role).

#### GET `/analytics/users`
Get user analytics (requires moderator role).

#### POST `/analytics/pageview`
Log page view.

### Newsletter (`/api/newsletter`)

#### POST `/newsletter/subscribe`
Subscribe to newsletter.

**Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "subscriptionType": "weekly"
}
```

#### POST `/newsletter/unsubscribe`
Unsubscribe from newsletter.

#### GET `/newsletter/subscribers`
Get newsletter subscribers (requires moderator role).

#### POST `/newsletter/send`
Send newsletter (requires moderator role).

### Upload (`/api/upload`)

#### POST `/upload/image`
Upload single image (requires moderator role).

#### POST `/upload/images`
Upload multiple images (requires moderator role).

#### GET `/upload/files`
Get uploaded files list (requires moderator role).

#### DELETE `/upload/files/:filename`
Delete uploaded file (requires moderator role).

### RSS (`/api/rss`)

#### GET `/rss/articles.xml`
RSS feed for all articles.

#### GET `/rss/category/:slug.xml`
RSS feed for category articles.

#### GET `/rss/university/:slug.xml`
RSS feed for university articles.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- 100 requests per 15 minutes per IP address
- Additional limits may apply to specific endpoints

## CORS

The API supports CORS for web applications. Allowed origins are configured based on the environment.
# Game API
This API provides endpoints for managing a catalog of games and their associated genres.

## Prerequisites
Before you can run this API, you will need the following:

- Node.js (version 14 or higher)
- MySQL (version 5 or higher)

## Installation
1. Clone the repository: git clone https://github.com/your-username/game-catalog-api.git
2. Install dependencies: npm install
3. Create a MySQL database for the API
4. Copy the .env  file to a new file named .env and set the environment variables accordingly:
``` bash
DATABASE_URL='mysql://user:password@localhost:3306/game-house'
```
5. Run the database migrations: npx prisma migrate
6. Start the API server: npm run start
## Usage
Once the API is running, you can access the following endpoints:

### GET /games
Returns a list of games. Optional query parameters:

- **skip** : Number of records to skip. Default: 0.
- **take**: Number of records to return. Default: 10.
- **cursor** : The cursor to use for pagination. This should be the id of the last record returned in the previous request.
GET /games/:id
Returns a single game by its id.

### POST /games
Creates a new game. Required request body:

```json
{
  "id": 1,
  "title": "The Witcher 3: Wild Hunt",
  "release_date": "2015-05-18T00:00:00.000Z",
  "publisher": "CD Projekt Red",
  "description": "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri —   the Child of Prophecy, a living weapon that can alter the shape of the world.",
  "cover_image_url": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r2t.jpg",
  "genres": ["RPG", "Adventure"],
  "platform": ["PC", "PlayStation 4", "Xbox One"]
}
```
### PUT /games/:id
Updates an existing game by its id. Required request body:

### DELETE /games/:id
Deletes a game by its id.

## Error Handling
If the API encounters an error, it will return a JSON response with an error property containing a descriptive error message.

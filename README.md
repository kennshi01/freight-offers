# Freight Offers Inbox

Freight Offers Inbox is a full-stack practice project for managing freight offers
inside a logistics company.

Dispatchers can review incoming offers, filter them, update their status, manage
broker contacts, and view accepted loads. The project keeps the React frontend
and ASP.NET Core backend as separate applications inside the same repository.

## Technology Stack

### Frontend

- React 18
- Vite
- React Router
- Lucide React icons
- Plain CSS
- Fetch API
- localStorage fallback

### Backend

- ASP.NET Core Web API
- Controller-based API
- Entity Framework Core
- SQLite
- Swagger / OpenAPI

## Project Structure

```text
freight-offers/
  frontend/
    src/
      api/          API client and endpoint functions
      components/   Reusable UI components
      constants/    Status, priority, equipment, and route constants
      data/         Mock fallback data
      pages/        Application pages
      services/     localStorage helpers
  backend/
    Controllers/    Freight offers and brokers API controllers
    Data/           EF Core context and database initializer
    Dtos/           Create and update request models
    Models/         Database entities and valid values
```

## Features

- Dashboard with offer statistics and accepted revenue
- Create, edit, delete, review, accept, and reject freight offers
- Filter offers by route, status, equipment type, and priority
- Manage broker contacts
- View accepted loads
- Fake frontend login page
- API-first frontend with localStorage and mock-data fallback
- SQLite database created automatically on backend startup
- Swagger interface for testing API endpoints
- CORS configured for the React development server

## Prerequisites

Install:

- [Node.js](https://nodejs.org/) with npm
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

## Getting Started

### 1. Configure the frontend

Create `frontend/.env` using `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 2. Run the backend

Open a terminal from the project root:

```powershell
cd backend
dotnet restore
dotnet run
```

The backend runs at:

```text
http://localhost:5000
```

On its first startup, the backend creates `backend/freight_offers.db` and seeds
the empty database with:

- 3 brokers
- 5 freight offers

### 3. Run the frontend

Open another terminal from the project root:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## Frontend Data Behavior

The frontend uses the ASP.NET Core API as its primary data source.

When the backend is unavailable, the frontend continues working with mock data
and localStorage. Changes made during fallback mode remain local and are not
automatically synchronized to the backend later.

## API Endpoints

### Freight Offers

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/freight-offers` | Get all freight offers |
| `GET` | `/api/freight-offers/{id}` | Get one freight offer |
| `POST` | `/api/freight-offers` | Create a freight offer |
| `PUT` | `/api/freight-offers/{id}` | Update a freight offer |
| `DELETE` | `/api/freight-offers/{id}` | Delete a freight offer |

`GET /api/freight-offers` supports these optional query parameters:

- `pickupCity`
- `deliveryCity`
- `status`
- `equipmentType`
- `priority`

Example:

```text
http://localhost:5000/api/freight-offers?status=New&priority=High
```

### Brokers

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/brokers` | Get all brokers |
| `GET` | `/api/brokers/{id}` | Get one broker |
| `POST` | `/api/brokers` | Create a broker |
| `PUT` | `/api/brokers/{id}` | Update a broker |
| `DELETE` | `/api/brokers/{id}` | Delete a broker |

## Valid Freight Offer Values

### Status

- `New`
- `Reviewed`
- `Accepted`
- `Rejected`

### Equipment Type

- `Dry Van`
- `Reefer`
- `Flatbed`
- `Step Deck`

### Priority

- `Low`
- `Medium`
- `High`

## Swagger

With the backend running, open:

```text
http://localhost:5000/swagger
```

Swagger can be used to inspect and test every API endpoint directly from the
browser.

## Useful Commands

### Frontend

```powershell
cd frontend
npm run dev
npm run build
npm run preview
```

### Backend

```powershell
cd backend
dotnet restore
dotnet build
dotnet run
```

## CORS

The backend allows requests from:

```text
http://localhost:5173
```

If the frontend development URL changes, update the CORS origin in
`backend/Program.cs`.

## Current Limitations

- Authentication and authorization are not implemented.
- The fake login page does not validate credentials.
- Fallback localStorage changes are not synchronized to SQLite.
- The database uses `EnsureCreated` for simplicity instead of EF Core migrations.

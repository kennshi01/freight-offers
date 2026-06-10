# Freight Offers Project

The frontend and backend are separate applications inside the same parent folder.

```text
freight-offers-project/
  frontend/   React + Vite
  backend/    ASP.NET Core Web API
```

## Run the frontend

```powershell
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Run the backend

Install the .NET 8 SDK, then run:

```powershell
cd backend
dotnet run
```

The backend runs at `http://localhost:5000`.

```text
http://localhost:5000/api/freight-offers
http://localhost:5000/api/brokers
http://localhost:5000/swagger
```

The React app uses the API as its primary data source. If the API is unavailable,
it falls back to mock data and localStorage. Create `frontend/.env` from
`frontend/.env.example` so Vite knows the backend URL.

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

The backend runs at `http://localhost:5000`. Its sample health endpoint is:

```text
http://localhost:5000/api/health
```

The React app still uses mock data and localStorage. To connect it to the API later,
create `frontend/.env` from `frontend/.env.example`.

# Job Portal Frontend

This is the React.js frontend for the Job Portal application.

## Features

- Modern React 18+ with Hooks
- Vite for fast development and building
- Responsive design
- Component-based architecture
- API integration with backend

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── services/         # API calls and external services
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── App.jsx           # Main App component
│   ├── App.css           # App styles
│   ├── main.jsx          # React DOM entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

The frontend communicates with the backend API running on `http://localhost:8000`. API calls are organized in the `src/services/api.js` file.

## Development

The application uses Vite for fast development with Hot Module Replacement (HMR). Changes to components will be reflected instantly in the browser.

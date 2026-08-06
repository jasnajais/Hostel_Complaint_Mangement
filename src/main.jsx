import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeModeProvider } from './components/ThemeModeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeModeProvider>
    <App />
  </ThemeModeProvider>
);

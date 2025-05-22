import  { ConversationProvider } from './contexts/ConversationContext';
import { UiProvider } from './contexts/UiContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <UiProvider>
      <ConversationProvider>
        <Dashboard />
      </ConversationProvider>
    </UiProvider>
  );
}

export default App;
 
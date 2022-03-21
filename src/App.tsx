import SnackbarProvider from './components/snackbar-context';
import RoutesComp from './routes';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <RoutesComp></RoutesComp>
      </SnackbarProvider>
    </div>
  );
}

export default App;

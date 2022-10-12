import { AppWrapper } from "./AppWrapper";
import MainDashboard from "./components/MainDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppWrapper>
      <Navbar />
      <div className="App">
        <MainDashboard />
      </div>
    </AppWrapper>
  );
}

export default App;

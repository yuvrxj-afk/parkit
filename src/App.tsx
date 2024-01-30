import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./components/Page";
import ParkingLot from "./components/parking/ParkingLot";
import { ParkingProvider } from "./context/ParkingContext";

function App() {
  return (
    <Router>
      <ParkingProvider>
        <Routes>
          <Route path="/" Component={Page} />
          <Route path="/parkinglot/:numSpaces" Component={ParkingLot} />
        </Routes>
      </ParkingProvider>
    </Router>
  );
}

export default App;

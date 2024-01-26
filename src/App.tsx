import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./components/Page";
import ParkingLot from "./components/parking/ParkingLot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Page} />
        <Route path="/parkinglot/:numSpaces" Component={ParkingLot}/>
      </Routes>
    </Router>
  );
}

export default App;

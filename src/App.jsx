import { Outlet } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  // Simple layout wrapper: header is inside each page currently,
  // so App just renders the route content.
  return (
    <div className="bg-light min-vh-100">
      <Outlet />
    </div>
  );
}

export default App;

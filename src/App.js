import Todo from "./page/Todo";
import Auth from "./page/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

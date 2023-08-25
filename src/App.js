import Todo from "./page/Todo";
import Auth from "./page/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path='*' element={<Auth />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

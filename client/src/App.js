import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import CollectedBookInfo from "./pages/CollectedBookInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import search from "./pages/Search";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import BookCollection from "./pages/BookCollection/BookCollection";

function App() {

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/search">
          <ProtectedRoute Component={search} />
        </Route>
        <Route exact path="/collection">
          <ProtectedRoute Component={BookCollection}/>
        </Route>
        <Route exact path="/:bookId">
          <ProtectedRoute Component={CollectedBookInfo} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

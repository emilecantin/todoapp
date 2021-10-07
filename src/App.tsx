import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Tasks } from "./pages/Tasks";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/tasks" component={Tasks} />
            <Redirect to="/tasks" />
          </Switch>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;

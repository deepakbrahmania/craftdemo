import React from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { Transaction } from "./containers/transactions/Transaction";
import { NoMatchFound } from "./containers/no-match/noMatch";
import { HomePage } from "./containers/homepage/homepage";
import { Accounts } from "./containers/accounts/Accounts";
import { Budget } from "./containers/budget/Budget";

import { NavigationLinks } from "./components/navigation-links/NavigationLink";
import { Header } from "./components/header/Header";
import { Tags } from "./containers/tags/Tags";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className={classNames("row")}>
          <div className={classNames("col")}>
            <Header title={"Craft Demo Intuit"} user={"Deepak"} />
          </div>
        </div>
        <div className={classNames("row", "appContainer")}>
          <div className={classNames("col", "menuWrapper")}>
            <NavigationLinks />
          </div>
          <div className={classNames("col", "contentWrapper")}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="*" element={<NoMatchFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

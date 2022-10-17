import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuotes from "./pages/AllQuotes";
// import QuoteDetails from "./pages/QuoteDetails";
// import NewQuotes from "./pages/NewQuotes";
// import NoQuotes from './pages/NoQuotes';

const NotFound = lazy(() => import("./pages/NotFound"));
const QuoteDetails = lazy(() => import("./pages/QuoteDetails"));
const NewQuotes = lazy(() => import("./pages/NewQuotes"));
const AllQuotes = lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" component={AllQuotes} exact />
          <Route path="/quotes/:quoteId" component={QuoteDetails} />
          <Route path="/new-quotes" component={NewQuotes} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;

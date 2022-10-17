import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function QuoteDetails() {
  const match = useRouteMatch();
  const params = useParams();
  const {
    sendRequest: fetchSingleQuote,
    status,
    data: loadedSingleQuoteData,
    error,
  } = useHttp(getSingleQuote, true);
  // console.log(match)
  useEffect(() => {
    fetchSingleQuote(params.quoteId);
  }, [fetchSingleQuote, params]);

  // const quoteData = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focus">{error}</p>;
  }

  if(!loadedSingleQuoteData.text){
    return <NoQuotesFound/>
  }

  return (
    <div>
      <HighlightedQuote author={loadedSingleQuoteData.author} text={loadedSingleQuoteData.text} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`} component={Comments} />
    </div>
  );
}

export default QuoteDetails;

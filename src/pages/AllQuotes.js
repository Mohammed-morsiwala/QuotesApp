import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "nambi", text: "The Nambi Effect" },
//   { id: "q2", author: "newton", text: "The Newton Effect" },
//   { id: "q3", author: "hc verma", text: "The hc verma Effect" },
// ];

function AllQuotes() {
  const {
    sendRequest: fetchAllQuotes,
    status,
    data: loadedData,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    fetchAllQuotes();
  }, [fetchAllQuotes]);

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

  if (status === "completed" && (!loadedData || loadedData.length === 0)){
    return <NoQuotesFound/>
  }
    return <QuoteList quotes={loadedData} />;
}

export default AllQuotes;

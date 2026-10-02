import {
  handleQuoteRequest,
  type QuoteEnv,
} from "../../src/server/quoteRequest";

export const onRequest = ({
  request,
  env,
}: {
  request: Request;
  env: QuoteEnv;
}) => handleQuoteRequest(request, env);

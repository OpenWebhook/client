import axios, { AxiosRequestConfig } from "axios";
import { Webhook } from "./WebhookDisplay/WebhookList.component";

let alertHasBeenDisplayed = 0;

export const forwardWebhookToLocalhost = async (
  baseUrl: string,
  webhook: Webhook,
  setWebhookResponse?: Function
): Promise<void> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${baseUrl}${webhook.path}`,
    data: JSON.parse(webhook.body),
  };

  axios
    .request(options)
    .then(function (response) {
      setWebhookResponse && setWebhookResponse({ code: response.status });
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(
        "Read documentation if you have cors issues https://www.openwebhook.io/docs/troubleshoot-replay-webhook/",
        error
      );
      setWebhookResponse && setWebhookResponse({ error: error.toString() });
      const userInitiatedRequest = setWebhookResponse;
      const shouldDisplayAlert =
        error.code === "ERR_NETWORK" &&
        alertHasBeenDisplayed < 3 &&
        userInitiatedRequest;
      if (shouldDisplayAlert) {
        alertHasBeenDisplayed += 1;
        alert("A network error occurred:\n" + "Open the console to debug.");
      }
    });
};

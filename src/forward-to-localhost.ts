import axios, { AxiosRequestConfig } from "axios";
import { Webhook } from "./WebhookDisplay/WebhookList.component";

export const forwardWebhookToLocalhost = async (
  baseUrl: string,
  webhook: Webhook,
  setWebhookResponse?: Function
): Promise<void> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${baseUrl}/${webhook.path}`,
    data: JSON.parse(webhook.body),
  };

  axios
    .request(options)
    .then(function (response) {
      setWebhookResponse && setWebhookResponse({ code: response.status });
      console.log(response.data);
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        alert("A network error occurred:\n" + "Open the console to debug.");
      }
      setWebhookResponse && setWebhookResponse({ error: error.toString() });
      console.error(
        "Read documentation if you have cors issues https://www.openwebhook.io/docs/troubleshoot-replay-webhook/",
        error
      );
    });
};

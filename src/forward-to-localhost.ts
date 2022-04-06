import { Webhook } from "./WebhookDisplay/WebhookList";
import axios, { Method, AxiosRequestConfig } from "axios";

export const forwardWebhookToLocalhost = async (
  baseUrl: string,
  webhook: Webhook
): Promise<void> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${baseUrl}/webhook/${webhook.path}`,
    data: JSON.parse(webhook.body),
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

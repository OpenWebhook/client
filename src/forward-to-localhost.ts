import { Webhook } from "./WebhookList";
import axios, { Method, AxiosRequestConfig } from "axios";

export const forwardWebhookToLocalhost = async (
  webhook: Webhook
): Promise<void> => {
  const baseUrl = "http://localhost:3001";
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

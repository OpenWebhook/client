import axios, { AxiosRequestConfig } from "axios";
import { Webhook } from "./WebhookDisplay/WebhookList.component";

export const forwardWebhookToLocalhost = async (
  baseUrl: string,
  webhook: Webhook
): Promise<void> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${baseUrl}/${webhook.path}`,
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

import { Buffer } from "buffer";

export const decodeJWT = <
  Payload extends Record<string, any>,
  Header extends Record<string, any>
>(
  JWT: string
): { payload: Payload; header: Header } => {
  if (typeof JWT !== "string") {
    throw new Error("Invalid token specified");
  }

  try {
    const header = JSON.parse(
      Buffer.from(JWT.split(".")[0], "base64").toString()
    );
    const payload = JSON.parse(
      Buffer.from(JWT.split(".")[1], "base64").toString()
    );
    return { header, payload };
  } catch (e) {
    throw new Error("Invalid token specified: " + e);
  }
};

export const hasPropertyStatus = (
  object: unknown
): object is { status: string } => {
  return (
    !!object &&
    typeof object === "object" &&
    typeof (object as Record<string, any>)["status"] === "string"
  );
};

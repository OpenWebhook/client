import { groupFileByPath, indexBySubPath } from "./group-file-by-path.utils";

describe("group-file-by-path", () => {
  const tests: Array<{ input: `/${string}`[]; output: any }> = [
    { input: [], output: {} },
    { input: ["/a"], output: { "/a": {} } },
    { input: ["/a", "/a"], output: { "/a": {} } },
    { input: ["/a", "/a", "/b"], output: { "/a": {}, "/b": {} } },
    { input: ["/a/b"], output: { "/a": { "/b": {} } } },
    { input: ["/a/b", "/a"], output: { "/a": { "/b": {} } } },
    { input: ["/a", "/a/b", "/a"], output: { "/a": { "/b": {} } } },
    {
      input: ["/a/b1", "/a/b1", "/a/b2", "/a/b2"],
      output: { "/a": { "/b1": {}, "/b2": {} } },
    },
    {
      input: ["/a/b1/c1", "/a/b1/c2", "/a/b2/c1", "/a/b2/c2"],
      output: {
        "/a": {
          "/b1": { "/c1": {}, "/c2": {} },
          "/b2": { "/c1": {}, "/c2": {} },
        },
      },
    },
    {
      input: [
        "/api/v1/budget-insight/webhook/connection/:id",
        "/api/v1/budget-insight/webhook/croute/synced",
        "/api/v1/budget-insight/webhook/bank/synced",
        "/any-path/path-to/:id",
        "/any-path/path-to/webhook",
        "/:id/path-to/:id",
        "//api/v1/budget-insight/webhook/connection/synced",
        "/api/v1/budget-insight/webhook/connection/synced",
        "/:id/path-to/webhook",
        "/:id/path-to/:id/croute",
        "///api/v1/budget-insight/:id/connection/:id",
        "/any-path/:id/webhook",
        "/any-path/:id/webhook/:id",
        "////api/v1/budget-insight/webhook/connection/synced",
      ],
      output: {
        "/:id": {
          "/path-to": {
            "/:id": {
              "/croute": {},
            },
            "/webhook": {},
          },
        },
        "/any-path": {
          "/:id": {
            "/webhook": {
              "/:id": {},
            },
          },
          "/path-to": {
            "/:id": {},
            "/webhook": {},
          },
        },
        "/api": {
          "/v1": {
            "/budget-insight": {
              "/:id": {
                "/connection": {
                  "/:id": {},
                },
              },
              "/webhook": {
                "/bank": {
                  "/synced": {},
                },
                "/connection": {
                  "/:id": {},
                  "/synced": {},
                },
                "/croute": {
                  "/synced": {},
                },
              },
            },
          },
        },
      },
    },
  ];

  tests.forEach((test, index) => {
    it(`Test number ${index}`, () => {
      const res = groupFileByPath(test.input);
      expect(res).toStrictEqual(test.output);
    });
  });
});

describe("index-by-subpath", () => {
  it(`split and creates key in object`, () => {
    const res = indexBySubPath("/a/b/c/d/e");
    expect(res).toStrictEqual({
      "/a": { "/b": { "/c": { "/d": { "/e": {} } } } },
    });
  });
});

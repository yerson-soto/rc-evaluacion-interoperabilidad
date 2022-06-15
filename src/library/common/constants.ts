import { include, reverse } from "named-urls";

export const paths = {
  dashboard: "/",
  evaluations: include("/evaluaciones", {
    index: "",
    detail: include(":uid", {
      index: "",
      evaluate: include("iniciar", {
        index: "",
        domain: ":domainSlug",
      }),
    }),
  }),

  // route with params
  article: "/article/:articleId",

  // route with optional params
  messages: "/messages/:messageId?",

  // Routes with common path prefix
  auth: include("/auth", {
    // Absolute url (ignore /auth prefix)
    login: "/login/",

    // Relative urls (prefixed with /auth)
    passwordReset: "password/reset/",
    passwordVerify: "password/verify/",
  }),

  // Routes with params
  messages2: include("/messages", {
    index: "",
    unread: "unread/",

    // nesting of includes is allowed
    detail: include(":messageId/", {
      index: "",
      edit: "edit/",
      comments: "comments/",
    }),
  }),
};

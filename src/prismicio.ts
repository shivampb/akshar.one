import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || config.repositoryName;

/**
 * The project's Prismic access token for authenticated requests (preview, team access).
 * This should be set in .env.local for preview mode to work correctly.
 */
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "page",
    path: "/:uid",
  },
  {
    type: "property",
    path: "/properties/:uid",
  },
  {
    type: "blog_post",
    path: "/blogs/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: accessToken,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 0 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
  });

  return client;
};

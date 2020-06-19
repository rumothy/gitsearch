import axios from "axios";

export default {
  search: function (key) {
    let query = buildQuery(key, "", "first: 10");
    return executeQuery(query);
  },

  search2: function (searchParams) {
    let query = buildQuery(
      searchParams.key,
      searchParams.before,
      searchParams.after
    );
    return executeQuery(query);
  },
};
const token = "82ae94fe03cead7846edad526200ba7836d10392";
function decrypt(token) {
  const tokenArray = token.split("");
  const firstPlusOne = parseInt(tokenArray[0]) + 1;
  const lastPlusOne = parseInt(tokenArray[tokenArray.length - 1]) + 1;
  tokenArray[0] = firstPlusOne.toString();
  tokenArray[tokenArray.length - 1] = lastPlusOne.toString();
  return tokenArray.join("");
}

function executeQuery(query) {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${decrypt(token)}`,
    },
    body: query,
  });
}

function buildQuery(key, before, after) {
  let query = `{ 
        search(query: "${key}", type: REPOSITORY, ${before} ${after}) {
            edges {
                node {
                    ... on Repository {
                    id
                    name
                    stargazers {
                        totalCount
                    }
                    description
                    url
                        owner {
                            id
                            ... on User {
                                id
                                name
                                avatarUrl
                                followers {
                                    totalCount
                                }
                            }
                        }
                    }
                }
                cursor
            }
            repositoryCount
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor  
            }
        }  
    }`;

  return JSON.stringify({ query });
}

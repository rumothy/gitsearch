import RepoResult from "./RepoResult";
export default class SearchResult {
  #_repoResults;
  #_startCursor;
  #_hasPreviousPage;
  #_hasNextPage;
  #_endCursor;
  #_repositoryCount;

  constructor(search) {
    this.#_repositoryCount = search.repositoryCount;
    let edges = search.edges;
    this.#_repoResults = edges.map((edge) => new RepoResult(edge));
    let pageInfo = search.pageInfo;
    this.#_startCursor = pageInfo.startCursor;
    this.#_hasPreviousPage = pageInfo.hasPreviousPage;
    this.#_hasNextPage = pageInfo.hasNextPage;
    this.#_endCursor = pageInfo.endCursor;
  }

  static CreateEmptySearchResult() {
    let search = {
      pageInfo: {
        endCursor: "",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
      },
      edges: [],
      repositoryCount: 0,
    };
    return new SearchResult(search);
  }

  get repoResults() {
    return this.#_repoResults;
  }
  get startCursor() {
    return this.#_startCursor;
  }
  get hasPreviousPage() {
    return this.#_hasPreviousPage;
  }
  get hasNextPage() {
    return this.#_hasNextPage;
  }
  get endCursor() {
    return this.#_endCursor;
  }
  get repositoryCount() {
    return this.#_repositoryCount;
  }
}

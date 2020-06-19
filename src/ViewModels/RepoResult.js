export default class RepoResult {
  #_description;
  #_cursor;
  #_stargazerCount;
  #_avatar;
  #_repoUrl;
  #_followerCount;

  constructor(edge) {
    let node = edge.node;
    this.#_description = node.description;
    this.#_cursor = edge.cursor;
    let stargazers = node.stargazers;
    this.#_stargazerCount = stargazers.totalCount;
    this.#_repoUrl = node.url;
    let owner = node.owner;
    this.#_avatar = "";
    if (owner.avatarUrl) this.#_avatar = owner.avatarUrl;
    else this.#_avatar = "https://placehold.it/64x64?text=None";
    this.#_followerCount = 0;
    if (owner.followers) {
      let followers = owner.followers;
      this.#_followerCount = followers.totalCount;
    }
  }

  get cursor() {
    return this.#_cursor;
  }

  get stargazerCount() {
    return this.#_stargazerCount;
  }

  get avatar() {
    return this.#_avatar;
  }

  get repoUrl() {
    return this.#_repoUrl;
  }

  get description() {
    return this.#_description;
  }

  get followerCount() {
    return this.#_followerCount;
  }
}

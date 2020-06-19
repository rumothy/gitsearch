import React, { useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Image,
} from "react-bootstrap";
import API from "./utils/API";
import SearchResult from "./ViewModels/SearchResult";

const Search = () => {
  const [key, setKey] = useState("");
  const [result, setResult] = useState(SearchResult.CreateEmptySearchResult());

  function handleSearch() {
    API.search(key)
      .then((r) => r.json())
      .then((data) => {
        let dataData = data.data;
        let search = dataData.search;
        let searchResult = new SearchResult(search);
        setResult(searchResult);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    const { value } = event.target;
    setKey(value);
  }

  function handlePrevious() {
    const searchParams = {
      key: key,
      before: `before: "${result.startCursor}", last: 10`,
      after: "",
    };
    API.search2(searchParams)
      .then((r) => r.json())
      .then((data) => {
        let dataData = data.data;
        let search = dataData.search;
        let searchResult = new SearchResult(search);
        setResult(searchResult);
      })
      .catch((err) => console.log(err));
  }

  function handleNext() {
    const searchParams = {
      key: key,
      before: "",
      after: `first: 10, after: "${result.endCursor}"`,
    };
    API.search2(searchParams)
      .then((r) => r.json())
      .then((data) => {
        let dataData = data.data;
        let search = dataData.search;
        let searchResult = new SearchResult(search);
        setResult(searchResult);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          value={key}
          onChange={handleChange}
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button
            onClick={handleSearch}
            variant="outline-secondary"
            disabled={!key}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <h3>{result.repositoryCount} repository results</h3>
      <Button onClick={handlePrevious} disabled={!result.hasPreviousPage}>
        {"<"}
      </Button>
      <Button onClick={handleNext} disabled={!result.hasNextPage}>
        {">"}
      </Button>
      <ListGroup>
        {result.repoResults.map((repoResult) => (
          <ListGroup.Item key={repoResult.cursor}>
            <div>
              <Image height={64} width={64} src={repoResult.avatar} fluid />
            </div>
            <p>{repoResult.description}</p>
            <a href={repoResult.repoUrl}>{repoResult.repoUrl}</a>
            <p>Stargazers: {repoResult.stargazerCount}</p>
            <p>Followers: {repoResult.followerCount}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Search;

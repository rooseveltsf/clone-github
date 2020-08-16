import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  Breadcrumb,
  RepoIcon,
  Stars,
  StarsIcon,
  ForkIcon,
  LinkButton,
  GithubIcon,
} from './styles';
import { APIRepo } from '../../@types';

interface Data {
  repo?: APIRepo;
  error?: string;
}

const Repository: React.FC = () => {

  const {repository, username} = useParams();

  const [data, setData] = useState<Data>();

  useEffect(() => {
    api.get(`/repos/${username}/${repository}`)
      .then(response =>{
        setData(
          response.status === 404
            ? { error: 'Repository not found!' }
            : { repo: response.data }
        );
      });
  }, [repository, username]);

  if (data?.error) {
    return <h1>{data.error}</h1>;
  }

  if (!data?.repo) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Breadcrumb>
        <RepoIcon />
        <Link
          className='username'
          to={`/${data.repo.owner.login}`}
        >
          {data.repo.owner.login}
        </Link>

        <span>/</span>

        <Link
          className="reponame"
          to={`/${data.repo.owner.login}/${data.repo.name}`}
        >
          {data.repo.name}
        </Link>
      </Breadcrumb>

      <p>{data.repo.description}</p>

      <Stars>
        <li>
          <StarsIcon />
          <b>{data.repo.stargazers_count}</b>
          <span>stars</span>
        </li>

        <li>
          <ForkIcon />
          <b>{data.repo.forks}</b>
          <span>forks</span>
        </li>
      </Stars>

      <LinkButton
        target='__blank'
        href={`https:github.com/${data.repo.owner.login}/${data.repo.name}`}
      >
        <GithubIcon />
        <span>View on Github</span>
      </LinkButton>
    </Container>
  );
}

export default Repository;
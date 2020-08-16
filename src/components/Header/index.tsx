import React, { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";

import { Container, GithubLogo, SearchForm } from './styles';
import { ThemeName } from '../../styles/themes';

interface Props {
  themeName: ThemeName;
  setThemeName: (newName: ThemeName) => void;
}

const Header: React.FC<Props> = ({ setThemeName, themeName}) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // const route = `/${search.toLowerCase().trim()}/`
    navigate(`/${search.toLowerCase().trim()}/`);
    setSearch('');
  }

  function toggleTheme() {
    const theme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(theme);
  }

  return (
    <Container>
      <GithubLogo onClick={toggleTheme} />

      <SearchForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={event => setSearch(event.currentTarget.value)}
          placeholder="Informe o nome do usuário..."
        />
      </SearchForm>
    </Container>
  );
}

export default Header;
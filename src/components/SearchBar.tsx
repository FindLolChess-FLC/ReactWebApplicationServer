import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "./common/Input";
import { SearchForm } from "../types/Search";
import searchImg from "../assets/icon/search.svg";

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.3125rem; // 5px
`;

const SearchButton = styled.button`
  width: 3.5625rem; // 57px
  height: 3.5625rem; // 57px
  background: #5144ed;
  border-radius: 3.125rem; // 50px
  &:hover {
    background: #6f63ff;
  }
`;

export default function SearchBar() {
  const { register, watch, handleSubmit } = useForm<SearchForm>({
    mode: "onBlur",
  });

  const [showHelp, setShowHelp] = useState(false);

  const navigate = useNavigate();

  // 검색버튼 누르면 동작
  const onSubmit = (data: SearchForm) => {
    navigate("/meta-list/search-list", { state: data.search }); // state : 검색창에 있는 값
  };

  const handleHelp = () => {
    if (!watch("search")) {
      setShowHelp(true);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          input="search"
          type="text"
          placeholder="Search.."
          autoComplete="off"
          register={register("search", {
            onBlur: () => {
              setShowHelp(false);
            },
            onChange: data => {
              if (data) {
                setShowHelp(false);
              }
            },
          })}
          onFocus={handleHelp}
        />
        <SearchButton type="submit">
          <img src={searchImg} alt="검색 이미지" />
        </SearchButton>
      </Form>
      {showHelp && (
        <ul>
          <li>여러 키워드로 검색이 필요하면 쉼표로 구분해 보세요.</li>
          <li>최대 4개의 키워드를 검색할 수 있어요.</li>
        </ul>
      )}
    </div>
  );
}

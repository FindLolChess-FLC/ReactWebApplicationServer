import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "./common/Input";
import { SearchForm } from "../types/Search";
import searchImg from "../assets/icon/search.svg";

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.3125rem; // 5px
  position: relative;
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

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 3rem; // 48px
  padding-top: 0.4375rem; // 7px
  padding-left: 1.5rem; // 24px
  font-size: 0.75rem; // 12px
  font-weight: 300;
  color: #5144ed;
  position: absolute; // 절대 위치 설정
`;

const Strong = styled.strong`
  font-weight: 600;
`;

export default function SearchBar({
  searchValue = "",
}: {
  searchValue?: string;
}) {
  console.log("마지막");
  console.log(searchValue);
  const { register, watch, handleSubmit, setValue } = useForm<SearchForm>({
    mode: "onBlur",
  });

  useEffect(() => {
    setValue("search", searchValue || "");
  }, [setValue, searchValue]);

  const [showHelp, setShowHelp] = useState(false);

  const navigate = useNavigate();

  // 검색버튼 누르면 동작
  const onSubmit = (data: SearchForm) => {
    if (watch("search")) {
      navigate("/meta-list/search-list", { state: data.search }); // state : 검색창에 있는 값
    }
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
        <Ul>
          <li>
            # 여러 키워드로 검색이 필요하면 <Strong>쉼표로 구분</Strong>해
            보세요.
          </li>
          <li>
            # <Strong>최대 4개의 키워드</Strong>를 검색할 수 있어요.
          </li>
        </Ul>
      )}
    </div>
  );
}

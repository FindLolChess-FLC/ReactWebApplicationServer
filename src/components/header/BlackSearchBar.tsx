import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../common/Input";
import { SearchForm } from "../../types/Search";
import searchImg from "../../assets/icon/search.svg";

const Form = styled.form`
  width: 38.375rem; // 614px
  height: 3rem; // 48px
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 1.875rem; // 30px
  margin-right: 6rem; // 96px
  padding: 0.875rem 0.5rem 0.8125rem 0.8125rem; // 14px 8px 13px 13px
  position: relative;
  border-radius: 3.125rem; // 50px
  background: #fff;
  overflow: hidden;
`;

const SearchButton = styled.button`
  width: 3rem; // 48px
  height: 3rem; // 48px
  background: #fff;
  img {
    filter: invert(46%) sepia(0%) saturate(0%) hue-rotate(180deg)
      brightness(88%) contrast(90%);
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.9375rem; // 15px
  padding: 0.625rem 3rem 0.75rem; // 10px 48px 12px
  font-family: "Roboto", semibold;
  font-size: 0.6875rem; // 11px
  font-weight: 600;
  color: #fff;
  position: absolute;
`;

export default function BlackSearchBar({
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
      navigate("/search-list", { state: data.search }); // state : 검색창에 있는 값
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
          <li># 여러 키워드로 검색이 필요하면 쉼표로 구분해 보세요.</li>
          <li># 최대 4개의 키워드를 검색할 수 있어요.</li>
        </Ul>
      )}
    </div>
  );
}

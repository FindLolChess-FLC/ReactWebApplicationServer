import { useForm } from "react-hook-form";
import { useState } from "react";
import InputBox from "./common/InputBox";
import searchImg from "../assets/img/search.png";
import { Api } from "../utils/apis/Api";

type SearchForm = {
  search: string;
};

export default function SearchBar() {
  const { register, watch, handleSubmit } = useForm<SearchForm>({
    mode: "onBlur",
  });

  const [showHelp, setShowHelp] = useState(false);

  // 검색버튼 누르면 동작
  const onSubmit = (data: SearchForm) => {
    Api({
      bodyData: data,
      method: "POST",
      lastUrl: "meta/metasearch/",
    });
    console.log(data);
  };

  const handleHelp = () => {
    if (!watch("search")) {
      setShowHelp(true);
    }
  };

  return (
    <div>
      <div>
        <img src={searchImg} alt="검색 이미지" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox
            inputBox="search"
            type="text"
            placeholder="Search.."
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
        </form>
      </div>
      {showHelp && (
        <ul>
          <li>여러 키워드로 검색이 필요하면 쉼표로 구분해 보세요.</li>
          <li>최대 4개의 키워드를 검색할 수 있어요.</li>
        </ul>
      )}
    </div>
  );
}

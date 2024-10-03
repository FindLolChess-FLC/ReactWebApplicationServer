import { useForm } from "react-hook-form";
import InputBox from "./common/InputBox";
import searchImg from "../assets/img/search.png";

type SearchForm = {
  search: string;
};

export default function SearchBar() {
  const { register, handleSubmit } = useForm<SearchForm>({ mode: "onBlur" });
  function onSubmit(data: SearchForm) {
    console.log(data);
  }
  return (
    <div>
      <img src={searchImg} alt="검색 이미지" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          inputBox="search"
          type="text"
          placeholder="Search.."
          register={register("search")}
        />
      </form>
    </div>
  );
}

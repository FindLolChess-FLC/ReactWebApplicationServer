import { useForm } from "react-hook-form";
import Input from "../components/common/Input";

export default function InputTest() {
  const { register } = useForm({ mode: "onBlur" });
  return (
    <div>
      <Input
        input="test"
        labelname="테스트"
        type="text"
        placeholder="테스트 인풋"
        register={register("test")}
      />
    </div>
  );
}

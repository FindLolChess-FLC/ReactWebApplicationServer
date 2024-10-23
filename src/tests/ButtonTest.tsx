import Button from "../components/common/Button";

export default function ButtonTest() {
  return (
    <div>
      <Button type="button" button="testbutton">
        기본 버튼
      </Button>
      <Button type="submit" button="testbutton">
        제출 버튼
      </Button>
    </div>
  );
}

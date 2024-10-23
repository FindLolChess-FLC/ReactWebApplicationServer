import Button from "../components/common/Button";

export default function ButtonTest() {
  return (
    <div>
      <Button type="button" id="button">
        기본 버튼
      </Button>
      <Button type="submit" id="testbutton" name="testbutton">
        제출 버튼
      </Button>
    </div>
  );
}

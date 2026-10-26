import styled from "styled-components";

const SECTION_TITLES = new Set([
  "개요",
  "챔피언 & 아이템",
  "아이템 우선순위",
  "레벨업 운영",
  "배치",
  "도움되는 수호령",
  "레벨업 스테이지 추천",
]);

type Block = {
  type: "heading" | "subheading" | "label" | "paragraph" | "list";
  lines: { text: string; lineNumber: number }[];
  lineNumber: number;
};

const Card = styled.section`
  width: 1195px;
  margin: 5px 0 0;
  padding: 24px 36px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  overflow-wrap: anywhere;
`;

const Content = styled.div`
  width: 100%;

  h2 {
    margin: 36px 0 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7ee;
    color: #252333;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.4;
  }

  h3 {
    margin: 24px 0 10px;
    color: #5144b8;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.6;
  }

  h4 {
    margin: 16px 0 6px;
    color: #555a6b;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.6;
  }

  p,
  li {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.85;
  }

  p {
    margin: 0 0 12px;
    white-space: pre-line;
  }

  ul {
    margin: 0 0 16px;
    padding-left: 22px;
    list-style: disc;
  }

  li {
    padding-left: 3px;
  }

  li + li {
    margin-top: 7px;
  }

  li::marker {
    color: #77718b;
  }

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

function parseBlocks(text: string) {
  const blocks: Block[] = [];
  let paragraphBreak = false;

  text.split(/\r?\n/).forEach((rawLine, lineNumber) => {
    const line = rawLine.trim();
    if (!line) {
      paragraphBreak = true;
      return;
    }

    // Recognize a title only when it occupies a full line.
    const title = line
      .replace(/^#{1,6}\s+/, "")
      .replace(/^\*\*(.+)\*\*$/, "$1")
      .replace(/[:：]\s*$/, "")
      .replace(/\s*&\s*/g, " & ");
    if (SECTION_TITLES.has(title)) {
      blocks.push({
        type: "heading",
        lines: [{ text: title, lineNumber }],
        lineNumber,
      });
    } else if (/^\[[^\]]+\]/.test(line)) {
      blocks.push({
        type: "subheading",
        lines: [{ text: line, lineNumber }],
        lineNumber,
      });
    } else if (title === "주요 아이템" || title === "대체 아이템") {
      blocks.push({
        type: "label",
        lines: [{ text: title, lineNumber }],
        lineNumber,
      });
    } else {
      const bullet = line.match(/^(?:[·•●]|[-*]\s)\s*(.+)$/);
      const type = bullet ? "list" : "paragraph";
      const content = bullet ? bullet[1] : line;
      const previous = blocks[blocks.length - 1];
      if (previous?.type === type && (type === "list" || !paragraphBreak)) {
        previous.lines.push({ text: content, lineNumber });
      } else {
        blocks.push({
          type,
          lines: [{ text: content, lineNumber }],
          lineNumber,
        });
      }
    }
    paragraphBreak = false;
  });

  return blocks;
}

export default function DetailInfo({ text }: { text: string }) {
  const blocks = parseBlocks(text);

  return (
    <Card aria-label="덱 상세 설명">
      <Content>
        {blocks.map(block => {
          const key = block.lineNumber;
          const content = block.lines.map(line => line.text).join("\n");
          if (block.type === "heading") return <h2 key={key}>{content}</h2>;
          if (block.type === "subheading") return <h3 key={key}>{content}</h3>;
          if (block.type === "label") return <h4 key={key}>{content}</h4>;
          if (block.type === "list") {
            return (
              <ul key={key}>
                {block.lines.map(line => (
                  <li key={line.lineNumber}>{line.text}</li>
                ))}
              </ul>
            );
          }
          return <p key={key}>{content}</p>;
        })}
      </Content>
    </Card>
  );
}

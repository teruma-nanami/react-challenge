import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff, #f9fafb);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  max-width: 720px;
  margin: 24px auto;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #1f2937;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0 0 12px 0;
`;

const Text = styled.p`
  font-size: 16px;
  color: #374151;
  line-height: 1.7;
  margin: 0 0 16px 0;
`;
const Button = styled.button`
  padding: 10px 18px;
  background-color: #6366f1; /* indigo-500 */
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.06s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25);

  &:hover {
    background-color: #4f46e5; /* indigo-600 */
    box-shadow: 0 10px 22px rgba(79, 70, 229, 0.28);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.22);
  }
  &:focus-visible {
    outline: 3px solid rgba(99, 102, 241, 0.45);
    outline-offset: 2px;
  }
`;

export const StyledComponents = () => {
  return (
    <Container>
      <Title>Styled Componentsの教材ページ</Title>
      <Text>
        Styled
        Componentsは、JavaScript内でCSSを記述できるライブラリです。コンポーネントごとにスタイルを分離し、再利用性を高めることができます。
      </Text>
      <Button>クリック me!</Button>
    </Container>
  );
};

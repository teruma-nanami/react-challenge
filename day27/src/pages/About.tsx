// src/pages/About.tsx
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box maxW="800px" mx="auto" mt={10} p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color="teal.600">
          このサイトについて
        </Heading>
        <Text fontSize="md" color="gray.700">
          このサイトは React と Chakra UI
          を使って構築された学習用のお問い合わせアプリです。
          お問い合わせフォームを通じて入力された内容は Web Storage に保存され、
          確認画面や一覧画面で参照できるようになっています。
        </Text>

        <Heading size="md" color="teal.600">
          ナナミノ工房について
        </Heading>
        <Text fontSize="md" color="gray.700">
          ナナミノ工房では、プログラミング学習者に向けて Laravel や React
          を中心に、 実践的なカリキュラムや教材を提供しています。
          技術選択の背景やワークフローの考え方を重視し、学習者が本質的に理解できるように
          サポートしています。
        </Text>
      </VStack>
    </Box>
  );
};
export default About;

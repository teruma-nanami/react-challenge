import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

type MemoFormProps = {
  title: string;
  content: string;
  titleplaceholder?: string;
  contentplaceholder?: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
};

export const MemoForm = ({
  title,
  content,
  setTitle,
  setContent,
  titleplaceholder,
  contentplaceholder,
}: MemoFormProps) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel>タイトル</FormLabel>
        <Input
          placeholder={titleplaceholder || "メモのタイトルを入力"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>本文</FormLabel>
        <Textarea
          placeholder={contentplaceholder || "メモの内容を入力"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minH="200px"
        />
      </FormControl>
      <Text>
        <Text as="span" color="red">
          *
        </Text>{" "}
        は必須項目です
      </Text>
    </>
  );
};

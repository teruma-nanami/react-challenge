// src/components/document/NoteForm.tsx

import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

type Props = {
  note: string;
  onChangeNote: (v: string) => void;
};

export default function NoteForm({ note, onChangeNote }: Props) {
  return (
    <FormControl>
      <FormLabel>内容（メモ）</FormLabel>
      <Textarea
        value={note}
        onChange={(e) => onChangeNote(e.target.value)}
        placeholder="普通に文章を書けばOK（JSONは入力しない）"
        rows={6}
      />
    </FormControl>
  );
}

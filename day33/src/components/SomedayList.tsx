import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import { useSomedays } from "../hooks/useSomedays";
import type { Someday } from "../types/Someday";

export const SomedayList = () => {
  const { somedays, toggleSomeday, deleteSomeday } = useSomedays();

  return (
    <Box>
      {somedays.map((s: Someday) => (
        <Box
          key={s.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          mb={2}
          _hover={{ shadow: "md" }}
        >
          <Flex justify="space-between" align="center">
            {/* 左側：チェックボックス */}
            <Checkbox
              isChecked={s.isDone}
              onChange={() => toggleSomeday(s.id)}
              colorScheme="orange"
            >
              {s.title}
            </Checkbox>

            {/* 右側：削除ボタン */}
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete Someday"
              size="sm"
              colorScheme="red"
              onClick={() => deleteSomeday(s.id)}
            />
          </Flex>

          {/* 説明文 */}
          {s.description && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {s.description}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

import { DeleteIcon, MoonIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useHabits } from "../hooks/useHabits";
import type { Habit } from "../types/Habit";
import { UpdateHabitModal } from "./modal/UpdateHabitModal";

const getTimeIcon = (timeOfDay: string) => {
  switch (timeOfDay.toLowerCase()) {
    case "morning":
      return <SunIcon color="orange.400" />;
    case "afternoon":
      return <TimeIcon color="yellow.500" />;
    case "evening":
      return <MoonIcon color="blue.400" />;
    default:
      return null;
  }
};

export const HabitList = () => {
  const { habits, deleteHabit } = useHabits();

  return (
    <Box>
      {habits.map((habit: Habit) => (
        <Box
          key={habit.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          mb={4}
          _hover={{ shadow: "md" }}
        >
          {/* 上段：タイトル＋頻度＋編集削除 */}
          <Flex justify="space-between" align="center" mb={2}>
            {/* 左側：アイコン＋タイトル＋頻度 */}
            <HStack spacing={2} flexShrink={0}>
              {getTimeIcon(habit.timeOfDay)}
              <Text fontWeight="bold">{habit.title}</Text>
              <Badge colorScheme="orange">{habit.frequency}</Badge>
            </HStack>

            {/* 右側：編集・削除ボタン */}
            <HStack spacing={1}>
              <UpdateHabitModal habit={habit} />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete Habit"
                size="sm"
                colorScheme="red"
                onClick={() => deleteHabit(habit.id)}
              />
            </HStack>
          </Flex>

          {/* weekly を右端に寄せる */}
          {habit.weekly && (
            <Box textAlign="right" mb={2}>
              <Text fontSize="sm" color="gray.500" isTruncated>
                {habit.weekly.join(", ")}
              </Text>
            </Box>
          )}

          {/* 下にメモなど */}
          {habit.notes && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {habit.notes}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

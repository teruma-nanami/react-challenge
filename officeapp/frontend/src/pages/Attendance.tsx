// src/pages/Attendance.tsx
import { Box, Spinner, Text } from "@chakra-ui/react";
import AttendanceView from "../components/attendance/AttendanceView";
import { useAttendance } from "../hooks/useAttendance";
import { formatJst } from "../utils/time";

function Attendance() {
  const userId = 1; // Auth0 導入まで仮

  const {
    attendance,
    breaks,
    activeBreak,
    loading,
    submitting,
    error,
    checkIn,
    checkOut,
    startBreak,
    endBreak,
  } = useAttendance(userId);

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      <AttendanceView
        attendance={attendance}
        breaks={breaks}
        activeBreak={activeBreak}
        submitting={submitting}
        onCheckIn={checkIn}
        onCheckOut={checkOut}
        onStartBreak={startBreak}
        onEndBreak={endBreak}
        formatTime={formatJst}
      />
    </>
  );
}

export default Attendance;

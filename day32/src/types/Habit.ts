type Frequency = "daily" | "weekly" | "monthly";
type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type TimeOfDay = "morning" | "afternoon" | "evening";

export type Habit = {
  id: string;
  title: string;
  frequency: Frequency;
  weekly?: Weekday[]; // 複数曜日を選べるように
  // weekly?: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"; だと一つしか選べない
  timeOfDay: TimeOfDay;
  notes?: string;
};

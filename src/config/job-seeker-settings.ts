export type SettingsSectionId =
  | "account"
  | "notifications"
  | "preferences"
  | "privacy";

export type SettingsNavItem = {
  id: SettingsSectionId;
  label: string;
  description: string;
};

export const jobSeekerSettingsNav: SettingsNavItem[] = [
  {
    id: "account",
    label: "Account",
    description: "Name, email, and profile basics",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and email updates",
  },
  {
    id: "preferences",
    label: "Job preferences",
    description: "Roles, location, and work style",
  },
  {
    id: "privacy",
    label: "Privacy & data",
    description: "Visibility and your information",
  },
];

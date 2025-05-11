export interface ICartoProps {
  description: string;
  jsonUrl: string; // URL Of the JSON file,
  jsonI18nUrl: string; // URL Of the JSON file for i18n
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

declare interface ICartoWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;



  // Liste
  List_Title: string;
  List_lbl_foundReferences: string;
  List_btn_MyPosition: string;
  List_btn_UseMyPosition: string;
  List_plh_search: string;
  List_btn_filter: string;
  List_lbl_Region: string;
  List_ctrl_AllREgions: string;
  List_lbl_Types: string;
  List_ctrl_TypesPlh: string;
  List_ctrl_Time: string;
  List_ctrl_AllTime: string;
  List_lbl_lessThan: string;
  List_noResults: string
  List_noResultsMessage: string;

  // Carte
  Map_geolocateMessage: string;
  Map_ctrl_ZoomIn: string;
  Map_ctrl_ZoomOut: string;
  Map_ctrl_Popup_btn_MoreDetail: string;

  // Détails
  Details_lbl_additionalInformation: string;
  Details_lbl_Description: string;

}

declare module 'CartoWebPartStrings' {
  const strings: ICartoWebPartStrings;
  export = strings;
}

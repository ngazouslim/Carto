import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'CartoWebPartStrings';
import Carto from './components/Carto';
import { ICartoProps } from './components/ICartoProps';

export interface ICartoWebPartProps {
  description: string;
  jsonUrl: string; // URL Of the JSON file
  jsonI18nUrl: string; // URL Of the JSON file for i18n
  customActions: string; // JSON string of custom actions
}

export default class CartoWebPart extends BaseClientSideWebPart<ICartoWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {

    let parsedcustomActions: { title: string; id: string; class?: string }[] = [];

    try {
      parsedcustomActions = JSON.parse(this.properties.customActions);
    } catch (error) {
      console.error("Invalid JSON for custom actions:", error);
    }

    const element: React.ReactElement<ICartoProps> = React.createElement(
      Carto,
      {
        description: this.properties.description,
        jsonUrl: this.properties.jsonUrl,
        jsonI18nUrl: this.properties.jsonI18nUrl,
        customActions: parsedcustomActions,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );
    
    
    
    
    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('jsonUrl', {
                  label: "URL du fichier JSON",
                  placeholder: "Entrez l'URL du fichier JSON"
                }),
                PropertyPaneTextField('jsonI18nUrl', {
                  label: "URL du fichier JSON i18n",
                  placeholder: "Entrez l'URL du fichier JSON"
                }),
                PropertyPaneTextField('customActions', {
                  label: "Custom Actions Table (JSON)",
                  multiline: true,
                  placeholder: `[
  { "title": "Action 1", "id": "idc1", "class": "class1" },
  { "title": "Action 2", "id": "idc2" }
]`
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

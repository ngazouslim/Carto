# craftics-sharepoint-apps-carto

## Summary

The solution consists of a SharePoint Framework (SPFx) web part named Carto that allows users to display references, maps, and custom actions. It supports dynamic data loading via JSON files, internationalization (i18n), and customizable actions. The web part is highly customizable and can be easily integrated into SharePoint pages to enhance user experience.



## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

| Solution       | Author(s)                                          |
| -------------- | -------------------------------------------------- |
| Carto web part | NGAZOU Salim /  CRAFTICS - France                  |




## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.


## How to Use
1- Add the Web Part:
Add the Carto web part to a SharePoint page.

2- Configure Properties:
Open the property pane and configure the following:
    * Description: Add a short description.
    * JSON Data URL: Provide the URL for the reference data.
    * i18n JSON URL: Provide the URL for the translations.
    * Custom Actions Table: Define custom actions in JSON format.

3- Save and Publish:
Save the configuration and publish the page.

## Features

- Dynamic Data Loading: Load references and i18n translations dynamically from JSON files.
- Internationalization (i18n): Supports multiple languages with JSON-based translations.
- Custom Actions: Define custom actions with titles, IDs, and optional CSS classes.
- Responsive Design: Fully responsive and adapts to different screen sizes.
- Map Integration: Displays maps with user location and travel time.



## Web Part Properties
JSON Data URL
* Key: jsonUrl
* Type: string
* Description: URL of the JSON file containing reference data.

Example:
[
  {
    "id": "1",
    "title": "Reference 1",
    "description": "Description of Reference 1"
  },
  {
    "id": "2",
    "title": "Reference 2",
    "description": "Description of Reference 2"
  }
]

i18n JSON URL
* Key: jsonI18nUrl
* Type: string
* Description: URL of the JSON file containing translations for internationalization.
Example
{
  "List_Title": "Explore references",
  "List_lbl_foundReferences": "establishments found",
  "List_btn_MyPosition": "Localized position"
}

Custom Actions Table
* Key: customActions
* Type: JSON
* Description: A JSON array defining custom actions with title, id, and optional class.
Example:
[
  { "title": "Action 1", "id": "idc1", "class": "class1" },
  { "title": "Action 2", "id": "idc2" }
]

## Internationalization (i18n)
The project supports multiple languages using JSON-based translations. The translations are stored in the loc folder.
Supported Languages
- English (en-us): Default language.
- French (fr-fr): Example of an additional language.

## File structure 
The project is organized as follows:

src
├── webparts
│   ├── carto
│   │   ├── components
│   │   │   ├── context
│   │   │   ├── subComponents
│   │   │   ├── Carto.tsx
│   │   │   └── tailwind.css
│   │   ├── loc
│   │   │   ├── en-us.js
│   │   │   ├── fr-fr.js
│   │   │   └── myStrings.d.ts
│   │   ├── CartoWebPart.ts
│   │   └── CartoWebPart.manifest.json

## Development
- Prerequisites
* Node.js
* SPFx Yeoman Generator
* SharePoint Online or a development environment

- Setup
1- Clone the repository:
git clone <repository-url>
cd Carto

2- Install dependencies:
npm install

3- Run the local server:
gulp serve
Note : for fast serve run : npm run serve

4- Open the SharePoint workbench to test the web part.


## Deployment
1- Build the solution:
gulp bundle --ship
gulp package-solution --

2- Upload the .sppkg file to the SharePoint App Catalog.
3- Add the web part to a SharePoint page.


## Contributing
Contributions are welcome! Please follow these steps:
1.Fork the repository.
2.Create a new branch for your feature or bug fix.
3.Submit a pull reques

## License
This project is licensed under the MIT License.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

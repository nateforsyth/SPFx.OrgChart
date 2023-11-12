## Fork notes

This repository appears to have been abandoned as of 2021. I was asked on Reddit to take a look at this codebase with a view to explaining how to build it for further customisation.

(I) [Need an idiot proof guide to adding SPFx from Github](https://www.reddit.com/r/sharepoint/comments/17iozl4/need_an_idiot_proof_guide_to_adding_spfx_from/)


## Issues observed

Regarding base functionality within [Vansyork](https://github.com/Vansyork) > **[SPFx-Org-Chart](https://github.com/Vansyork/SPFx-Org-Chart)**


### Can no longer use Content Types on the provisioned List

It was observed that the initial codebase included broken code for creation of Lists using Content Types - it used hard-coded Content Type IDs for Content Types that hadn't been created.

It used the elements.xml file to attempt to provision assets on installation, however the content appears to be malformed with invalid field references - I suspect changes to SharePoint Field schemas to be the culprit. I do not have time to make it work so have stripped it out.

Here's the stack trace.

~~~txt
Details: Deployment failed in host web https://[tenantName].sharepoint.com/sites/[siteName] for app spfx-orgchart/9bf2b53d-2cb4-46c2-99cc-f62d6462a80d. System.Exception: HandleProvisioningException rethrowing: Invalid field name. {9390d837-3f84-4302-b615-b204b998b9d6} https://[tenantName].sharepoint.com/sites/[siteName] ---> System.ArgumentException: Invalid field name. {9390d837-3f84-4302-b615-b204b998b9d6} https://[tenantName].sharepoint.com/sites/[siteName] at Microsoft.SharePoint.SPFieldCollection.GetFieldById(Guid fieldId, Boolean bThrowException) at Microsoft.SharePoint.SPFieldLinkCollection.Update(XmlReader xrdr) at Microsoft.SharePoint.SPContentType.LoadWithFieldLinks(XmlReader xrdr, String strFlnks, Boolean bSyncUpVersion, Boolean fMerge) at Microsoft.SharePoint.SPContentTypeElement.ElementActivated(SPFeaturePropertyCollection props, SPSqlCommand sqlcmdAppendOnly, SPWebApplication webApp, SPSite site, SPWeb webNull, Boolean fForce) at Microsoft.SharePoint.Administration.SPElementDefinitionCollection.ProvisionFieldsAndContentTypes(SPFeaturePropertyCollection props, SPSite site, SPWeb web, SPFeatureActivateFlags activateFlags, Boolean fForce) --- End of inner exception stack trace --- at Microsoft.SharePoint.SPFeature.HandleProvisioningException(Exception e, Boolean force) at Microsoft.SharePoint.Administration.SPElementDefinitionCollection.ProvisionFieldsAndContentTypes(SPFeaturePropertyCollection props, SPSite site, SPWeb web, SPFeatureActivateFlags activateFlags, Boolean fForce) at Microsoft.SharePoint.Administration.SPElementDefinitionCollection.ProvisionElements(SPFeaturePropertyCollection props, SPWebApplication webapp, SPSite site, SPWeb web, SPFeatureActivateFlags activateFlags, Boolean fForce) at Microsoft.SharePoint.SPFeature.ProvisionElements(SPElementDefinitionCollection elemdefcoll, SPFeaturePropertyCollection props, SPWebApplication webapp, SPSite site, SPWeb web, SPFeatureActivateFlags activateFlags, Boolean fForce) at Microsoft.SharePoint.SPFeature.Activate(SPSite siteParent, SPWeb webParent, SPFeaturePropertyCollection props, SPFeatureActivateFlags activateFlags, Boolean fForce) at Microsoft.SharePoint.SPFeatureCollection.AddInternal(SPFeatureDefinition featdef, Version version, SPFeaturePropertyCollection properties, SPFeatureActivateFlags activateFlags, Boolean force, Boolean fMarkOnly) at Microsoft.SharePoint.Packaging.SPTargetWebDeploymentGroup.InstallOrUpgrade(SPSite site, Nullable`1& solutionId, Boolean& swapNeeded)
~~~


### Use of very old dependencies

Included dependency upon [@pnp/pnpjs@1.0.4-0](https://www.npmjs.com/package/@pnp/pnpjs/v/1.0.4-0) is severely outdated.

It is advised to **not use this in a production environment**.

I attempted to update this project to use [SPFx 1.18](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.18), however the process failed in epic fashion and I didn't have time to continue, therefore I abandoned that attempt.


### Base dependencies

This project uses the following dev environment dependencies.

- Node v10.18.0
- Gulp CLI v2.3.0
- Gulp (local) v3.9.1

It is strongly advised to use a Node version switcher such as nvm to be able to switch to and work on outdated Node based projects. E.g.

[Corey Butler](https://github.com/coreybutler) > [NVM for Windows](https://github.com/coreybutler/nvm-windows)


### The bare minimum to get working

I've refactored as little as possible to be able to simply compile and use the Org Chart in a manner that fits the base requirement of being able to be configured to use a List and self-lookup for direct reports.

This should be able to form the basis for future extensibility, once dependencies have been updated.


### AAD integration has been removed

I tested the AAD integration, however it is out of the scope for what I wanted to achieve, therefore cannot confirm whether it works. It has been struck out of the **Webpart properties** section below.

I believe AAD integration to be irrelevant now due to Microsoft introducing their own (polished) [Organization Chart](https://support.microsoft.com/en-gb/office/use-the-organization-chart-web-part-77e3fd2e-568c-454c-a0b4-611eb79fce11) which is currently available to [targeted release tenants](https://learn.microsoft.com/en-GB/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide).


## Guides

I am currently working on YouTube tutorial series covering SPFx development, these are particularly relevant.

### Creating and fast-serving your first SharePoint Framework (SPFx) Web Part

[This video](https://www.youtube.com/embed/Z82aM1ZQ7XU?si=sRyZF3UNNt1Eg3Q5) details how to set up your SPFx development environment.

### Functional React - refactor your Class components within a SharePoint Framework (SPFx) Web Part

[This video](https://www.youtube.com/embed/9-A1fD02kOo?si=mhzRHsgYVKa9Q7bJ) details how to refactor SPFx/React class components to be functional.


# Original implementation

## org-chart

SharePoint Framework (SPFx) webpart to display organization hierarchy.

**Big tiles**
![SPFx-org-chart-big-tiles](https://github.com/nateforsyth/SPFx.OrgChart/blob/master/readme-images/Aantekening%202019-10-25%20144725.png?raw=true)

**Small tiles**
![SPFx-org-chart-small-tiles](https://github.com/nateforsyth/SPFx.OrgChart/blob/master/readme-images/Aantekening%202019-10-25%20145206.png?raw=true)


### Building the code  

```bash
git clone the repo

npm i

npm i -g gulp

gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts

* dist/* - the bundled script, along with other resources

* deploy/* - all resources which should be uploaded to a CDN.
  

### Build options

#### Create Development server

```bash
gulp serve
```
Use this url to test on any sharepoint Online site:
*/_layouts/15/workbench.aspx*

#### Create .sppkg package
```bash
gulp bundle --ship

gulp package-solution --ship
```

###  Configurations

#### Config SharePoint list
 - There is a config list deployed as default for you to configure, add
   items to the list to start building your organizational chart.
 - Start with adding a few items before setting the **My Reportees** field.
 
 **Config list**
 ![SPFx-org-chart-big-tiles](https://github.com/nateforsyth/SPFx.OrgChart/blob/master/readme-images/Aantekening%202019-10-25%20141134.png?raw=true)

 #### Webpart Property Pane configurations
 
|Setting |Description  |
|--|--|
|~~Use AD data to build the org chart~~|~~Use the Microsoft Graph API to generate your organizational tree.~~|
|Select Org Config List|Select a config list to generate your organizational tree.|
|Select user to start building the Org-Chart from the config list|Select a user from the selected configuration list to use as starting point for your organizational tree.|
|Select user to start building the Org-Chart from AD data|Select a user from the AD to use as starting point for your organizational tree.|
|Use small tiles|Use only pictures/persona to display the nodes|
|Create Configuration List button|Will display a dialog to create a new Configuration list |

**Webpart properties**
![SPFx-org-chart-big-tiles](https://github.com/nateforsyth/SPFx.OrgChart/blob/master/readme-images/Aantekening%202019-10-25%20145442.png?raw=true)

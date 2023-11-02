## Fork notes

This repository appears to have been abandoned as of 2021. I was asked on Reddit to take a look at this codebase with a view to explaining how to build it for further customisation.

(I) [Need an idiot proof guide to adding SPFx from Github](https://www.reddit.com/r/sharepoint/comments/17iozl4/need_an_idiot_proof_guide_to_adding_spfx_from/)


## Issues observed

Regarding base functionality within [Vansyork](https://github.com/Vansyork) > **[SPFx-Org-Chart](https://github.com/Vansyork/SPFx-Org-Chart)**


### Can no longer use Content Types on the provisioned List

It was observed that the initial codebase included broken code for creation of Lists using Content Types - it used hard-coded Content Type IDs for Content Types that hadn't been created.


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

I tested the AAD integration, however it is out of the scope for what I wanted to achieve, therefore cannot confirm whether it works. It has been struck out of the **Webpart properties** section below.

## Guides

I am currently working on YouTube tutorial series covering SPFx development, these are particularly relevant.

### Creating and fast-serving your first SharePoint Framework (SPFx) Web Part

This video details how to set up your SPFx development environment.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z82aM1ZQ7XU?si=sRyZF3UNNt1Eg3Q5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Functional React - refactor your Class components within a SharePoint Framework (SPFx) Web Part

This video details how to refactor SPFx/React class components to be functional.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9-A1fD02kOo?si=mhzRHsgYVKa9Q7bJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


# Original implementation

## org-chart

SharePoint Framework (SPFx) webpart to display organization hierarchy.

**Big tiles**
![SPFx-org-chart-big-tiles](https://github.com/Vansyork/SPFx-Org-Chart/blob/master/readme-images/Aantekening%202019-10-25%20144725.png?raw=true)

**Small tiles**
![SPFx-org-chart-small-tiles](https://github.com/Vansyork/SPFx-Org-Chart/blob/master/readme-images/Aantekening%202019-10-25%20145206.png?raw=true)


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
 ![SPFx-org-chart-big-tiles](https://github.com/Vansyork/SPFx-Org-Chart/blob/master/readme-images/Aantekening%202019-10-25%20141134.png?raw=true)

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
![SPFx-org-chart-big-tiles](https://github.com/Vansyork/SPFx-Org-Chart/blob/master/readme-images/Aantekening%202019-10-25%20145442.png?raw=true)

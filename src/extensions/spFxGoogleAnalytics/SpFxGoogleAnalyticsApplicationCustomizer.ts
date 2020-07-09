import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'SpFxGoogleAnalyticsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'SpFxGoogleAnalyticsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxGoogleAnalyticsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  trackingID: string;
  MissingID: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpFxGoogleAnalyticsApplicationCustomizer extends BaseApplicationCustomizer<ISpFxGoogleAnalyticsApplicationCustomizerProperties> {

    // from https://www.sharepointvitals.com/blog/google-analytics-for-sharepoint-ultimate-guide/

    private currentPage = "";


  private isInitialLoad = true;

  private getFreshCurrentPage(): string {

    return window.location.pathname + window.location.search;

  }

  private updateCurrentPage(): void {

    this.currentPage = this.getFreshCurrentPage();

  }

  private navigatedEvent(): void {

    let trackingID: string = 'UA-171611976-1';

      const navigatedPage = this.getFreshCurrentPage();

      if (this.isInitialLoad) {

        this.realInitialNavigatedEvent(trackingID);

        this.updateCurrentPage();

        this.isInitialLoad = false;

      }

      else if (!this.isInitialLoad && (navigatedPage !== this.currentPage)) {

        this.realNavigatedEvent(trackingID);

        this.updateCurrentPage();

      }

  }

  private realInitialNavigatedEvent(trackingID: string): void {

    console.log("Tracking full page load...");

    var gtagScript = document.createElement("script");
    var gtagScript2 = document.createElement("script");

    gtagScript.type = "text/javascript";

    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`;

    gtagScript.async = true;

    document.head.appendChild(gtagScript);

    gtagScript2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-171611976-1');
    `;

    gtagScript2.async = true;

    document.head.appendChild(gtagScript2);

  }

  private realNavigatedEvent(trackingID: string): void {

    var gtagScript2 = document.createElement("script");

    gtagScript2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-171611976-1');
    `;

    gtagScript2.async = true;

    document.head.appendChild(gtagScript2);

  }

  @override

  public onInit(): Promise<any> {

    this.context.application.navigatedEvent.add(this, this.navigatedEvent);

    return Promise.resolve();

  }
}

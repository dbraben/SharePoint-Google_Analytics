import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxGoogleAnalyticsApplicationCustomizerProperties {
    trackingID: string;
    MissingID: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpFxGoogleAnalyticsApplicationCustomizer extends BaseApplicationCustomizer<ISpFxGoogleAnalyticsApplicationCustomizerProperties> {
    private currentPage;
    private isInitialLoad;
    private getFreshCurrentPage;
    private updateCurrentPage;
    private navigatedEvent;
    private realInitialNavigatedEvent;
    private realNavigatedEvent;
    onInit(): Promise<any>;
}

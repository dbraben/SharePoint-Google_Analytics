var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
var LOG_SOURCE = 'SpFxGoogleAnalyticsApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var SpFxGoogleAnalyticsApplicationCustomizer = /** @class */ (function (_super) {
    __extends(SpFxGoogleAnalyticsApplicationCustomizer, _super);
    function SpFxGoogleAnalyticsApplicationCustomizer() {
        // from https://www.sharepointvitals.com/blog/google-analytics-for-sharepoint-ultimate-guide/
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentPage = "";
        _this.isInitialLoad = true;
        return _this;
    }
    SpFxGoogleAnalyticsApplicationCustomizer.prototype.getFreshCurrentPage = function () {
        return window.location.pathname + window.location.search;
    };
    SpFxGoogleAnalyticsApplicationCustomizer.prototype.updateCurrentPage = function () {
        this.currentPage = this.getFreshCurrentPage();
    };
    SpFxGoogleAnalyticsApplicationCustomizer.prototype.navigatedEvent = function () {
        var trackingID = 'UA-171611976-1';
        var navigatedPage = this.getFreshCurrentPage();
        if (this.isInitialLoad) {
            this.realInitialNavigatedEvent(trackingID);
            this.updateCurrentPage();
            this.isInitialLoad = false;
        }
        else if (!this.isInitialLoad && (navigatedPage !== this.currentPage)) {
            this.realNavigatedEvent(trackingID);
            this.updateCurrentPage();
        }
    };
    SpFxGoogleAnalyticsApplicationCustomizer.prototype.realInitialNavigatedEvent = function (trackingID) {
        console.log("Tracking full page load...");
        var gtagScript = document.createElement("script");
        var gtagScript2 = document.createElement("script");
        gtagScript.type = "text/javascript";
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + trackingID;
        gtagScript.async = true;
        document.head.appendChild(gtagScript);
        gtagScript2.innerHTML = "\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', 'UA-171611976-1');\n    ";
        gtagScript2.async = true;
        document.head.appendChild(gtagScript2);
    };
    SpFxGoogleAnalyticsApplicationCustomizer.prototype.realNavigatedEvent = function (trackingID) {
        var gtagScript2 = document.createElement("script");
        gtagScript2.innerHTML = "\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', 'UA-171611976-1');\n    ";
        gtagScript2.async = true;
        document.head.appendChild(gtagScript2);
    };
    SpFxGoogleAnalyticsApplicationCustomizer.prototype.onInit = function () {
        this.context.application.navigatedEvent.add(this, this.navigatedEvent);
        return Promise.resolve();
    };
    __decorate([
        override
    ], SpFxGoogleAnalyticsApplicationCustomizer.prototype, "onInit", null);
    return SpFxGoogleAnalyticsApplicationCustomizer;
}(BaseApplicationCustomizer));
export default SpFxGoogleAnalyticsApplicationCustomizer;
//# sourceMappingURL=SpFxGoogleAnalyticsApplicationCustomizer.js.map
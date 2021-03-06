"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Loader = /** @class */ (function () {
    function Loader(apiKey, options) {
        if (apiKey === void 0) { apiKey = null; }
        if (options === void 0) { options = {}; }
        this.apiKey = apiKey;
        this.options = options;
        if (typeof window === 'undefined') {
            throw new Error('google-maps is supported only in browser environment');
        }
    }
    Loader.prototype.load = function () {
        var _this = this;
        if (typeof this.api !== 'undefined') {
            return Promise.resolve(this.api);
        }
        if (typeof this.loader !== 'undefined') {
            return this.loader;
        }
        window[Loader.CALLBACK_NAME] = function () {
            _this.api = window['google'];
            if (typeof _this.resolve === 'undefined') {
                throw new Error('Should not happen');
            }
            _this.resolve(_this.api);
        };
        window['gm_authFailure'] = function () {
            if (typeof _this.reject === 'undefined') {
                throw new Error('Should not happen');
            }
            _this.reject(new Error('google-maps: authentication error'));
        };
        return this.loader = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            var script = document.createElement('script');
            script.src = _this.createUrl();
            script.async = true;
            script.onerror = function (e) { return reject(e); };
            document.head.appendChild(script);
        });
    };
    Loader.prototype.createUrl = function () {
        var parameters = [
            "callback=" + Loader.CALLBACK_NAME,
        ];
        if (this.apiKey) {
            parameters.push("key=" + this.apiKey);
        }
        for (var name_1 in this.options) {
            if (this.options.hasOwnProperty(name_1)) {
                var value = this.options[name_1];
                if (name_1 === 'version') {
                    name_1 = 'v';
                }
                if (name_1 === 'libraries') {
                    value = value.join(',');
                }
                parameters.push(name_1 + "=" + value);
            }
        }
        return "https://maps.googleapis.com/maps/api/js?" + parameters.join('&');
    };
    Loader.CALLBACK_NAME = '_dk_google_maps_loader_cb';
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.renderDOM = exports.registerComponent = exports.EventBus = exports.Component = void 0;
var Component_1 = require("./Component");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return __importDefault(Component_1).default; } });
var EventBus_1 = require("./EventBus");
Object.defineProperty(exports, "EventBus", { enumerable: true, get: function () { return __importDefault(EventBus_1).default; } });
var registerComponent_1 = require("./registerComponent");
Object.defineProperty(exports, "registerComponent", { enumerable: true, get: function () { return __importDefault(registerComponent_1).default; } });
var renderDOM_1 = require("./renderDOM");
Object.defineProperty(exports, "renderDOM", { enumerable: true, get: function () { return __importDefault(renderDOM_1).default; } });
var Store_1 = require("./Store");
Object.defineProperty(exports, "Store", { enumerable: true, get: function () { return __importDefault(Store_1).default; } });
//# sourceMappingURL=index.js.map
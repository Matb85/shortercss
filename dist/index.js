"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = __importDefault(require("./utils/library"));
const lodash_1 = __importDefault(require("lodash"));
const app_root_path_1 = __importDefault(require("app-root-path"));
module.exports = class ShorterCSS {
    constructor(config) {
        if (typeof config === "undefined")
            config = require(app_root_path_1.default + "/shortercss.config.js");
        if (typeof config === "string")
            config = require(app_root_path_1.default + config);
        this.ignores = lodash_1.default.extend({ classes: [], ids: [] }, config.ignores);
        this.bindings = lodash_1.default.extend({ css: ["css"], html: ["html"] }, config.bindings);
        this.processors = config.processors;
        this.classLibrary = new library_1.default(this.ignores.classes);
        this.idLibrary = new library_1.default(this.ignores.ids);
    }
};

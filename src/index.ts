"use strict";
// import processorUtils from "./utils/processor-utils";
import Library, { LibraryInstance } from "./utils/library";
import _ from "lodash";
import appRoot from "app-root-path";

export type ProcessorFunction = (file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance) => string;

export interface Bindings {
  [key: string]: Array<string>;
}
export interface Processors {
  [key: string]: Function;
}
export type IgnoresType = {
  classes: Array<string>;
  ids: Array<string>;
};
export interface Config {
  processors: Processors;
  bindings: Bindings;
  ignores: IgnoresType;
}

module.exports = class ShorterCSS {
  ignores: IgnoresType;
  processors: Processors;
  bindings: Bindings;
  classLibrary: LibraryInstance;
  idLibrary: LibraryInstance;
  constructor(config: Config) {
    if (typeof config === "undefined") config = require(appRoot + "/shortercss.config.js");
    if (typeof config === "string") config = require(appRoot + config);

    // ensure processor names are set as expected
    this.ignores = _.extend({ classes: [], ids: [] }, config.ignores);
    this.bindings = _.extend({ css: ["css"], html: ["html"] }, config.bindings);
    this.processors = config.processors;
    // build new libraries to use
    this.classLibrary = new Library(this.ignores.classes);
    this.idLibrary = new Library(this.ignores.ids);
  }
};

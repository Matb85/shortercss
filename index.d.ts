import { IgnoresType, Processors, Bindings, Config } from "./src/index";
import { LibraryInstance } from "./src/utils/library";

export default class ShorterCSS {
  ignores: IgnoresType;
  processors: Processors;
  bindings: Bindings;
  classLibrary: LibraryInstance;
  idLibrary: LibraryInstance;
  constructor(config: Config);
}

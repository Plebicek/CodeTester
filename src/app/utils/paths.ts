import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Returns project root path for cross-platforms
 */
const __dirname = dirname(fileURLToPath(import.meta.url))

export default __dirname
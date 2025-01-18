import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url))

/**
* Returns project root path for cross-platforms
 */
const rootDir = join(__dirname, "../../")

export default rootDir
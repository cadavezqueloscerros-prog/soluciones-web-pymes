import Pocketbase from 'pocketbase';

// On Hostinger Horizons the integrated backend uses /hcgi/platform.
// Static hosting requires an independently deployed PocketBase origin.
const POCKETBASE_API_URL = import.meta.env.VITE_POCKETBASE_URL || '/hcgi/platform';

const pocketbaseClient = new Pocketbase(POCKETBASE_API_URL);

export default pocketbaseClient;

export { pocketbaseClient };

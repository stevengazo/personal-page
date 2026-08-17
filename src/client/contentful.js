import { createClient } from "contentful";
import { credentials } from "../../site.config.mjs";

// Las credenciales tienen valores por defecto embebidos en site.config.mjs, asi
// que el cliente funciona sin .env; las variables de entorno los sobreescriben.
const client = createClient({
  space: credentials.contentfulSpaceId,
  accessToken: credentials.contentfulAccessToken,
});

export default client;

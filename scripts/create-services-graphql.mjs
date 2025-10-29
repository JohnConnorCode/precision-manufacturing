import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

async function createServicesViaGraphQL() {
  try {
    const servicesJson = readFileSync(join(__dirname, 'services-to-create.json'), 'utf-8');
    const services = JSON.parse(servicesJson);

    console.log(`Creating ${services.length} services via GraphQL...`);

    for (const service of services) {
      const slug = service.slug.current;

      // Build GraphQL mutation
      const mutation = `
        mutation CreateService {
          serviceCreate(input: {
            _type: "service"
            title: "${service.title.replace(/"/g, '\\"')}"
            slug: { current: "${slug}" }
            serviceCategory: "${service.serviceCategory}"
            contentStatus: "${service.contentStatus}"
          }) {
            document {
              _id
              title
            }
          }
        }
      `;

      try {
        const response = await fetch(
          `https://api.sanity.io/v2021-06-07/graphql/${projectId}/${dataset}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ query: mutation }),
          }
        );

        const data = await response.json();

        if (data.errors) {
          console.error(`❌ GraphQL error for ${service.title}:`, data.errors[0].message);
        } else if (data.data?.serviceCreate?.document) {
          console.log(`✅ Created: ${service.title} (${data.data.serviceCreate.document._id})`);
        } else {
          console.log(`⚠️ Unexpected response for ${service.title}:`, data);
        }
      } catch (error) {
        console.error(`❌ Request failed for ${service.title}:`, error.message);
      }
    }

    console.log('\n✨ GraphQL creation attempt complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

createServicesViaGraphQL();

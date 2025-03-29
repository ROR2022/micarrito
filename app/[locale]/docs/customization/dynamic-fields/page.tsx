import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function DynamicFieldsPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale: locale, namespace: 'Docs.nav' });
  const content = await getTranslations({ locale: locale, namespace: 'Docs.content.dynamicFields' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{content('title')}</h1>
      
      <p className="leading-7">
        {content('description')}
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('overview')}</h2>
        <p className="leading-7">
          Dynamic fields are a core feature of MarketFlex that allow you to adapt the platform to 
          different marketplace niches without extensive code changes. You can create custom field
          structures for various categories, enabling specialized listing types like real estate,
          vehicles, services, or any other domain.
        </p>
        <p className="leading-7">
          These fields are stored using PostgreSQL&apos;s JSONB data type, which provides both flexibility
          and performance when querying and filtering listings.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('howTheyWork')}</h2>
        <p className="leading-7">
          The dynamic fields system works as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Definition:</strong> Fields are defined in the <code>listing_configurations</code> table in Supabase</li>
          <li><strong>Category Association:</strong> Each category has its own set of custom field definitions</li>
          <li><strong>Form Generation:</strong> The frontend automatically renders form inputs based on these definitions</li>
          <li><strong>Storage:</strong> Data is stored in the <code>custom_fields</code> JSONB column in the <code>listings</code> table</li>
          <li><strong>Validation:</strong> Both client and server validate inputs against the field definitions</li>
          <li><strong>Display:</strong> Custom fields are rendered appropriately on listing details pages</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('fieldTypes')}</h2>
        <p className="leading-7">
          MarketFlex supports the following field types:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Field Type</th>
                <th className="border border-border p-2 text-left">Description</th>
                <th className="border border-border p-2 text-left">Additional Properties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2 font-medium">string</td>
                <td className="border border-border p-2">Text input field</td>
                <td className="border border-border p-2">minLength, maxLength, pattern</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">number</td>
                <td className="border border-border p-2">Numeric input field</td>
                <td className="border border-border p-2">min, max, step</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">boolean</td>
                <td className="border border-border p-2">Checkbox for true/false values</td>
                <td className="border border-border p-2">defaultValue</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">select</td>
                <td className="border border-border p-2">Dropdown selection</td>
                <td className="border border-border p-2">options (array of values)</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">multiselect</td>
                <td className="border border-border p-2">Multiple choice selection</td>
                <td className="border border-border p-2">options (array of values), maxItems</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">date</td>
                <td className="border border-border p-2">Date picker</td>
                <td className="border border-border p-2">minDate, maxDate</td>
              </tr>
              <tr>
                <td className="border border-border p-2 font-medium">textarea</td>
                <td className="border border-border p-2">Multi-line text input</td>
                <td className="border border-border p-2">minLength, maxLength, rows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('configuration')}</h2>
        <p className="leading-7">
          To configure dynamic fields for a category, you&apos;ll need to:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Define the field schema for your category</li>
          <li>Save the configuration to the <code>listing_configurations</code> table</li>
          <li>Test the form generation with the new fields</li>
        </ol>

        <p className="leading-7 mt-4">
          Here&apos;s an example of a field configuration for a car marketplace:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Definition of fields for "cars" category
const carFields = {
  brand: { 
    type: "string", 
    required: true,
    label: "Brand",
    placeholder: "e.g., Toyota, Honda, Ford"
  },
  model: { 
    type: "string", 
    required: true,
    label: "Model",
    placeholder: "e.g., Corolla, Civic, Focus"
  },
  year: { 
    type: "number", 
    required: true, 
    min: 1900, 
    max: 2024,
    label: "Year",
    placeholder: "Manufacturing year"
  },
  mileage: { 
    type: "number", 
    required: true,
    label: "Mileage",
    placeholder: "Mileage in kilometers" 
  },
  fuelType: { 
    type: "select", 
    options: ["Gasoline", "Diesel", "Electric", "Hybrid"],
    required: true,
    label: "Fuel Type"
  },
  features: {
    type: "multiselect",
    options: [
      "Air Conditioning", 
      "Power Steering", 
      "Power Windows",
      "ABS", 
      "Airbags", 
      "Navigation System",
      "Bluetooth", 
      "Backup Camera"
    ],
    label: "Features",
    required: false
  },
  description: {
    type: "textarea",
    label: "Additional Details",
    required: false,
    rows: 4,
    placeholder: "Describe the condition and any other details"
  }
};`}</code>
        </pre>

        <h3 className="text-xl font-semibold">Saving Configuration to Supabase</h3>
        <p className="leading-7">
          You can save the configuration using the Supabase client:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Function to save configuration
async function saveListingConfiguration(category, fields) {
  const { error } = await supabase
    .from('listing_configurations')
    .upsert({
      category_id: category.id,
      fields_schema: fields,
      required_fields: Object.entries(fields)
        .filter(([_, config]) => config.required)
        .map(([field]) => field)
    });
  
  if (error) throw error;
  
  return { success: true };
}`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('rendering')}</h2>
        <p className="leading-7">
          MarketFlex automatically renders the appropriate form inputs based on the field configuration.
          The <code>DynamicForm</code> component handles this:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Example usage in a listing form
import { DynamicForm } from '@/components/forms/dynamic-form';

// Inside your component
return (
  <DynamicForm
    schema={categoryFields}
    defaultValues={defaultValues}
    onSubmit={handleSubmit}
  />
);`}</code>
        </pre>

        <p className="leading-7 mt-4">
          The <code>DynamicForm</code> component will:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Generate the appropriate form inputs based on the field types</li>
          <li>Handle validation based on the field requirements</li>
          <li>Apply all specified constraints (min, max, patterns, etc.)</li>
          <li>Collect and format the form data on submission</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('querying')}</h2>
        <p className="leading-7">
          You can query listings based on their custom fields using PostgreSQL&apos;s JSONB operators:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Query listings with specific custom field values
const { data, error } = await supabase
  .from('listings')
  .select('*')
  .eq('category_id', carCategoryId)
  .filter('custom_fields->brand', 'eq', 'Toyota')
  .filter('custom_fields->year', 'gte', 2020)
  .order('created_at', { ascending: false });`}</code>
        </pre>

        <p className="leading-7 mt-4">
          To enable efficient filtering on custom fields, add GIN indexes to the JSONB column:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`-- Create a GIN index on the custom_fields column
CREATE INDEX idx_listings_custom_fields ON listings USING GIN (custom_fields);

-- Create a GIN index for a specific key in custom_fields (for very common filters)
CREATE INDEX idx_listings_custom_fields_brand ON listings USING GIN ((custom_fields->'brand'));`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('display')}</h2>
        <p className="leading-7">
          When displaying listings, you can render the custom fields using the <code>DynamicFields</code> component:
        </p>
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto mt-2">
          <code>{`// Example usage in a listing details page
import { DynamicFields } from '@/components/listings/dynamic-fields';

// Inside your component
return (
  <div className="listing-details">
    <h1>{listing.title}</h1>
    <p>{listing.description}</p>
    <DynamicFields 
      fields={listing.custom_fields} 
      schema={categoryFieldsSchema} 
    />
  </div>
);`}</code>
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('examples')}</h2>
        <p className="leading-7">
          MarketFlex includes examples for common marketplace types:
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Real Estate Example</h3>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
            <code>{`const realEstateFields = {
  propertyType: {
    type: "select",
    options: ["House", "Apartment", "Condo", "Land", "Commercial"],
    required: true,
    label: "Property Type"
  },
  size: {
    type: "number",
    min: 1,
    required: true,
    label: "Size (m²)"
  },
  bedrooms: {
    type: "number",
    min: 0,
    required: true,
    label: "Bedrooms"
  },
  bathrooms: {
    type: "number",
    min: 0,
    required: true,
    label: "Bathrooms"
  },
  location: {
    type: "object",
    properties: {
      latitude: { type: "number" },
      longitude: { type: "number" },
      address: { type: "string" }
    },
    required: true,
    label: "Location"
  },
  features: {
    type: "multiselect",
    options: [
      "Garden", "Pool", "Garage", "Security System",
      "Air Conditioning", "Heating", "Elevator"
    ],
    label: "Features"
  }
};`}</code>
          </pre>

          <h3 className="text-xl font-semibold">Service Marketplace Example</h3>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
            <code>{`const serviceFields = {
  serviceType: {
    type: "select",
    options: ["Cleaning", "Plumbing", "Electrical", "Tutoring", "Design"],
    required: true,
    label: "Service Type"
  },
  duration: {
    type: "select",
    options: ["1 hour", "2 hours", "Half day", "Full day", "Custom"],
    required: true,
    label: "Duration"
  },
  location: {
    type: "select",
    options: ["Remote", "On-site", "Both"],
    required: true,
    label: "Location Type"
  },
  availability: {
    type: "object",
    properties: {
      weekdays: { type: "boolean" },
      weekends: { type: "boolean" },
      evenings: { type: "boolean" }
    },
    label: "Availability"
  },
  experience: {
    type: "number",
    min: 0,
    label: "Years of Experience"
  },
  certifications: {
    type: "array",
    items: { type: "string" },
    label: "Certifications"
  }
};`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{content('bestPractices')}</h2>
        <p className="leading-7">
          When working with dynamic fields, follow these best practices:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Plan your schema:</strong> Carefully plan your field schema to ensure it captures all necessary information without being overly complex.
          </li>
          <li>
            <strong>Use appropriate validation:</strong> Define proper validation rules to ensure data quality.
          </li>
          <li>
            <strong>Consider indexing:</strong> Add appropriate JSONB indexes for fields that will be frequently used in filters and searches.
          </li>
          <li>
            <strong>Test thoroughly:</strong> Test your dynamic fields across different devices and browsers to ensure a consistent user experience.
          </li>
          <li>
            <strong>Manage migrations:</strong> When updating field schemas, plan for data migration to handle existing listings.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href={`/${locale}/docs/customization`} className="text-primary hover:underline">
          ← {t('customization')}
        </Link>
        <Link href={`/${locale}/docs/customization/styling`} className="text-primary hover:underline">
          {t('styling')} →
        </Link>
      </div>
    </div>
  );
} 
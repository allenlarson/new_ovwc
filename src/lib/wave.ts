import { Proposal } from '@/types/proposal';

const WAVE_API = 'https://gql.waveapps.com/graphql/public';
const TOKEN = process.env.WAVE_ACCESS_TOKEN!;
const BUSINESS_ID =
  'QnVzaW5lc3M6MzE3YTg2ZjEtOGExMi00N2UxLWE2YjctMWE1Y2I1NzY1MjZm'; // Ocean View Web Co.
const DEFAULT_PRODUCT_ID =
  'QnVzaW5lc3M6MzE3YTg2ZjEtOGExMi00N2UxLWE2YjctMWE1Y2I1NzY1MjZmO1Byb2R1Y3Q6MTE4OTA2OTMx'; // Web Development

async function waveQuery(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(WAVE_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) {
    console.error('[Wave API errors]', JSON.stringify(data.errors));
    throw new Error(data.errors[0]?.message || 'Wave API error');
  }
  return data.data;
}

async function findOrCreateCustomer(name: string, email?: string): Promise<string> {
  // Try creating the customer
  const data = await waveQuery(
    `mutation ($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        didSucceed
        inputErrors { message path }
        customer { id name email }
      }
    }`,
    {
      input: {
        businessId: BUSINESS_ID,
        name,
        ...(email ? { email } : {}),
      },
    },
  );

  if (data.customerCreate.didSucceed) {
    return data.customerCreate.customer.id;
  }

  // If creation failed (e.g. duplicate), search existing customers by name/email
  const listData = await waveQuery(
    `query ($businessId: ID!) {
      business(id: $businessId) {
        customers(page: 1, pageSize: 500) {
          edges { node { id name email } }
        }
      }
    }`,
    { businessId: BUSINESS_ID },
  );

  const lowerName = name.toLowerCase();
  const lowerEmail = email?.toLowerCase();
  const match = listData.business.customers.edges.find(
    (e: { node: { name: string; email?: string } }) =>
      e.node.name.toLowerCase() === lowerName ||
      (lowerEmail && e.node.email?.toLowerCase() === lowerEmail),
  );

  if (match) return match.node.id;
  throw new Error(`Could not create or find customer: ${name}`);
}

/**
 * Creates a Wave invoice from a signed proposal.
 * Uses proposal services as line items, net-30 payment terms.
 */
export async function createWaveInvoice(proposal: Proposal) {
  // 1. Find or create customer in Wave
  const customerId = await findOrCreateCustomer(
    proposal.clientCompany || proposal.clientName,
    proposal.clientEmail,
  );

  // 2. Build line items from proposal services
  const items = proposal.services
    .filter((s) => s.name.trim())
    .map((s) => ({
      productId: DEFAULT_PRODUCT_ID,
      description: s.name + (s.description ? ` — ${s.description}` : ''),
      quantity: 1,
      unitPrice: String(parseFloat(s.price.replace(/[^0-9.]/g, '')) || 0),
    }));

  if (items.length === 0) {
    throw new Error('No services to invoice');
  }

  // 3. Dates: today + net-30
  const today = new Date();
  const due = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const invoiceDate = today.toISOString().split('T')[0];
  const dueDate = due.toISOString().split('T')[0];

  // 4. Create invoice
  const data = await waveQuery(
    `mutation ($input: InvoiceCreateInput!) {
      invoiceCreate(input: $input) {
        didSucceed
        inputErrors { message path }
        invoice {
          id
          viewUrl
          pdfUrl
          status
          invoiceNumber
        }
      }
    }`,
    {
      input: {
        businessId: BUSINESS_ID,
        customerId,
        items,
        invoiceDate,
        dueDate,
      },
    },
  );

  if (!data.invoiceCreate.didSucceed) {
    const errors = data.invoiceCreate.inputErrors;
    console.error('[Wave invoice creation failed]', JSON.stringify(errors));
    throw new Error(errors?.[0]?.message || 'Failed to create invoice in Wave');
  }

  const inv = data.invoiceCreate.invoice;
  return {
    id: inv.id as string,
    viewUrl: inv.viewUrl as string,
    pdfUrl: inv.pdfUrl as string,
    invoiceNumber: inv.invoiceNumber as string,
  };
}

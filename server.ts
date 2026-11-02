import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateQuoteForm, generateQuoteReferenceId, calculateEstimatedRate } from './src/utils/freight.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory quote database with initial verified quote logs
interface QuoteRecord {
  id: string;
  referenceId: string;
  createdAt: string;
  status: 'received' | 'reviewing' | 'dispatched' | 'fulfilled';
  data: any;
  estimate: any;
}

const quotesStore: QuoteRecord[] = [
  {
    id: 'seed-1',
    referenceId: 'BCS-Q-7721A',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'dispatched',
    data: {
      fullName: 'Marcus Sterling',
      businessEmail: 'msterling@vanguardlog.com',
      companyName: 'Vanguard Industrial Supply',
      phoneNumber: '5625550143',
      originLocation: 'Port of Los Angeles (Berth 206)',
      destinationLocation: 'BNSF Hobart Yard → Ontario Inland DC, CA',
      freightType: 'port-drayage',
      cargoType: 'standard-dry',
      approxWeightLbs: 42100,
      dimensionsOrPallets: '2x 40ft High Cube Ocean Containers',
      preferredDate: '2026-11-04',
      additionalDetails: 'Chassis already reserved with harbor pool.',
    },
    estimate: {
      estimatedCostMin: 1100,
      estimatedCostMax: 1600,
      estimatedTransitDaysMin: 1,
      estimatedTransitDaysMax: 2,
      carbonReductionPercent: 20,
      modeDescription: 'Harbor drayage & container terminal interchange',
    },
  },
];

// Real API endpoint for submitting freight quote inquiries
app.post('/api/quote', (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const validation = validateQuoteForm(formData);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid shipment quotation request. Please check required fields.',
        errors: validation.errors,
      });
    }

    const referenceId = generateQuoteReferenceId('BCS-Q');
    const estimate = calculateEstimatedRate(formData);

    const record: QuoteRecord = {
      id: Buffer.from(Math.random().toString()).toString('base64').substring(2, 10),
      referenceId,
      createdAt: new Date().toISOString(),
      status: 'received',
      data: formData,
      estimate,
    };

    quotesStore.unshift(record);

    return res.status(201).json({
      success: true,
      message: 'Freight quote request successfully received and assigned to our dispatch coordinator.',
      referenceId,
      estimate,
      submissionTime: record.createdAt,
    });
  } catch (error) {
    console.error('Error handling quote submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing quote request.',
    });
  }
});

// Retrieve quote status by reference ID
app.get('/api/quote/:referenceId', (req: Request, res: Response) => {
  const quote = quotesStore.find(
    (q) => q.referenceId.toLowerCase() === req.params.referenceId.toLowerCase()
  );

  if (!quote) {
    return res.status(404).json({
      success: false,
      message: 'Shipment reference not found.',
    });
  }

  return res.json({
    success: true,
    quote,
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Booth Courier Service Logistics API',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (!isProduction) {
    // Dynamic import vite for development mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Booth Courier Service Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

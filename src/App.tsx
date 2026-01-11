import { Suspense, use } from 'react';
import { fetchInstruments } from '@/data/sampleData';
import { InstrumentsTable } from './components/instruments/InstrumentsTable';

function InstrumentsLoader({ promise }: { promise: ReturnType<typeof fetchInstruments> }) {
  const instruments = use(promise);
  return <InstrumentsTable instruments={instruments} />;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-600">Loading instruments...</p>
      </div>
    </div>
  );
}

function App() {
  const instrumentsPromise = fetchInstruments();

  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen flex flex-col">
        <header className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold">Financial Instruments</h1>
            <p className="text-slate-600 ">Real-time market data dashboard</p>
          </div>
        </header>

        <main className="flex-1 px-6 pb-8">
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
              <InstrumentsLoader promise={instrumentsPromise} />
            </Suspense>
          </div>
        </main>

        <footer className="py-6 px-6 border-t border-slate-200/50">
          <div className="max-w-6xl mx-auto text-center text-sm text-slate-500">
            <p>Click on column headers to sort</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

import { getTenders } from '@/lib/data';
import { formatDate } from '@/lib/date-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileLines } from '@fortawesome/free-solid-svg-icons';
import type { Tender } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const isTenderNew = (date: string) => {
  const tenderDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - tenderDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

const isTenderClosed = (closingDate: string) => {
  const closing = new Date(closingDate);
  const now = new Date();
  // Set time to start of day for accurate comparison
  closing.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return now > closing;
}

export default function TendersPage() {
  // Sort tenders by closing date, most recent first
  const tenders: Tender[] = getTenders().sort((a, b) => new Date(b.closingDate).getTime() - new Date(a.closingDate).getTime());

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <FontAwesomeIcon icon={faFileLines} className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">Tenders & Expressions of Interest</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          Find information about our latest procurement needs, partnership opportunities, and Expressions of Interest (EOIs).
        </p>
      </div>

      <div className="mt-8 md:mt-12 space-y-6 md:space-y-8 max-w-5xl mx-auto">
        {tenders.map((tender) => (
          <Card key={tender.id} className="transition-all hover:shadow-md">
            <CardHeader className="grid grid-cols-1 items-start gap-4 space-y-0 md:grid-cols-3 md:space-x-4">
              <div className="space-y-2 md:col-span-2">
                 <div className="flex items-center gap-2">
                  {isTenderNew(tender.closingDate) && <Badge>New</Badge>}
                  <CardTitle className="font-headline text-lg md:text-xl">{tender.title}</CardTitle>
                </div>
                <CardDescription>Reference No: {tender.referenceNumber}</CardDescription>
              </div>
              <div className="flex w-full items-center space-x-1 pt-2 text-sm text-muted-foreground md:ml-auto md:w-auto md:justify-end">
                <p>Closing Date: <span className="font-medium text-foreground">{formatDate(tender.closingDate)}</span></p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-4 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faFileLines} className="h-8 w-8 flex-shrink-0 text-primary" />
                  <div className="ml-4 flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Official Tender Document
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isTenderClosed(tender.closingDate) 
                        ? 'This tender has closed.' 
                        : 'Download for full details and submission guidelines.'}
                    </p>
                  </div>
                </div>
                {!isTenderClosed(tender.closingDate) && (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={tender.documentUrl} download>
                      <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" /> Download PDF
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

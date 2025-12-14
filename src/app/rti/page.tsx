import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

export default function RTIPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <FontAwesomeIcon icon={faScaleBalanced} className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">Right to Information</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          Right to Information Act-2005 PROFORMA
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mode of Payment of Fees under Right to Information Act, 2005</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Gazette Notification dated 22.12.2007 and 03.06.2008 by which the procedure for remittance of fee for providing information in the case of Public Authorities other than Government Departments is amended vide Government Order No. GO (P) No. 540/2007/GAD dated 18th December, 2007 as detailed below:
            </p>
            <p className="text-muted-foreground font-semibold">
              &quot;provided that in the case of public authorities other than the Government Departments, the fee shall be remitted to the account of such public authority as provided in clauses (c) and (d) of rule 3&quot;.
            </p>
            <p className="text-muted-foreground">
              Clauses c & d are specified as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>c)</strong> by cash remittance against proper receipt in the Office of the Public Information Officer/Assistant Public Information Officer as the case may be, or
              </li>
              <li>
                <strong>d)</strong> by Demand Draft/bankers cheque/ pay order payable to the Public Information Officer/ Assistant Public Information Officer.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Bank Details for Online Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Account Name:</p>
                  <p className="text-base font-bold">THE KERALA STATE COIR MACHINERY MANUFACTURING COMPANY LTD</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Account Number:</p>
                  <p className="text-base font-bold">402000003413</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Bank Name:</p>
                  <p className="text-base font-bold">INDIAN OVERSEAS BANK</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Branch:</p>
                  <p className="text-base font-bold">ALAPPUZHA</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">IFSC Code:</p>
                  <p className="text-base font-bold">IOBA0000004</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">MICR Code:</p>
                  <p className="text-base font-bold">688020002</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


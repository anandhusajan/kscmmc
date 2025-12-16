import { getJobs } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faBriefcase, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { formatDateLong } from '@/lib/date-utils';

export default function CareersPage() {
  const jobs = getJobs();
  
  // Calculate application deadline (15 days from today)
  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(today.getDate() + 15);
  const deadlineDate = formatDateLong(deadline);

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <FontAwesomeIcon icon={faBriefcase} className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">Careers at KSCMMC</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          Join our team of innovators and contribute to the future of the coir industry. We are looking for passionate individuals to grow with us.
        </p>
      </div>
      
      <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-headline text-xl md:text-2xl font-bold mb-2">WANTED PROFESSIONALS</h2>
          <Badge className="bg-primary text-white">Contract Basis</Badge>
        </div>
        <h2 className="font-headline text-xl md:text-2xl font-bold mb-6">Current Openings</h2>
        {jobs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {jobs.map(job => (
              <AccordionItem key={job.id} value={job.id}>
                <AccordionTrigger>
                  <div className="flex flex-col items-start text-left">
                    <h3 className="text-base md:text-lg font-semibold">{job.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-1.5 h-4 w-4" /> {job.location} - {job.department}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4">
                    {job.description.map((line, index) => (
                      <p key={index} className="text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground">There are currently no open positions. Please check back later.</p>
        )}

        <Card className="mt-8 md:mt-12">
          <CardHeader>
            <CardTitle className="font-headline">How to Apply</CardTitle>
            <CardDescription>Application Instructions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-2">
                Apply with CV & copies of proof (Age, Qualification, Exp., Caste, Email & Mobile) to:
              </p>
              <p className="font-semibold">
                Managing Director, KSCMMC Ltd.,<br />
                28/138 CCSB Road, Chungam, Alappuzha- 11
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Application deadline: <span className="font-semibold text-foreground">{deadlineDate}</span> (superscribe post on envelope)
              </p>
            </div>
            
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Phone:</span>
                <a href="tel:+919746865370" className="hover:text-primary">+91 9746865370</a>
                <span className="text-muted-foreground">,</span>
                <a href="tel:+919746175950" className="hover:text-primary">9746175950</a>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Website:</span>
                <a href="https://kscmmc.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary">kscmmc.in</a>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Email:</span>
                <a href="mailto:kscmmc1@gmail.com" className="hover:text-primary">kscmmc1@gmail.com</a>
                <span className="text-muted-foreground">,</span>
                <a href="mailto:hrkscmmc@gmail.com" className="hover:text-primary">hrkscmmc@gmail.com</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

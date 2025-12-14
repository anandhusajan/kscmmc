import { getJobs } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faBriefcase } from '@fortawesome/free-solid-svg-icons';

export default function CareersPage() {
  const jobs = getJobs();

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
            <CardDescription>Interested in joining us?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you are interested in any of the positions above, or wish to be considered for future openings, please send your resume and a cover letter to our HR department. Make sure to mention the position you are applying for in the subject line.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href="mailto:careers@kscmmc.com">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4" /> Email Your Application
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faUsers } from '@fortawesome/free-solid-svg-icons';


const leadershipTeam = [
  { name: 'Shri. M. H. Rasheed', role: 'CHAIRMAN', imageId: 'about-us-team-1' },
  { name: 'Shri. M. K. Sasikumar', role: 'Managing Director', imageId: 'about-us-team-2' },
  { name: 'Smt. Anie Jula Thomas IAS', role: 'DIRECTOR OF COIR DEVELOPMENT', imageId: 'about-us-team-3' },
  { name: 'Shri. Siju Jacob', role: 'JOINT SECRETARY', imageId: 'about-us-team-1' },
  { name: 'Shri. Santhosh Kumar', role: 'Director', imageId: 'about-us-team-2' },
];

export default function AboutPage() {
  const historyImage = PlaceHolderImages.find(p => p.id === 'about-us-history');

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <FontAwesomeIcon icon={faUsers} className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">About Us</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-muted-foreground">
          Ensuring development & growth of coir based industries in Kerala.
        </p>
      </div>

      <section className="mt-8 md:mt-16">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {historyImage && (
              <div className="relative min-h-[300px]">
                <Image
                  src={historyImage.imageUrl}
                  alt={historyImage.description}
                  data-ai-hint={historyImage.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-8">
              <h2 className="font-headline text-2xl md:text-3xl font-bold">About Us</h2>
              <p className="mt-4 text-base md:text-base text-muted-foreground">
                KERALA STATE COIR MACHINERY MANUFACTURING COMPANY (KSCMMC) is a Kerala Government initiative which is committed for ensuring development & growth of coir based industries in Kerala. KSCMMC is situated in Alleppey, Popularly known as Venice of East. Alleppey is known as the traditional home of coir industry in Kerala & Coir is the most important commodity manufactured in Alappuzha. KSCMMC focus upon the development of coir manufacturing equipments & machineries in order to boost the growth of coir industry in India. Our approach is to ensure the growth of coir industry by manufacturing coir fibre extraction machineries, which are well equipped & finely designed entrusted to optimum performance & easy to operate.
              </p>
            </div>
          </div>
        </Card>
      </section>



      <section className="mt-8 md:mt-16 text-center">
        <h2 className="font-headline text-2xl md:text-3xl font-bold">Meet Our Leadership</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          The driving force behind our success is a team of dedicated and visionary leaders.
        </p>
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {leadershipTeam.map(leader => {
            const leaderImage = PlaceHolderImages.find(p => p.id === leader.imageId);
            return (
              <Card key={leader.name} className="text-center">
                <CardContent className="p-6">
                  {leaderImage && (
                    <div className="relative mx-auto mb-4 h-32 w-32">
                      <Image
                        src={leaderImage.imageUrl}
                        alt={leader.name}
                        data-ai-hint={leaderImage.imageHint}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-headline text-lg md:text-xl font-semibold">{leader.name}</h3>
                  <p className="text-primary">{leader.role}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';


const chairman = { 
  name: 'Shri. M. H. Rasheed', 
  role: 'CHAIRMAN', 
  image: '/team/Shri-M-H-Rasheed.webp' 
};

const managers = [
  { name: 'Shri. M. K. Sasikumar', role: 'Managing Director', image: '/team/Shri-M-K-Sasikumar.webp' },
  { name: 'Smt. Anie Jula Thomas IAS', role: 'DIRECTOR OF COIR DEVELOPMENT', image: '/team/Smt-Anie-Jula-Thomas-I-A-S.webp' },
];

export default function AboutPage() {
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
          <div className="p-8 md:p-10">
            <p className="text-base md:text-base text-muted-foreground">
              Kerala State Coir Machinery Manufacturing Company (KSCMMC) is a Kerala Government initiative committed to ensuring the development and growth of coir-based industries in Kerala. KSCMMC is situated in Alappuzha (Alleppey), popularly known as the Venice of the East. Alappuzha is the traditional home of the coir industry in Kerala, and coir is the most important commodity manufactured in the region. KSCMMC focuses on the development of coir manufacturing equipment and machinery to boost the growth of the coir industry in India. Our approach is to ensure the advancement of the coir industry by manufacturing coir fibre extraction machinery that is well-equipped, finely designed, optimized for high performance, and easy to operate.
            </p>
          </div>
        </Card>
      </section>



      {/* Chairman Section */}
      <section className="mt-8 md:mt-16 text-center">
        <h2 className="font-headline text-2xl md:text-3xl font-bold">Meet Our Leadership</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          The driving force behind our success is a team of dedicated and visionary leaders.
        </p>
        <div className="mt-8 md:mt-12 flex justify-center">
          <Card className="text-center max-w-md md:max-w-lg">
            <CardContent className="p-8 md:p-10">
              <div className="relative mx-auto mb-6 h-40 w-40 md:h-48 md:w-48">
                <Image
                  src={chairman.image}
                  alt={chairman.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-headline text-xl md:text-2xl font-semibold">{chairman.name}</h3>
              <p className="text-primary text-lg md:text-xl mt-2">{chairman.role.toUpperCase()}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Managers Section */}
      <section className="mt-8 md:mt-16 text-center">
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2">
          {managers.map((manager) => {
            return (
              <Card key={manager.name} className="text-center">
                <CardContent className="p-6">
                  <div className="relative mx-auto mb-4 h-32 w-32">
                    <Image
                      src={manager.image}
                      alt={manager.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-headline text-lg md:text-xl font-semibold">{manager.name}</h3>
                  <p className="text-primary">{manager.role.toUpperCase()}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

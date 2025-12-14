import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactForm } from '@/components/forms/contact-form';

export default function ContactPage() {
    return (
    <div className="w-full">
      <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">
      <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="h-8 w-8 text-primary" />
          </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          We're here to help. Reach out to us with your questions, inquiries, or feedback.
        </p>
        </div>
      </div>

      {/* Contact Form and Details Section */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-2">
        <div className="space-y-8">
            <div>
                <h2 className="font-headline text-xl md:text-2xl font-bold">Get in Touch</h2>
                <p className="mt-2 text-muted-foreground">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>
            <ContactForm />
        </div>
        <div className="space-y-8">
            <div className="space-y-6">
                <h3 className="font-headline text-xl md:text-2xl font-semibold">Our Locations</h3>
                <div className="flex items-start">
                <FontAwesomeIcon icon={faLocationDot} className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                        <p className="font-semibold">Head Office</p>
                        <p className="text-muted-foreground">
                            28/138, CCSB Road, Chungom<br/>
                            Alappuzha, Kerala, 688011, India
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                <FontAwesomeIcon icon={faLocationDot} className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                        <p className="font-semibold">Factory</p>
                        <p className="text-muted-foreground">
                            48/827B, Near SDV Central School, Sanathanam<br/>
                            Alappuzha, Kerala, 688001, India
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-headline text-xl md:text-2xl font-semibold">Contact Details</h3>
                <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-4 h-5 w-5 text-primary" />
                    <a href="tel:+914772240250" className="text-muted-foreground hover:text-primary">0477-2240250 to 289</a>
                </div>
                <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-4 h-5 w-5 text-primary" />
                <a href="mailto:support@kscmmc.in" className="text-muted-foreground hover:text-primary">support@kscmmc.in</a>
                </div>
                <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-4 h-5 w-5 text-primary" />
                <a href="mailto:hr@kscmmc.in" className="text-muted-foreground hover:text-primary">hr@kscmmc.in</a>
                </div>
                 <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-4 h-5 w-5 text-primary" />
                <a href="mailto:accounts@kscmmc.in" className="text-muted-foreground hover:text-primary">accounts@kscmmc.in</a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maps Section */}
      <div className="w-full mt-8 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Head Office Map */}
            <div className="space-y-3">
              <h3 className="font-headline text-xl font-semibold">Head Office</h3>
              <div className="relative w-full h-[50vh] min-h-[300px] rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps?q=9.4933409,76.3468143&hl=en&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="KSCMMC Head Office"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                28/138, CCSB Road, Chungom<br/>
                Alappuzha, Kerala, 688011, India
              </p>
              <a 
                href="https://www.google.com/maps/place/Kerala+State+Coir+Machinery+Manufacturing+Company+Limited+(+HEAD+OFFICE+)/@9.4933409,76.3442394,17z/data=!3m1!4b1!4m6!3m5!1s0x3b08848968949ec7:0xbb9136e48e7f9622!8m2!3d9.4933409!4d76.3468143!16s%2Fg%2F1q6jz5gsh?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-block"
              >
                View on Google Maps →
              </a>
            </div>

            {/* Factory Map */}
            <div className="space-y-3">
              <h3 className="font-headline text-xl font-semibold">Factory</h3>
              <div className="relative w-full h-[50vh] min-h-[300px] rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps?q=9.5021478,76.3389898&hl=en&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="KSCMMC Factory"
                    />
                </div>
              <p className="text-sm text-muted-foreground">
                48/827B, Near SDV Central School, Sanathanam<br/>
                Alappuzha, Kerala, 688001, India
              </p>
              <a 
                href="https://www.google.com/maps/place/Kerala+State+Coir+Machinery+Manufacturing+Company+Limited+(Factory)/@9.5020692,76.3382618,18.75z/data=!4m14!1m7!3m6!1s0x3b08848968949ec7:0xbb9136e48e7f9622!2sKerala+State+Coir+Machinery+Manufacturing+Company+Limited+(+HEAD+OFFICE+)!8m2!3d9.4933409!4d76.3468143!16s%2Fg%2F1q6jz5gsh!3m5!1s0x3b08845ddfc4ea0b:0xedd13ae06eb8b4ce!8m2!3d9.5021478!4d76.3389898!16s%2Fg%2F11f3wr_0m1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-block"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
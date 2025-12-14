import { formatDateLong } from '@/lib/date-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';

export default function PrivacyPolicyPage() {
  // Use a fixed date to avoid hydration mismatch
  const lastUpdated = '2024-01-15';
  
  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12 max-w-4xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <FontAwesomeIcon icon={faShield} className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
        Your privacy is important to us.
      </p>
      </div>

      <div className="prose dark:prose-invert mt-8 max-w-none">
        <p>Last updated: {formatDateLong(lastUpdated)}</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to the Kerala State Coir Machinery Manufacturing Company Limited (&quot;KSCMMC&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This privacy policy explains how we collect, use, and share information about you when you visit our website.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We may collect personal information that you voluntarily provide to us when you use our contact forms, apply for careers, or interact with our AI-powered FAQ. This information may include:
        </p>
        <ul>
          <li>Your name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>The content of your messages or inquiries</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Process job applications.</li>
          <li>Improve our website and services.</li>
          <li>Communicate with you about news and updates, if you have opted in.</li>
        </ul>

        <h2>4. Information Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us using the information provided on our contact page.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@kscmmc.com">info@kscmmc.com</a>.
        </p>
      </div>
    </div>
  );
}

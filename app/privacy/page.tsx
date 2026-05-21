import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalList, LegalLink } from "@/components/legal-section";

export const metadata: Metadata = {
  title: "Privacy Policy, Hussainya",
  description:
    "How Hussainya collects, uses, and protects personal information for the Shia Muslim community, in line with the Australian Privacy Principles.",
};

const LAST_UPDATED = "22 May 2026";
const CONTACT_EMAIL = "support@hussainya.com";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Legal</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-[var(--font-lora)] text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-[var(--subtext)]">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </div>

      <div className="border-y border-[var(--border)] bg-[var(--surface)] mb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10">
          <div className="lg:col-span-3">
            <div className="eyebrow">Preamble</div>
          </div>
          <div className="lg:col-span-9 text-[var(--text)] leading-relaxed">
            Hussainya (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an independent
            platform connecting the Shia Muslim community to Islamic centres, programs, prayer
            times, and ibadah tools. We are bound by the Australian Privacy Principles
            (&ldquo;APPs&rdquo;) in Schedule 1 of the{" "}
            <em className="font-[var(--font-lora)]">Privacy Act 1988 (Cth)</em>. This policy
            describes how we collect, hold, use, disclose, secure, and let you access and
            correct your personal information.
          </div>
        </div>
      </div>

      <LegalSection n="I" title="Sensitive information & implied disclosure">
        <p className="text-[var(--subtext)]">
          Information about a person&apos;s religious beliefs or affiliations is{" "}
          <strong className="text-[var(--text)]">
            sensitive information under the Privacy Act
          </strong>
          . By creating a Hussainya account, favouriting Shia Islamic centres, RSVPing to
          religious programs, or using ibadah tools, you may be disclosing religious
          affiliation. By using the service you{" "}
          <strong className="text-[var(--text)]">consent</strong> to us collecting and
          handling that information for the purposes set out in this policy. You can withdraw
          that consent by deleting your account.
        </p>
      </LegalSection>

      <LegalSection n="II" title="Anonymity & pseudonymity">
        <p className="text-[var(--subtext)]">
          You can browse public information in Hussainya, such as centre listings, public
          programs, and prayer times, without creating an account. Where features require an
          account (favouriting, RSVPs, ibadah tracking, centre management, push
          notifications), we need at minimum an email address so we can authenticate you and
          contact you about your account. You may use a pseudonym for any display name, but a
          working email is required.
        </p>
      </LegalSection>

      <LegalSection n="III" title="Information we collect">
        <p className="text-[var(--subtext)]">
          We collect only what is reasonably necessary to run the service:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-[var(--text)]">Account information:</strong> your email
              address and an encrypted password when you sign up. Authentication is handled by
              Supabase.
            </>,
            <>
              <strong className="text-[var(--text)]">Profile activity:</strong> favourited
              centres, RSVP&apos;d programs, ibadah tracking entries, and notes you create
              inside the app.
            </>,
            <>
              <strong className="text-[var(--text)]">Centre manager data:</strong> if you
              manage a centre, we record your role, the centre you manage, and the programs,
              announcements, and bookings you publish.
            </>,
            <>
              <strong className="text-[var(--text)]">Location (optional):</strong> when you
              grant permission, your approximate location is used on-device to calculate
              prayer times and Qibla direction. We do not store precise coordinates on our
              servers.
            </>,
            <>
              <strong className="text-[var(--text)]">Device &amp; usage data:</strong> basic
              logs (IP address, user agent, pages visited, errors) collected by our hosting
              and DNS providers. Push notification identifiers are managed by OneSignal if
              you opt in.
            </>,
            <>
              <strong className="text-[var(--text)]">Cookies &amp; local storage:</strong> we
              use essential cookies and browser local storage to keep you signed in, remember
              theme preferences, and operate the service. We do not use third-party
              advertising trackers.
            </>,
            <>
              <strong className="text-[var(--text)]">Payment data:</strong> for centre
              subscriptions, payments are processed by Stripe. We never see or store your
              full card details. We only retain the subscription status returned by Stripe.
            </>,
            <>
              <strong className="text-[var(--text)]">AI interactions:</strong> when you use
              the jurisprudence, duas, or aamal features, your queries are sent to
              third-party AI providers (Anthropic, Google, OpenAI) to generate responses.
            </>,
          ]}
        />
        <p className="text-[var(--subtext)]">
          We collect personal information directly from you wherever practicable. Where we
          collect indirectly (for example, basic device logs from your browser, or
          subscription status from Stripe), we do so by lawful and fair means and only as
          needed to operate the service.
        </p>
      </LegalSection>

      <LegalSection n="IV" title="Why we collect, hold, and use it">
        <LegalList
          items={[
            "Authenticating you and keeping your account secure.",
            "Showing centres, programs, and prayer times relevant to you.",
            "Delivering push notifications you have opted into, such as program reminders and jamaat times.",
            "Processing and renewing centre subscriptions through Stripe.",
            "Generating answers from Islamic source material via our AI features.",
            "Investigating abuse, debugging errors, and improving the app.",
            "Complying with our legal obligations.",
          ]}
        />
        <p className="text-[var(--subtext)]">
          We will only use or disclose your personal information for a secondary purpose if
          you would reasonably expect it, you have consented, or another exception under APP
          6 applies (for example, to prevent a serious threat or where required by law).
        </p>
      </LegalSection>

      <LegalSection n="V" title="Direct marketing">
        <p className="text-[var(--subtext)]">
          We do not sell your information and we do not run third-party advertising. We may
          occasionally send service-related communications (account, security, or billing
          notices) and, where you have opted in, push notifications about programs at centres
          you follow. Every marketing communication includes a simple opt-out, and you can
          turn off push notifications at any time from your device settings.
        </p>
      </LegalSection>

      <LegalSection n="VI" title="Sharing with third parties">
        <p className="text-[var(--subtext)]">
          We don&apos;t sell your data. We share limited information with the processors
          that make the app work:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-[var(--text)]">Supabase:</strong> authentication and
              database hosting.
            </>,
            <>
              <strong className="text-[var(--text)]">DigitalOcean:</strong> application
              hosting and infrastructure.
            </>,
            <>
              <strong className="text-[var(--text)]">Cloudflare:</strong> DNS, network
              security, and email routing for our public addresses.
            </>,
            <>
              <strong className="text-[var(--text)]">Stripe:</strong> payment processing for
              centre subscriptions.
            </>,
            <>
              <strong className="text-[var(--text)]">OneSignal:</strong> push notification
              delivery, only if you opt in.
            </>,
            <>
              <strong className="text-[var(--text)]">Anthropic, Google, and OpenAI:</strong>{" "}
              model providers for the AI-powered ibadah and jurisprudence features.
            </>,
          ]}
        />
        <p className="text-[var(--subtext)]">
          We may also disclose information where required or authorised by law, to protect
          the rights and safety of users, or as part of a business sale or restructure (in
          which case the recipient will be bound by terms no less protective than this
          policy).
        </p>
      </LegalSection>

      <LegalSection n="VII" title="Cross-border disclosure">
        <p className="text-[var(--subtext)]">
          The processors above may store or process your personal information outside
          Australia. Personal information is likely to be disclosed to recipients in:
        </p>
        <LegalList
          items={[
            "the United States (DigitalOcean, Cloudflare, Stripe, OneSignal, Anthropic, OpenAI, Google).",
            "the European Union and the United Kingdom (Stripe, Supabase regional infrastructure).",
            "Singapore and other Asia-Pacific regions (Supabase, DigitalOcean edge infrastructure).",
          ]}
        />
        <p className="text-[var(--subtext)]">
          Before disclosing personal information overseas, we take steps that are reasonable
          in the circumstances to ensure the recipient does not breach the APPs, including
          selecting reputable providers and relying on their contractual data-protection
          commitments. By using Hussainya you acknowledge that, where these steps have been
          taken, APP 8.1 does not require us to be accountable for an overseas
          recipient&apos;s acts that would breach the APPs.
        </p>
      </LegalSection>

      <LegalSection n="VIII" title="Centre managers and public content">
        <p className="text-[var(--subtext)]">
          Information that centre managers publish, such as centre name, address, contact
          details, programs, and announcements, is intended to be publicly visible
          inside Hussainya. Don&apos;t publish personal information about other people
          without their consent.
        </p>
      </LegalSection>

      <LegalSection n="IX" title="Children">
        <p className="text-[var(--subtext)]">
          Hussainya is intended for users aged 13 and over. If you are a parent or guardian
          and believe a child has created an account, contact us and we&apos;ll remove it.
        </p>
      </LegalSection>

      <LegalSection n="X" title="Data quality, retention & destruction">
        <p className="text-[var(--subtext)]">
          We take reasonable steps to keep the personal information we hold accurate, up to
          date, and complete. You can review and update most of your information from the
          account screen at any time.
        </p>
        <p className="text-[var(--subtext)]">
          We retain your account data while your account is active. When you delete your
          account, we destroy or de-identify the personal information we no longer need,
          subject to records we are required to keep by law (for example, payment and tax
          records, or records relevant to a legal claim or abuse investigation).
        </p>
      </LegalSection>

      <LegalSection n="XI" title="Security & data breaches">
        <p className="text-[var(--subtext)]">
          We take reasonable steps to protect personal information from misuse, interference,
          loss, and unauthorised access, modification, or disclosure. Safeguards include
          encrypted connections (HTTPS), hashed passwords, role-based access controls, and
          reputable cloud providers.
        </p>
        <p className="text-[var(--subtext)]">
          No system is perfectly secure. If we become aware of a data breach that is likely
          to result in serious harm, we will notify affected individuals and the Office of
          the Australian Information Commissioner (OAIC) in line with the Notifiable Data
          Breaches scheme under Part IIIC of the Privacy Act.
        </p>
      </LegalSection>

      <LegalSection n="XII" title="Accessing & correcting your information">
        <p className="text-[var(--subtext)]">
          You have the right to ask for access to the personal information we hold about
          you, and to ask us to correct it if it is inaccurate, out of date, incomplete,
          irrelevant, or misleading.
        </p>
        <LegalList
          items={[
            "Most information can be accessed and corrected directly from the account screen.",
            "For anything else, email us at the address below. We do not charge a fee for an access or correction request.",
            "We aim to respond within 30 days. We may need to verify your identity first.",
            "We may refuse access or correction in the limited circumstances permitted by APP 12 and APP 13 (for example, where giving access would be unlawful or would unreasonably impact someone else's privacy). If we refuse, we will give you written reasons and tell you how to complain.",
            "If we correct information we have already shared with a third-party processor, we will, on request, take reasonable steps to notify that processor.",
          ]}
        />
      </LegalSection>

      <LegalSection n="XIII" title="Withdrawing consent & your other rights">
        <LegalList
          items={[
            "Withdraw push notification or location permissions at any time from your device settings.",
            "Withdraw consent to our handling of your sensitive information by deleting your account.",
            "Request deletion of your account and associated personal data by emailing us.",
          ]}
        />
      </LegalSection>

      <LegalSection n="XIV" title="Complaints">
        <p className="text-[var(--subtext)]">
          If you think we have breached the APPs or mishandled your personal information,
          contact us first at <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
          Please include enough detail for us to investigate. We will acknowledge your
          complaint promptly and aim to provide a substantive response within 30 days.
        </p>
        <p className="text-[var(--subtext)]">
          If you are not satisfied with our response, you can complain to the Office of the
          Australian Information Commissioner:
        </p>
        <LegalList
          items={[
            <>
              Website: <LegalLink href="https://www.oaic.gov.au/">oaic.gov.au</LegalLink>
            </>,
            "Phone: 1300 363 992.",
            "Post: GPO Box 5288, Sydney NSW 2001.",
          ]}
        />
      </LegalSection>

      <LegalSection n="XV" title="Changes to this policy">
        <p className="text-[var(--subtext)]">
          We may update this policy as the service evolves. We&apos;ll update the
          &ldquo;Last updated&rdquo; date and, for material changes, notify you in-app or by
          email.
        </p>
      </LegalSection>

      <LegalSection n="XVI" title="Contact us">
        <p className="text-[var(--subtext)]">
          For privacy questions, requests, or complaints, email{" "}
          <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
        </p>
      </LegalSection>

      <footer className="pt-10 text-sm text-[var(--subtext)]">
        See also our{" "}
        <Link href="/terms" className="text-[var(--color-gold)] editorial-link">
          Terms &amp; Conditions
        </Link>
        .
      </footer>
    </article>
  );
}

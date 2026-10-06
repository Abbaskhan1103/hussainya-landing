import Link from "next/link";
import { LegalSection, LegalList, LegalLink } from "@/components/legal-section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Hussainya collects, uses, and protects personal information for the Shia Muslim community, in line with the Australian Privacy Principles.",
  path: "/privacy",
});

const LAST_UPDATED = "5 October 2026";
const CONTACT_EMAIL = "support@hussainya.com";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-10 md:mb-16">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Legal</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
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
            <em className="font-lora">Privacy Act 1988 (Cth)</em>. This policy
            describes how we collect, hold, use, disclose, secure, and let you access and
            correct your personal information.
          </div>
        </div>
      </div>

      <LegalSection n="I" title="Sensitive information">
        <p className="text-[var(--subtext)]">
          Information about a person&apos;s religious beliefs or affiliations is{" "}
          <strong className="text-[var(--text)]">
            sensitive information under the Privacy Act
          </strong>
          . By creating a Hussainya account, favouriting Shia Islamic centres, or using ibadah
          tools, you may be disclosing religious affiliation. By using the service you{" "}
          <strong className="text-[var(--text)]">consent</strong> to us collecting and
          handling that information for the purposes set out in this policy. You can withdraw
          that consent by deleting your account.
        </p>
      </LegalSection>

      <LegalSection n="II" title="Information we collect">
        <p className="text-[var(--subtext)]">
          You can browse public information, such as centre listings and prayer times,
          without an account. Where a feature requires one, we collect only what is
          reasonably necessary to run it:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-[var(--text)]">Account information:</strong> your email
              address and an encrypted password when you sign up.
            </>,
            <>
              <strong className="text-[var(--text)]">Profile activity:</strong> favourited
              centres, ibadah tracking entries, and notes you create inside the app.
            </>,
            <>
              <strong className="text-[var(--text)]">Location (optional):</strong> when you
              grant permission, your approximate location is used on-device to calculate
              prayer times and Qibla direction. We do not store precise coordinates on our
              servers.
            </>,
            <>
              <strong className="text-[var(--text)]">Device &amp; usage data:</strong> basic
              logs (IP address, user agent, pages visited, errors) collected as part of
              running the service.
            </>,
            <>
              <strong className="text-[var(--text)]">Cookies &amp; local storage:</strong> we
              use essential cookies and local storage to keep you signed in and remember
              preferences. We do not use third-party advertising trackers.
            </>,
            <>
              <strong className="text-[var(--text)]">AI interactions:</strong> when you use
              AI-assisted features such as What&apos;s On search, your queries are sent to
              third-party AI providers to generate responses.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n="III" title="How we use and share it">
        <p className="text-[var(--subtext)]">
          We use your information to authenticate you, show relevant centres, programs, and
          prayer times, deliver notifications you opt into, generate AI responses, investigate
          abuse, and meet our legal obligations. We do not sell your data or run third-party
          advertising.
        </p>
        <p className="text-[var(--subtext)]">
          We share limited information with the service providers that run our
          infrastructure, notifications, and AI features, including providers based in the
          United States, the European Union and United Kingdom, and other regions. Before
          sharing information overseas, we take reasonable steps to ensure the recipient
          protects it to a standard consistent with the APPs.
        </p>
      </LegalSection>

      <LegalSection n="IV" title="Retention, security & breaches">
        <p className="text-[var(--subtext)]">
          We keep your account data while your account is active, and delete or de-identify
          it when you close your account, except where we must retain records by law.
        </p>
        <p className="text-[var(--subtext)]">
          We take reasonable technical and organisational steps to protect your information,
          including encrypted connections and access controls. No system is perfectly secure.
          If a breach is likely to result in serious harm, we will notify affected
          individuals and the Office of the Australian Information Commissioner (OAIC) in
          line with the Notifiable Data Breaches scheme.
        </p>
      </LegalSection>

      <LegalSection n="V" title="Your rights">
        <LegalList
          items={[
            "Access or correct most of your information directly from the account screen, or by emailing us. We aim to respond within 30 days and don't charge a fee, subject to the limited exceptions in APP 12 and APP 13.",
            "Withdraw consent to our handling of sensitive information, or request deletion of your account and data, by emailing us.",
            <>
              If you&apos;re unhappy with how we&apos;ve handled a complaint, you can contact
              the Office of the Australian Information Commissioner:{" "}
              <LegalLink href="https://www.oaic.gov.au/">oaic.gov.au</LegalLink>, 1300 363 992.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n="VI" title="Children">
        <p className="text-[var(--subtext)]">
          Hussainya is intended for users aged 13 and over. If you are a parent or guardian
          and believe a child has created an account, contact us and we&apos;ll remove it.
        </p>
      </LegalSection>

      <LegalSection n="VII" title="Changes & contact">
        <p className="text-[var(--subtext)]">
          We may update this policy as the service evolves, and will update the &ldquo;Last
          updated&rdquo; date above. For privacy questions, requests, or complaints, email{" "}
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

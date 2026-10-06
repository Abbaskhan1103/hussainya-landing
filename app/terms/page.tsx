import Link from "next/link";
import { LegalSection, LegalList, LegalLink } from "@/components/legal-section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing use of Hussainya, the Shia Islamic community hub.",
  path: "/terms",
});

const LAST_UPDATED = "5 October 2026";
const CONTACT_EMAIL = "support@hussainya.com";

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-10 md:mb-16">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Legal</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            Terms &amp; Conditions
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
            These terms govern your use of Hussainya (&ldquo;Hussainya&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a platform connecting the
            Shia Muslim community to Islamic centres, programs, prayer times, and ibadah tools.
            By creating an account or using the app, you agree to these terms.
          </div>
        </div>
      </div>

      <LegalSection n="I" title="Eligibility & accounts">
        <LegalList
          items={[
            "You must be at least 13 years old to create an account.",
            "Provide accurate information when signing up and keep your password confidential.",
            "You are responsible for activity on your account. Notify us immediately if you suspect unauthorised access.",
            "We may suspend or close accounts that breach these terms or applicable law.",
          ]}
        />
      </LegalSection>

      <LegalSection n="II" title="Acceptable use">
        <p className="text-[var(--subtext)]">When using Hussainya, you agree not to:</p>
        <LegalList
          items={[
            "Post content that is unlawful, defamatory, harassing, hateful, sectarian in a harmful way, or that infringes the rights of others.",
            "Misrepresent yourself as another person, centre, or organisation.",
            "Disrupt, reverse engineer, scrape, or overload the service.",
            "Attempt to access data you are not authorised to view.",
          ]}
        />
      </LegalSection>

      <LegalSection n="III" title="Content & guidance">
        <p className="text-[var(--subtext)]">
          Tools such as the khums and qadha calculators are aids for general use only. They
          are <strong className="text-[var(--text)]">not a substitute</strong> for guidance
          from a qualified marja&apos;, scholar, or imam. Prayer times and qibla directions are
          estimates calculated from your device&apos;s location &mdash; confirm jamaat times
          with your local centre. Program details come from centres and can change, and search
          answers generated with the help of AI may be inaccurate.
        </p>
      </LegalSection>

      <LegalSection n="IV" title="Disclaimers">
        <p className="text-[var(--subtext)]">
          Hussainya is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          basis, without warranties of any kind, to the maximum extent permitted by law.
          Nothing in these terms excludes any consumer guarantee you have under Australian
          Consumer Law that cannot lawfully be excluded.
        </p>
      </LegalSection>

      <LegalSection n="V" title="Liability & indemnity">
        <p className="text-[var(--subtext)]">
          To the extent permitted by law, we are not liable for indirect or consequential
          losses. Where liability cannot be excluded, our total liability is limited to the
          amount you paid us in the 12 months before the claim, or AUD 100, whichever is
          greater. You agree to indemnify us against claims and reasonable legal costs arising
          from your breach of these terms or misuse of the service.
        </p>
      </LegalSection>

      <LegalSection n="VI" title="Termination">
        <p className="text-[var(--subtext)]">
          You can stop using Hussainya and delete your account at any time. We may suspend or
          terminate your access if you breach these terms or if required to do so by law.
        </p>
      </LegalSection>

      <LegalSection n="VII" title="Governing law">
        <p className="text-[var(--subtext)]">
          These terms are governed by the laws of Victoria, Australia. You and Hussainya
          submit to the non-exclusive jurisdiction of the courts of Victoria.
        </p>
      </LegalSection>

      <LegalSection n="VIII" title="Changes & contact">
        <p className="text-[var(--subtext)]">
          We may update these terms as the service evolves; continued use after a change
          means you accept it. Questions? Email{" "}
          <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
        </p>
      </LegalSection>

      <footer className="pt-10 text-sm text-[var(--subtext)]">
        See also our{" "}
        <Link href="/privacy" className="text-[var(--color-gold)] editorial-link">
          Privacy Policy
        </Link>
        .
      </footer>
    </article>
  );
}

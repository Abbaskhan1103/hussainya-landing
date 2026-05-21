import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalList, LegalLink } from "@/components/legal-section";

export const metadata: Metadata = {
  title: "Terms & Conditions, Hussainya",
  description:
    "The terms governing use of Hussainya, the Shia Islamic community hub.",
};

const LAST_UPDATED = "22 May 2026";
const CONTACT_EMAIL = "support@hussainya.com";

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Legal</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-[var(--font-lora)] text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
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
            "Use Hussainya to send spam or solicit users for unrelated commercial purposes.",
            "Attempt to access data you are not authorised to view.",
          ]}
        />
      </LegalSection>

      <LegalSection n="III" title="Religious content & guidance">
        <p className="text-[var(--subtext)]">
          Hussainya surfaces Islamic content from public sources, including jurisprudence,
          duas, and aamal references. Some answers are generated with the help of AI models.
          Content is provided for general informational and educational purposes only and is{" "}
          <strong className="text-[var(--text)]">not a substitute</strong> for guidance from
          a qualified marja&apos;, scholar, or imam. Always verify rulings with a
          knowledgeable authority before acting on them.
        </p>
      </LegalSection>

      <LegalSection n="IV" title="Centre managers">
        <p className="text-[var(--subtext)]">
          If you have been granted a centre manager role, you agree that:
        </p>
        <LegalList
          items={[
            "You are authorised by the relevant centre to publish information on its behalf.",
            "Information you publish (programs, contact details, announcements) is accurate, lawful, and respectful.",
            "You will keep your centre's information up to date and remove or correct content promptly when needed.",
            "We may remove content or revoke access if a centre's listing is misused or disputed.",
          ]}
        />
      </LegalSection>

      <LegalSection n="V" title="Subscriptions & payments">
        <LegalList
          items={[
            "Some centre management features require a paid subscription, processed by Stripe.",
            "Fees, billing cycles, and any free trials are shown at checkout.",
            "Subscriptions auto-renew until cancelled. You can cancel at any time before the next renewal. Access continues to the end of the paid period.",
            "Except where required by Australian Consumer Law, fees are non-refundable.",
            "We may change pricing with reasonable notice before your next renewal.",
          ]}
        />
      </LegalSection>

      <LegalSection n="VI" title="Programs, RSVPs & bookings">
        <p className="text-[var(--subtext)]">
          Hussainya may show program listings and accept RSVPs or bookings on behalf of
          centres. The hosting centre is responsible for the program itself, including its
          scheduling, conduct, capacity, safety, and any associated fees or refunds. We are
          not a party to the arrangement between you and the centre.
        </p>
      </LegalSection>

      <LegalSection n="VII" title="Notifications & prayer times">
        <p className="text-[var(--subtext)]">
          Prayer times are calculated using established methods and your device&apos;s
          location. They are estimates. Confirm with your local centre for jamaat. Push
          notifications require your permission and may be disabled at any time from your
          device settings.
        </p>
      </LegalSection>

      <LegalSection n="VIII" title="User content">
        <p className="text-[var(--subtext)]">
          You retain ownership of content you submit (centre listings, announcements, notes,
          and similar material). By submitting content, you grant Hussainya a non-exclusive,
          worldwide, royalty-free licence to host, display, and distribute it within the app
          for the purpose of operating the service. You are responsible for ensuring you
          have the right to share what you post.
        </p>
      </LegalSection>

      <LegalSection n="IX" title="Intellectual property">
        <p className="text-[var(--subtext)]">
          The Hussainya name, logo, software, and design are owned by us or our licensors.
          You may use the app for its intended personal or centre-management purposes. You
          may not copy, modify, or redistribute our materials without permission.
        </p>
      </LegalSection>

      <LegalSection n="X" title="Third-party services">
        <p className="text-[var(--subtext)]">
          Hussainya relies on third-party providers for hosting, payments, notifications,
          and AI features (including Supabase, DigitalOcean, Cloudflare, Stripe, OneSignal,
          Anthropic, Google, and OpenAI). Their terms apply to the parts of the service they
          provide, and outages on their side may affect Hussainya.
        </p>
      </LegalSection>

      <LegalSection n="XI" title="Disclaimers">
        <p className="text-[var(--subtext)]">
          Hussainya is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          basis. To the maximum extent permitted by law, we make no warranties about
          uninterrupted availability, accuracy of third-party content, or fitness for a
          particular purpose. Nothing in these terms excludes any consumer guarantees you
          have under Australian Consumer Law that cannot lawfully be excluded.
        </p>
      </LegalSection>

      <LegalSection n="XII" title="Limitation of liability">
        <p className="text-[var(--subtext)]">
          To the extent permitted by law, Hussainya and its operators are not liable for
          indirect, incidental, or consequential losses, or for losses arising from content
          posted by centres or other users. Where liability cannot be excluded, our total
          liability is limited to the amount you paid us in the 12 months before the claim,
          or AUD 100, whichever is greater.
        </p>
      </LegalSection>

      <LegalSection n="XIII" title="Indemnity">
        <p className="text-[var(--subtext)]">
          You agree to indemnify Hussainya against claims, losses, and reasonable legal
          costs arising from your breach of these terms, your misuse of the service, or
          content you publish.
        </p>
      </LegalSection>

      <LegalSection n="XIV" title="Termination">
        <p className="text-[var(--subtext)]">
          You can stop using Hussainya at any time and delete your account. We may suspend
          or terminate access if you breach these terms or if required to do so by law.
          Sections that by their nature should survive termination (intellectual property,
          disclaimers, limitation of liability, and similar) will continue to apply.
        </p>
      </LegalSection>

      <LegalSection n="XV" title="Changes to these terms">
        <p className="text-[var(--subtext)]">
          We may update these terms as the service evolves. Material changes will be
          notified in-app or by email before they take effect. Continued use after changes
          means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection n="XVI" title="Governing law">
        <p className="text-[var(--subtext)]">
          These terms are governed by the laws of Victoria, Australia. You and Hussainya
          submit to the non-exclusive jurisdiction of the courts of Victoria.
        </p>
      </LegalSection>

      <LegalSection n="XVII" title="Contact us">
        <p className="text-[var(--subtext)]">
          For questions about these terms, email{" "}
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

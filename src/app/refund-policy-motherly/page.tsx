import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RefundPolicyMotherlyPage() {
  return (
    <>
      <Navbar />
      <main
        className="legal-page-shell pt-24 pb-16 md:pt-32 md:pb-20"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="legal-card p-5 sm:p-7 md:p-10">
            <span className="legal-hero-chip mb-4">Policy Update</span>
            <h1
              className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              MOTHERLYCARE ETHOS PRIVATE LIMITED - Motherly App Refund and Cancellation Policy
            </h1>
            <p className="mb-6 text-base md:text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
              Clear and transparent guidelines for appointment cancellations and refunds on the Motherly platform.
            </p>

            <div className="policy-content space-y-6" style={{ fontSize: "clamp(0.94rem, 1.25vw, 1.02rem)" }}>
              <p>
                At Motherly, we prioritize transparency, convenience, and flexibility for both expectant
                parents and service providers. This Refund and Cancellation Policy explains how
                cancellations, rescheduling, and refunds work across services booked on the platform.
              </p>
              <p>
                Each service provider can define their own cancellation rules. Please review provider
                terms before booking to avoid refund disputes.
              </p>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">1. General Overview</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    This policy applies to services booked via Motherly, including doula services, birth
                    support, lactation consulting, and maternal care appointments.
                  </li>
                  <li>
                    Service providers define cancellation windows and refund rules for their own services.
                  </li>
                  <li>Parents should review provider-specific cancellation terms before confirming.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">2. Provider Cancellation and Refund Rules</h2>

                <h3 className="text-xl font-bold">2.1 Service Provider&apos;s Cancellation Policy</h3>
                <p>
                  Cancellation timelines can vary by provider. Some may allow cancellation 24 hours before
                  appointment time, while others may not permit cancellation.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>If cancellation is allowed, refund or credit follows provider terms.</li>
                  <li>If cancellation is not allowed, refund and rescheduling are not available.</li>
                </ul>

                <h3 className="text-xl font-bold">2.2 Before Booking a Service</h3>
                <p>
                  Provider cancellation terms are shown during booking. Failing to follow those terms may
                  lead to no refund and no rescheduling.
                </p>

                <h3 className="text-xl font-bold">2.3 General Guidelines (Where Cancellations Are Allowed)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>More than 24 hours before appointment:</strong> typically eligible for full
                    refund or free rescheduling.
                  </li>
                  <li>
                    <strong>Less than 24 hours before appointment:</strong> partial refund or cancellation
                    fee may apply.
                  </li>
                  <li>
                    <strong>No-show:</strong> no refund if parent does not attend and did not cancel in
                    time.
                  </li>
                </ul>

                <h3 className="text-xl font-bold">2.4 Refund Requests</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds are processed only through the Motherly app.</li>
                  <li>No cash or off-platform payment settlement is required.</li>
                  <li>Approved refunds are returned to the original payment method.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">3. Refund Process</h2>
                <h3 className="text-xl font-bold">3.1 How to Request a Refund</h3>
                <p>
                  Refunds can be requested in-app or via Customer Support within 7 days of scheduled
                  service.
                </p>
                <p>Please provide:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Booking ID</li>
                  <li>Appointment date and time</li>
                  <li>Reason for cancellation</li>
                  <li>Supporting documents (if required)</li>
                </ul>

                <h3 className="text-xl font-bold">3.2 Approval and Processing Timeline</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Approval follows the provider&apos;s cancellation policy.</li>
                  <li>Once approved, refunds are processed within 7-10 business days.</li>
                  <li>Amount is credited to the original payment method.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">4. Cancellation by Parents</h2>
                <h3 className="text-xl font-bold">4.1 Cancellation Timeline</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parents must cancel based on provider-defined timelines.</li>
                  <li>Early cancellation may qualify for full refund.</li>
                  <li>Late cancellation may incur partial refund or fee.</li>
                  <li>If provider disallows cancellation, no refund is available.</li>
                </ul>

                <h3 className="text-xl font-bold">4.2 Rescheduling</h3>
                <p>
                  If provider terms allow, appointments can be rescheduled within permitted windows.
                  Outside that window, rescheduling may be treated as cancellation.
                </p>

                <h3 className="text-xl font-bold">4.3 Repeated Cancellations</h3>
                <p>
                  Frequent cancellation or rescheduling may result in penalties, including booking
                  restrictions.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">5. Cancellation by Service Providers</h2>
                <h3 className="text-xl font-bold">5.1 Provider-Initiated Cancellations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parent receives full refund or rescheduling option.</li>
                  <li>Motherly may arrange a replacement provider where possible.</li>
                </ul>

                <h3 className="text-xl font-bold">5.2 Provider Accountability</h3>
                <p>
                  Providers must communicate changes early. Repeated provider-side cancellations may lead
                  to penalties or platform removal.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">6. Special Considerations</h2>
                <h3 className="text-xl font-bold">6.1 Emergency Cancellations</h3>
                <p>
                  For genuine emergencies, Motherly may waive cancellation fees regardless of provider
                  policy after review by support.
                </p>

                <h3 className="text-xl font-bold">6.2 Force Majeure and Pandemic Conditions</h3>
                <p>
                  During force majeure events or regulatory disruption, Motherly may issue refunds, credits,
                  or rescheduling without penalties.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">7. Payment Terms for Service Providers</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All payments must be processed through the Motherly app.</li>
                  <li>No direct cash or external-mode payment is permitted.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">8. No-Show Policy</h2>
                <h3 className="text-xl font-bold">8.1 Parent No-Show</h3>
                <p>
                  If a parent misses the appointment without timely cancellation, no refund is issued and
                  full service charges apply.
                </p>

                <h3 className="text-xl font-bold">8.2 Service Provider No-Show</h3>
                <p>
                  If a provider misses the appointment without notice, parent receives a full refund and
                  Motherly takes corrective action.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">9. Contact Us</h2>
                <div className="rounded-2xl p-4 md:p-6" style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                  <p>
                    Email:{" "}
                    <a href="mailto:support@motherly.com" className="underline" style={{ color: "var(--color-primary)" }}>
                      support@motherly.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href="tel:+919944890577" className="underline" style={{ color: "var(--color-primary)" }}>
                      +91 99448 90577
                    </a>
                  </p>
                  <p>Live Chat: Available on the Motherly app</p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">10. Policy Modifications</h2>
                <p>
                  Motherly reserves the right to update this policy at any time. Users will be notified by
                  email or in-app updates.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">Key Takeaways</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers define their own cancellation policies.</li>
                  <li>Cancellations and refunds are processed through the Motherly app.</li>
                  <li>No cash transactions are allowed between parents and service providers.</li>
                  <li>Review provider policy before booking to avoid confusion.</li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

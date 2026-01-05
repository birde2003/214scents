import StorefrontLayout from '@/components/storefront/StorefrontLayout'

export default function TermsPage() {
  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
            Terms &amp; Conditions
          </h1>

          <div className="bg-background-secondary rounded-xl p-8 border border-primary/20">
            <p className="text-gray-400 mb-8">
              <strong>Effective Date:</strong> January 1, 2024
            </p>

            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the 214 Scents website (&quot;Site&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Site. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">2. Use of Our Site</h2>
                <p className="mb-4">You agree to use our Site only for lawful purposes. You must not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Site in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of the Site</li>
                  <li>Transmit any viruses, malware, or other harmful code</li>
                  <li>Use automated systems to access the Site without our permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">3. Account Registration</h2>
                <p>
                  To access certain features of our Site, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">4. Product Information and Pricing</h2>
                <p>
                  We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content on the Site is accurate, complete, reliable, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
                </p>
                <p className="mt-4">
                  All prices are in USD unless otherwise stated and are subject to change without notice. We reserve the right to limit quantities and to refuse or cancel orders at our discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">5. Orders and Payment</h2>
                <p>
                  By placing an order, you make an offer to purchase products subject to these Terms. We reserve the right to accept or decline your order for any reason. Payment must be received before we dispatch your order. We accept various payment methods as indicated on the Site.
                </p>
                <p className="mt-4">
                  You represent and warrant that you have the legal right to use any payment method(s) you provide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">6. Shipping and Delivery</h2>
                <p>
                  We will make reasonable efforts to deliver products within the estimated timeframes. However, delivery times are estimates only and we are not liable for delays. Risk of loss and title for products pass to you upon delivery to the carrier.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">7. Returns and Refunds</h2>
                <p>
                  Due to the nature of our products (perfumes and fragrances), we have specific return and refund policies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Unopened products may be returned within 30 days of delivery for a full refund</li>
                  <li>Opened products cannot be returned for hygiene and safety reasons</li>
                  <li>Damaged or defective products will be replaced or refunded upon verification</li>
                  <li>Return shipping costs are the responsibility of the customer unless the product is defective</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">8. Intellectual Property</h2>
                <p>
                  All content on the Site, including text, graphics, logos, images, and software, is the property of 214 Scents or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">9. User Content and Reviews</h2>
                <p>
                  You may submit reviews, comments, and other content on our Site. By submitting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content. You represent that you own or have rights to any content you submit and that it does not violate any third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">10. Disclaimer of Warranties</h2>
                <p>
                  THE SITE AND PRODUCTS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">11. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, 214 SCENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">12. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless 214 Scents and its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising out of your use of the Site, violation of these Terms, or infringement of any third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">13. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles. Any disputes arising from these Terms or your use of the Site shall be resolved in the courts located in New York, NY.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">14. Severability</h2>
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">15. Contact Information</h2>
                <p>
                  If you have questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 ml-4">
                  <p>214 Scents</p>
                  <p>Email: legal@214scents.com</p>
                  <p>Address: 214 Perfume Lane, New York, NY 10001</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}

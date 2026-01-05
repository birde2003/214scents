import StorefrontLayout from '@/components/storefront/StorefrontLayout'

export default function PrivacyPage() {
  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <div className="bg-background-secondary rounded-xl p-8 border border-primary/20">
            <p className="text-gray-400 mb-8">
              <strong>Effective Date:</strong> January 1, 2024
            </p>

            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">1. Introduction</h2>
                <p>
                  Welcome to 214 Scents (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from our store.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">2. Information We Collect</h2>
                <p className="mb-4">We collect several types of information from and about users of our website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Information:</strong> Name, email address, postal address, phone number, and payment information when you create an account or make a purchase.</li>
                  <li><strong>Transaction Information:</strong> Details about purchases you make through our website, including product details and order history.</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, device information, and browsing behavior through cookies and similar technologies.</li>
                  <li><strong>Communication Data:</strong> Correspondence if you contact us, including customer service inquiries and reviews.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">3. How We Use Your Information</h2>
                <p className="mb-4">We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To process and fulfill your orders and manage your account</li>
                  <li>To communicate with you about your orders, account, and customer service</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To improve our website, products, and services</li>
                  <li>To detect, prevent, and address technical issues and fraudulent activity</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">4. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">5. Data Sharing and Disclosure</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (e.g., payment processors, shipping companies, email service providers)</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">7. Your Rights</h2>
                <p className="mb-4">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@214scents.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">8. Children&apos;s Privacy</h2>
                <p>
                  Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we have collected information from your child, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">9. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our website, you consent to such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">10. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Effective Date&quot; at the top. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary">11. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-4 ml-4">
                  <p>214 Scents</p>
                  <p>Email: privacy@214scents.com</p>
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

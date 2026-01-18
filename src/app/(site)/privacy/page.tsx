import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | AFSE Calculator',
    description: 'Privacy Policy for AFSE Calculator. Learn how we collect, use, and protect your data.',
    robots: {
        index: false,
        follow: true
    }
}

export default function PrivacyPage() {
    return (
        <div className="px-4 py-12">
            <div className="max-w-3xl mx-auto prose prose-invert prose-zinc">
                <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

                <p className="text-zinc-400 text-sm mb-8">Last updated: January 14, 2026</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
                    <p className="text-zinc-400">
                        Welcome to AFSE Calculator ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information.
                        This Privacy Policy covers our data collection practices and describes your rights accessing our website.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">2. Data We Collect</h2>
                    <p className="text-zinc-400 mb-4">
                        We collect minimal data to provide and improve our services:
                    </p>
                    <ul className="list-disc pl-5 text-zinc-400 space-y-2">
                        <li><strong>Usage Data:</strong> We may use Google Analytics to collect information about how you access and use the Service (e.g., pages visited, time spent).</li>
                        <li><strong>Cookies:</strong> We use cookies to store your preferences (such as calculator inputs) locally on your device.</li>
                        <li><strong>Calibration Data:</strong> If you voluntarily submit training data, we store the stats provided to improve our calculator's accuracy. This data is anonymous.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">3. Third-Party Services</h2>
                    <p className="text-zinc-400 mb-4">
                        We may use third-party Service Providers to monitor and analyze the use of our Service:
                    </p>
                    <ul className="list-disc pl-5 text-zinc-400 space-y-2">
                        <li><strong>Google Analytics:</strong> A web analytics service offered by Google that tracks and reports website traffic.</li>
                        <li><strong>Google AdSense:</strong> We may use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">4. Cookie Policy</h2>
                    <p className="text-zinc-400">
                        Cookies are small files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        However, if you do not accept cookies, you may not be able to use some portions of our Service (e.g., saving your calculator progress).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">5. Contact Us</h2>
                    <p className="text-zinc-400">
                        If you have any questions about this Privacy Policy, please contact us via our community channels.
                    </p>
                </section>
            </div>
        </div>
    )
}

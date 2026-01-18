import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | RobloxCal',
    description: 'Get in touch with the RobloxCal team. We are here to help with questions about our Roblox game tools and guides.',
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

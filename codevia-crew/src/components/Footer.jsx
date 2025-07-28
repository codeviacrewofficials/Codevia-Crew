'use client';
import Link from 'next/link';

function ListSection({ title, items, minWidth = 'min-w-[250px]' }) {
    return (
        <div className={`${minWidth} mb-8`}>
            <div className="text-[#F9FAFB] text-x font-poppins uppercase leading-5 tracking-wider mb-4">{title}</div>
            {items && items.length > 0 && (
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-[#9CA3AF] text-base font-poppins leading-6">
                            {item.href ? (
                                <Link href={item.href} className="hover:text-white transition-all duration-300 underline-offset-4 hover:underline"
                                >{item.label}</Link>
                            ) : (
                                item.label
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#1A202C] border-t border-[#374151] relative">
            <div className="max-w-7xl mx-auto px-2 py-8 flex flex-wrap gap-8 justify-between">
                {/* Brand and Tagline */}
                <div className="min-w-[250px] mb-8">
                    <div className="text-[#F9FAFB] text-4xl font-bold font-poppins leading-7">Codevia Crew</div>
                    <div className="text-[#9CA3AF] text-sm font-poppins leading-5 mt-3">Innovative solutions for a digital world.</div>
                </div>
                {/* Navigation */}
                <ListSection
                    title="Navigation"
                    items={[
                        { label: "About Us", href: "/about" },
                        { label: "Services", href: "/services" },
                        { label: "Portfolio", href: "/portfolio" },
                        { label: "Blog", href: "/blog" },
                    ]}
                />
                {/* Contact */}
                <ListSection
                    title="Contact"
                    items={[
                        { label: "Contact Us", href: "/contact" },
                        { label: "Get a Quote", href: "/quote" },
                        { label: "FAQ", href: "/faq" },
                    ]}
                />
                {/* Follow Us */}
                <ListSection title="Follow Us" items={[]} minWidth="min-w-[150px]" />
            </div>
            <div className="border-t border-[#374151] w-full">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center">
                    <span className="text-[#9CA3AF] text-sm font-poppins leading-5">© Codevia Crew . All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}

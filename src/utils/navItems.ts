// src/utils/navItems.ts
type NavItem = {
    title: string;
    href: string;
};

type NavItems = {
    "en": NavItem[];
    "tr": NavItem[];
};

const NAV_ITEMS: NavItems = {
    "en": [
        { title: "Home", href: "/" },
        { title: "Blog", href: "/blog" },
        { title: "About Us", href: "/about" },
        { title: "Services", href: "/services" },
        { title: "Contact", href: "/contact" }
    ],
    "tr": [
        { title: "Anasayfa", href: "/" },
        { title: "Blog", href: "/blog" },
        { title: "Hakkımızda", href: "/about" },
        { title: "Hizmetler", href: "/services" },
        { title: "İletişim", href: "/contact" }
    ]
};

export { NAV_ITEMS, type NavItem, type NavItems };
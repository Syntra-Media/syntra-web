// src/utils/navItems.ts
type NavItem = {
    title: string;
    href: string;
    id: string;
};

type NavItems = {
    "en": NavItem[];
    "tr": NavItem[];
};

const NAV_ITEMS: NavItems = {
    "en": [
        { title: "Home", href: "", id: "home" },
        { title: "Blog", href: "/blog", id: "" },
        { title: "About Us", href: "", id: "about" },
        { title: "Services", href: "", id: "services" },
        { title: "Contact", href: "", id: "contact" }
    ],
    "tr": [
        { title: "Anasayfa", href: "", id: "home" },
        { title: "Blog", href: "/blog", id: "" },
        { title: "Hakkımızda", href: "", id: "about" },
        { title: "Hizmetler", href: "", id: "services" },
        { title: "İletişim", href: "", id: "contact" }
    ]
};

export { NAV_ITEMS, type NavItem, type NavItems };
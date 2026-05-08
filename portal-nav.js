(() => {
    const navs = Array.from(document.querySelectorAll(".portal-nav"));
    if (!navs.length) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navs.forEach((nav) => {
        const items = Array.from(nav.querySelectorAll("li"));
        const soonLinks = Array.from(nav.querySelectorAll('a[data-coming-soon="true"]'));

        soonLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
            });
        });

        items.forEach((item) => {
            const trigger = item.querySelector(":scope > a");
            const submenu = item.querySelector(":scope > .portal-submenu");
            if (!trigger || !submenu) return;

            let closeTimer = null;

            const openItem = () => {
                if (closeTimer) window.clearTimeout(closeTimer);
                items.forEach((other) => {
                    if (other !== item) other.classList.remove("open");
                });
                item.classList.add("open");
            };

            const scheduleClose = () => {
                closeTimer = window.setTimeout(() => item.classList.remove("open"), 180);
            };

            item.addEventListener("mouseenter", openItem);
            item.addEventListener("mouseleave", scheduleClose);
            trigger.addEventListener("focus", openItem);

            trigger.addEventListener("click", (event) => {
                if (window.innerWidth <= 1024) {
                    event.preventDefault();
                    item.classList.toggle("open");
                }
            });
        });

        document.addEventListener("click", (event) => {
            if (!nav.contains(event.target)) {
                items.forEach((item) => item.classList.remove("open"));
            }
        });

        const topLevelLinks = Array.from(nav.querySelectorAll(":scope > ul > li > a[href]"));
        topLevelLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;
            const [file] = href.split("#");
            if (file === currentPage) {
                link.classList.add("nav-current");
            }
        });
    });
})();

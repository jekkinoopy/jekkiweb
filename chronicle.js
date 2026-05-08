(() => {
    const reader = document.getElementById("chronicle-reader");
    if (!reader) return;

    const chapters = Array.from(reader.querySelectorAll(".chronicle-chapter"));
    const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));
    const pager = document.getElementById("chronicle-pager");
    const prevBtn = document.getElementById("prev-chapter");
    const nextBtn = document.getElementById("next-chapter");
    const indicator = document.getElementById("chapter-indicator");
    let currentIndex = 0;

    function updatePagedView() {
        chapters.forEach((chapter, index) => {
            chapter.style.display = index === currentIndex ? "" : "none";
            chapter.classList.toggle("active", index === currentIndex);
        });
        indicator.textContent = `${currentIndex + 1} / ${chapters.length}`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === chapters.length - 1;
    }

    function setMode(mode) {
        reader.dataset.mode = mode;
        modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === mode));
        if (mode === "paged") {
            pager.hidden = false;
            updatePagedView();
        } else {
            pager.hidden = true;
            chapters.forEach((chapter) => {
                chapter.style.display = "";
                chapter.classList.remove("active");
            });
        }
    }

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => setMode(button.dataset.mode));
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updatePagedView();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < chapters.length - 1) {
            currentIndex += 1;
            updatePagedView();
        }
    });

    setMode("scroll");
})();

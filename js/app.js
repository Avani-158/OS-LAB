const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLightMode =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "theme",
            isLightMode ? "light" : "dark"
        );

    });

}
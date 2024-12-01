if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker Registered"));
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the default mini-infobar prompt
    e.preventDefault();
    // Save the event for later use
    deferredPrompt = e;

    // Show your custom install button
    const installButton = document.getElementById("install-button");
    installButton.style.display = "block";

    // Add a click event listener to the install button
    installButton.addEventListener("click", () => {
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user's choice
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            // Reset the deferredPrompt variable
            deferredPrompt = null;
        });
    });
});

if (!window.beforeinstallprompt) {
    const installInstructions = document.getElementById("install-instructions");
    installInstructions.style.display = "block";
}


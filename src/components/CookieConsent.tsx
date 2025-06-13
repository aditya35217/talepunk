import { type Component, createSignal, onMount, Show } from "solid-js";

const CookieConsent: Component = () => {
  const [isShow, setIsShow] = createSignal<boolean>(false);

  const handleAccept = () => {
    setIsShow(false);
    document.cookie = `cookieConsent=granted; max-age=31536000; path=/`;
    document.dispatchEvent(new Event("updateConsent"));
  };

  const handleDecline = () => {
    setIsShow(false);
    document.cookie = "cookieConsent=denied; path=/";
  };

  const handleClose = () => {
    setIsShow(false);
    document.cookie = "banner=no; max-age=86400; path=/";
  };

  const getCookieValue = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  };

  const consentRequire = async (): Promise<boolean> => {
    const isRegulatedRegion = (country: string, region: string) => {
      const regulatedRegions = [
        // EU countries
        "AT",
        "BE",
        "BG",
        "HR",
        "CY",
        "CZ",
        "DK",
        "EE",
        "FI",
        "FR",
        "DE",
        "GR",
        "HU",
        "IE",
        "IT",
        "LV",
        "LT",
        "LU",
        "MT",
        "NL",
        "PL",
        "PT",
        "RO",
        "SK",
        "SI",
        "ES",
        "SE",
        // UK
        "GB",
        // EEA countries not in EU
        "IS",
        "LI",
        "NO",
        //other countries
        "BR",
        "CH", //Switzerland
        "CA",
      ];

      const needConsent =
        region === "California" || regulatedRegions.includes(country)
          ? "yes"
          : "no";

      document.cookie = `needConsent=${needConsent}; max-age=432000; path=/`;
      document.cookie = `needConsent_1y=${needConsent}; max-age=31536000; path=/`;
      return needConsent === "yes";
    };

    if (navigator.onLine) {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return isRegulatedRegion(data.country_code, data.region);
      } catch {
        try {
          const response = await fetch("https://ipinfo.io/json/");
          const data = await response.json();
          return isRegulatedRegion(data.country, data.region);
        } catch {
          const needConsent_1y = getCookieValue("needConsent_1y");
          return needConsent_1y !== "no"; //send true for null
        }
      }
    } else {
      const needConsent_1y = getCookieValue("needConsent_1y");
      return needConsent_1y === "yes"; //send false for null
    }
  };

  onMount(async () => {
    const cookieConsent = getCookieValue("cookieConsent");
    const needConsent = getCookieValue("needConsent");

    if (
      cookieConsent !== "granted" &&
      cookieConsent !== "denied" &&
      needConsent !== "no" &&
      getCookieValue("banner") !== "no"
    ) {
      const consentRequired = needConsent === "yes" || (await consentRequire());

      if (!consentRequired) {
        document.dispatchEvent(new Event("updateConsent"));
      } else {
        setIsShow(true);
      }
    }
  });

  return (
    <Show when={isShow()} fallback={null}>
      <div class="fixed bottom-0 left-0 sm:left-auto right-0 z-50 bg-comp2 text-content p-2 m-1 border border-br rounded flex flex-col sm:flex-row items-center gap-y-4 sm:gap-y-0">
        <p class="sm:mr-4">
          We use cookies for site functions and to enhance your experience.{" "}
          <a
            href="/privacy-policy/"
            class="inline underline ml-1 hover:text-accent"
          >
            Privacy Policy
          </a>
        </p>
        <div class="flex items-center">
          <button
            onClick={handleAccept}
            class="bg-accent hover:bg-accent2 transition text-white py-0.5 px-3 rounded mr-2"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            class="text-content2 py-0.5 px-3 rounded"
          >
            Decline
          </button>
          <button
            aria-label="Close"
            onClick={handleClose}
            class="ml-4 text-heading absolute bottom-1 right-1 sm:static rounded-full hover:bg-hv p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </Show>
  );
};

export default CookieConsent;

// سكريبت خفيف لكل الصفحات: قائمة الموبايل، الأنيميشن، الحاسبة، ونموذج التواصل
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav-links]");

  // فتح وإغلاق قائمة التنقل في شاشات الجوال
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }

  // أنيميشن ظهور بسيط وخفيف عند التمرير
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // حاسبة المشروع الذكية
  const calculator = document.querySelector("[data-calculator]");
  if (calculator) {
    calculator.addEventListener("submit", (event) => {
      event.preventDefault();

      const area = Number(document.querySelector("#area")?.value || 0);
      const floors = Number(document.querySelector("#floors")?.value || 1);
      const finishLevel = Number(document.querySelector("#finishLevel")?.value || 0);
      const smartLevel = Number(document.querySelector("#smartLevel")?.value || 0);

      if (area < 80 || floors < 1) {
        window.alert("Please enter a valid area and number of floors.");
        return;
      }

      const builtArea = area * floors;
      const baseCost = builtArea * 420;
      const finishCost = builtArea * finishLevel;
      const smartCost = builtArea * smartLevel;
      const total = Math.round(baseCost + finishCost + smartCost);
      const months = Math.max(4, Math.ceil(builtArea / 135));
      const rooms = Math.max(3, Math.round(builtArea / 55));
      const saving = Math.min(34, Math.max(8, Math.round(14 + smartLevel / 55)));

      const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      });

      document.querySelector("#resultCost").textContent = format.format(total);
      document.querySelector("#resultTime").textContent = `${months} months`;
      document.querySelector("#resultRooms").textContent = `${rooms} rooms`;
      document.querySelector("#resultSaving").textContent = `${saving}%`;
      document.querySelector("#calculatorResult").removeAttribute("hidden");
    });
  }

  // نموذج التواصل: رسالة تأكيد بدون إعادة تحميل الصفحة
  const contactForm = document.querySelector("[data-contact-form]");
  const contactMessage = document.querySelector("[data-contact-message]");
  if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactMessage.textContent = "Thank you. Your request is ready for review.";
      contactForm.reset();
    });
  }
});

"use client";

export default function ILoveSection() {
  return (
    <section
      id="love"
      className="bg-[#171717] px-8 py-20 text-[#ebd8c9] md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <p
          className="text-center"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          &quot;I LOVE CREATING COOL SH*T&quot;
        </p>
      </div>
    </section>
  );
}

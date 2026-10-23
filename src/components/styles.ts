export const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink";

export const focusOnDark =
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-lime";

export const buttonBase = `pop inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-[3px] border-ink px-6 py-3 text-center font-display text-base uppercase leading-none tracking-wide shadow-[0_5px_0_0_var(--mt-ink)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_7px_0_0_var(--mt-ink)] active:translate-y-1 active:shadow-[0_1px_0_0_var(--mt-ink)] ${focusRing}`;

export const buttonChili = `${buttonBase} bg-chili text-cream`;

export const buttonLime = `${buttonBase} bg-lime text-ink`;

export const buttonYellow = `${buttonBase} bg-yellow text-ink`;

export const buttonPaper = `${buttonBase} bg-paper text-ink`;

export const buttonPink = `${buttonBase} bg-pink text-ink`;

export const buttonTurquoise = `${buttonBase} bg-turquoise text-ink`;

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const card =
  "rounded-[1.75rem] border-[3px] border-ink bg-paper shadow-[8px_8px_0_0_var(--mt-ink)]";

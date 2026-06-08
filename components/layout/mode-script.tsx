/**
 * Flash-free light/dark bootstrap. Runs before paint, in <head>, setting
 * <html data-mode="…"> from localStorage (falling back to OS preference).
 * next-themes can only own one attribute (data-theme/palette), so the second
 * axis is this ~6-line hand-rolled script. Pairs with <ModeToggle/>.
 */
export function ModeScript() {
  const code = `(function(){try{var m=localStorage.getItem('pb-mode')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-mode',m);}catch(e){document.documentElement.setAttribute('data-mode','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

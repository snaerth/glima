(function(document) {
  /**
   * Test webP images support.
   * @param {Function} callback - Callback function.
   */
  function testWepP(callback) {
    const webP = new Image();
    webP.src =
      "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wA" +
      "iMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
    webP.onload = webP.onerror = () => {
      callback(webP.height === 2);
    };
  }

  /**
   * Add 'webp' class to body if supported.
   * @param {Boolean} support - WebP format support.
   */
  function addWebPClass(support) {
    if (support) {
      const el = document.body;

      if (el.classList) {
        el.classList.add("webp");
      } else {
        el.className += " webp";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", testWepP(addWebPClass));
})(document);

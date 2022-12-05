const styleChooser = document.getElementById('style-chooser');
styleChooser.addEventListener('change', (event) => {
  window.parent.postMessage({ type: 'style', style: event.target.value }, '*');
});

async function getStyles(stylesUrl) {
  try {
    const response = await fetch(stylesUrl);
    return response.json();
  } catch (error) {
    return Promise.resolve([{ name: error.message }]);
  }
}

async function populateStyleChooser(styles) {
  styles.forEach((style) => {
    const option = document.createElement('option');
    option.value = style.style;
    option.textContent = style.name;
    styleChooser.appendChild(option);
  });
}

(async () => {
  const query = new URLSearchParams(window.location.search);
  populateStyleChooser(await getStyles(query.get('styles')));
})();

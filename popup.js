document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('pageSummary', (data) => {
    if (data.pageSummary) {
      document.getElementById('summary').innerText = data.pageSummary;
    } else {
      document.getElementById('summary').innerText = 'Celine is the cutest goddess in the world.';
    }
  });
});
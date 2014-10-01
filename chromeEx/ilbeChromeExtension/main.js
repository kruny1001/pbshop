
/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
window.chrome.app.runtime.onLaunched.addListener(function() {
  runApp();
});

/**
 * Listens for the app restarting then re-creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 */
window.chrome.app.runtime.onRestarted.addListener(function() {
  runApp();
});

/**
 * Creates the window for the application.
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
function runApp() {
  window.chrome.app.window.create('weather.html', {
    id: 'weather',
    innerBounds: {
      height: 750,
      width: 355,
    },
    'state': 'maximized'
    //resizable: false
  },function(win) {
       myWin = win;
       myWin.contentWindow.postMessage('Just wanted to say hey.', '*');
     });
}
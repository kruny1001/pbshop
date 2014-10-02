
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

chrome.runtime.onInstalled.addListener(function() {
    console.log('installed');
});

chrome.runtime.onSuspend.addListener(function() {
    // Do some simple clean-up tasks.
});

/**
 * Creates the window for the application.
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
function runApp() {
    window.chrome.app.window.create('uriProductEditor.html', {
        frame: "none",
        id: 'productEditor',
        innerBounds: {
            width: 360,
            height: 300,
            left:600,
            minWidth:220,
            minHeight:220
        }
    });
}
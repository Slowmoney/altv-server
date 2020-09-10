
import alt from 'alt';

const url = `http://resource/client/html/auth/index.html`;
let view;


alt.onServer('auth:Open', showAuthPanel); 
alt.onServer('auth:Exit', exitAuthPanel); 
alt.onServer('auth:Error', errorAuthPanel); 
alt.onServer('auth:Done', doneAuth); 
alt.on('auth:Done', doneAuth); 

alt.on('auth:Open', showAuthPanel); 
alt.on('auth:Exit', exitAuthPanel); 

function showAuthPanel() {
    if (view && view.destroy) {
        view.destroy();
    }

    view = new alt.WebView(url);
    view.on('auth:Try', tryAuthPanel);
    view.on('auth:Ready', readyAuthPanel);
    view.focus()
    showCursor(true);
    alt.toggleGameControls(false);
}
function doneAuth() {
    exitAuthPanel()
    alt.log('doneAuth');
}
function exitAuthPanel() {
    if (view && view.destroy) {
        view.destroy();
    }

    showCursor(false);
    alt.toggleGameControls(true);
}

function errorAuthPanel(msg) {
    if (!view) {
        return;
    }

    view.emit('auth:Error', msg);
}

function readyAuthPanel() {
    if (!view) {
        return;
    }

    view.emit('auth:Ready');
}

function tryAuthPanel(username, password, email = null) {
    alt.log('tryAuthPanel', username, password, email);
    alt.emitServer('auth:Try', username, password, email);
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) { }
}
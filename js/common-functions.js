let locale = document.querySelector('html').getAttribute('lang') || 'en';

// tJSON is defined in translation script files
function kts(string, x = false) {
    if (locale != 'en' && typeof tJSON !== 'undefined') {
		const stringExists = tJSON.hasOwnProperty(string);
        const localisedString = stringExists ? tJSON[string] : string;
		if(!stringExists) {
			saveUntranslatedString(string);
		}
        
        if (x) {
            return localisedString.replace('{X}', x);
        } else {
            return localisedString;
        }
    } else {
        if (x) {
            return string.replace('{X}', x);
        } else {
            return string;
        }
    }
}

function saveUntranslatedString(string) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/wp-admin/admin-ajax.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    const data = `action=save_untranslated_string&string=${encodeURIComponent(string)}`;
    
    xhr.send(data);
}
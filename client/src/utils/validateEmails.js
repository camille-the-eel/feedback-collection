const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.replace(/(^,)|(,$)/g, "").trim())
        // matches each email against the emailregex asigned to re
        // if email is invalid (does not match regex), it will return false
        // since those are the emails we want to capture/highlight (the invalid ones) we grab any that === false
        .filter(email => re.test(email) === false);
    
    // if there are any invalid emails (if .length does not exist, this will not run as true)
    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    // otherwise, if there are not, return nothing
    return null;
};
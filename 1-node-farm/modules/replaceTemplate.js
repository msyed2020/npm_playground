module.exports = (temp, prod) => {

    // Just so we're clear, since this is proof of concept and not a real functioning site,
    // only a few parameters have been changed from the given code. For instance,
    // image has not been edited so all items have cheese emoji

    let output = temp.replace(/{%PRODUCTNAME%}/g, prod.productName); // //g means apply globally to all variables
    output = output.replace(/{%PRICE%}/g, prod.price);
    output = output.replace(/{%LOCATION%}/g, prod.from);
    if (!prod.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
};
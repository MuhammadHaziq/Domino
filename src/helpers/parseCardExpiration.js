const parseCardExpiration = expiration => {
  let cardMonth, cardYear, expObj;

  if (typeof expiration !== 'string') expiration = expiration.toString();

  if (expiration.indexOf('/') >= 0) {
    let date = expiration.split('/');
    cardMonth = date[0];
    cardYear = date[1];
  } else {
    if (expiration.length < 5) {
      cardMonth = expiration.slice(0, -2);
      cardYear = expiration.slice(-2);
    } else {
      cardMonth = expiration.slice(0, -4);
      cardYear = expiration.slice(-4);
    }
  }

  expObj = {
    cardMonth: cardMonth,
    cardYear: cardYear,
  };

  return expObj;
};

export default parseCardExpiration;

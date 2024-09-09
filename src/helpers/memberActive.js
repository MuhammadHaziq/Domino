const memberActive = signupDate => {
  if (signupDate === '') {
    return -1; // inactive
  } else {
    const expireDate = new Date(signupDate);
    const todaysDate = new Date();
    if (expireDate < todaysDate) {
      return 0; // expired
    } else {
      return 1; // active
    }
  }
};

export default memberActive;

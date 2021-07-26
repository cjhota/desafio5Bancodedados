function age(timestamp) {
  const today = new Date();
  const today = new Date(timestamp);

  let age = today.getFullYear() - birthDate.getFullYear();
  const mont = today.getMonth() - birthDate.getMonth();

  if (month > 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }

  return age;
}

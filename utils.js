function ageToDateOfBirth(age) {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var birthYear = currentYear - age;

  var dateOfBirth = new Date(birthYear, 0, 1);
  return dateOfBirth.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}

function calculateAge(dateOfBirth) {
  // Parse the date of birth
  const dob = new Date(dateOfBirth);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday has occurred this year or not
  const currentMonth = currentDate.getMonth();
  const birthMonth = dob.getMonth();
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}


const transparency = 0.2;
const colorsWithTransparency = [
  `rgba(255, 0, 0, ${transparency})`, // Red with 10% opacity
  `rgba(0, 255, 0, ${transparency})`, // Green with 10% opacity
  `rgba(0, 0, 255, ${transparency})`, // Blue with 10% opacity
  `rgba(255, 255, 0, ${transparency})`, // Yellow with 10% opacity
  `rgba(255, 0, 255, ${transparency})`, // Magenta with 10% opacity
  `rgba(0, 255, 255, ${transparency})`, // Cyan with 10% opacity
  `rgba(128, 0, 0, ${transparency})`, // Maroon with 10% opacity
  `rgba(0, 128, 0, ${transparency})`, // Green (Dark) with 10% opacity
  `rgba(0, 0, 128, ${transparency})`, // Navy with 10% opacity
  `rgba(128, 128, 0, ${transparency})`, // Olive with 10% opacity
  `rgba(128, 0, 128, ${transparency})`, // Purple with 10% opacity
  `rgba(0, 128, 128, ${transparency})`, // Teal with 10% opacity
  `rgba(255, 165, 0, ${transparency})`, // Orange with 10% opacity
  `rgba(128, 128, 128, ${transparency})`, // Gray with 10% opacity
  `rgba(192, 192, 192, ${transparency})`, // Silver with 10% opacity
  `rgba(255, 192, 203, ${transparency})`, // Pink with 10% opacity
  `rgba(0, 255, 127, ${transparency})`, // Spring Green with 10% opacity
  `rgba(255, 140, 0, ${transparency})`, // Dark Orange with 10% opacity
  `rgba(75, 0, 130, ${transparency})`, // Indigo with 10% opacity
  `rgba(173, 216, 230, ${transparency})`, // Light Blue with 10% opacity
];

export { calculateAge, colorsWithTransparency ,ageToDateOfBirth};

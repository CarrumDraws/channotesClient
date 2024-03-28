// Converts isoDate to readable "Month DD, YYYY" format
// Used in TitleBar
function readDate(isoDate) {
  try {
    const parsedDate = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = parsedDate.toLocaleDateString("en-US", options);
    return formattedDate;
  } catch (error) {
    return "Invalid ISO 8601 format";
  }
}
export default readDate;

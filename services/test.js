
//  const a = undefined

//  console.log(!undefined)

//  async function urlToFile(url, filename, mimeType) {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch file: ${response.statusText}`);
//     }
//     const blob = await response.blob();
//     return new File([blob], filename, { type: mimeType });
// }

// // Using the function
// const fileUrl = "https://pub-c84ae17680f74c7c880037b93a3a734d.r2.dev/1733418749055_Zoom-3rd-day.png";
// const fileName = "Zoom-3rd-day.png"; // Desired file name
// const mimeType = "image/png"; // MIME type of the file

// urlToFile(fileUrl, fileName, mimeType)
//     .then(file => {
//         console.log("File object created:", file);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });


function extractFileName(fullFileName) {
    const parts = fullFileName.split(/[_\-\s]+/);
    console.log(parts) // Split by underscore, hyphen, or space
    if (parts.length > 1 && parts[parts.length - 1].includes('.')) {
        return parts.slice(1).join('_'); // Rejoin from second part onwards (ignoring prefix)
    }
    return fullFileName; // Return full name if no specific pattern
}


function formattedDate(date){
    const utcDate = new Date(date);
    const timezoneOffset = 6 * 60 * 60 * 1000; // UTC+6 in milliseconds
    const customDate = new Date(utcDate.getTime() + timezoneOffset);
    const dateString = customDate.toISOString().split('T')[0];
    const finalDate = new Date(`${dateString}T00:00:00.000Z`);
    return finalDate.toISOString()
}
console.log(formattedDate("2025-01-05T18:00:00.000+00:00"));
const date = new Date()
console.log(date)
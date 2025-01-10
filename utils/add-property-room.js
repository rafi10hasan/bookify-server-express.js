const { ratingGrade } = require("./rating-grade");

async function getGradingAndAvgRatingForRoom(rooms){
    const updatedRooms = await Promise.all(
        rooms.map(async (room) => {
          try {
            const avgRating = room.ratings.length
              ? room.ratings.reduce((acc, curr) => acc + curr.rating, 0) / room.ratings.length
              : 0;
      
            const grading = ratingGrade(avgRating);
            room.grading = grading;
            room.average_rating = avgRating ? avgRating : 0
            // Save the updated grading in the database
            await room.save();
      
            return room; // Return the updated room object, or any value you want to track
          } catch (error) {
            console.error("Error processing room:", room._id, error);
            return null; // or handle the error as needed
          }
        })
      );

      return updatedRooms;
}

module.exports = {getGradingAndAvgRatingForRoom}
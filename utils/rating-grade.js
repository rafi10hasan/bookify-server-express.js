function ratingGrade(rating){
    let gradeMsg = ""
      if(rating >= 4.8 && rating <= 5){
          gradeMsg = "superb"
      }
      else if(rating >= 4.5 && rating <= 4.7){
          gradeMsg = "very good"
      }
      else if(rating >= 4.0 && rating <= 4.4){
        gradeMsg = "good"
    }
      else if(rating >=3.0 && rating <= 3.9){
          gradeMsg = "average"
      }
      else{
          gradeMsg = "poor"
      }
  
      return gradeMsg
  }
  
  module.exports = {ratingGrade}
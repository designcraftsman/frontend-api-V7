function overview(data) {
    return {
      totalLearners: data.totalLearners,
      countries: data.countries,
      emergingEconomies: data.emergingEconomies
    };
}
//------------------------------------------------------------------------------------
function enrollment(data) {
    return {
      labels: data.map(item => item.month),
      dataPoints: data.map(item => item.enrollmentCount)
    };
  }
  //------------------------------------------------------------------------------------
  function reach(data) {
    return {
      totalReach: data.totalReach,
      activeUsers: data.activeUsers,
      growthRate: data.growthRate
    };
  }
//-------This one is done---------------------------------------------------------------------
function coursesByCategories(data) { 
    let result = [
        { category: 'math', students: 0 },
        { category: 'biology', students: 0 },
        { category: 'mechanics', students: 0 },
        { category: 'software', students: 0 },
    ];
    data.map(course => {
        switch(course){
            case "math":  
                result[0].students ++; 
                break;
            case "biology":  
                result[1].students ++; 
                break;
            case "mechanics":  
                result[2].students ++; 
                break;
            case "software":  
                result[3].students ++; 
                break;
        }
    })
    return result;
  }
//------------------------------------------------------------------------------------
function intent(data) {
    return {
      complete: data.complete,
      audit: data.audit,
      uncommitted: data.uncommitted
    };
}
//------------------------------------------------------------------------------------
  function continents(data) {
    return data.reduce((acc, item) => {
      acc[item.continent] = item.percentage;
      return acc;
    }, {});
  }
//------------------------------------------------------------------------------------
  function countries(data) {
    return data.reduce((acc, item) => {
      acc[item.country] = item.percentage;
      return acc;
    }, {});
  }


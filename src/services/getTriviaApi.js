const getTrivia = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  console.log(data);
  const questionsObj = data.results;
  return questionsObj;
};

export default getTrivia;

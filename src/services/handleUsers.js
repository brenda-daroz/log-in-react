const handleUsers = async () => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  console.log(data);
  return data.users;
};

export default handleUsers;

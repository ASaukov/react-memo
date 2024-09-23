const URL = "https://wedev-api.sky.pro/api/leaderboard";

export const getLeadersPage = async () => {
  const response = await fetch(URL, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Не удалось получить данные");
  }
  const data = await response.json()
  return data.leaders;
};

export const createLeader = async (name, time) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify ({
      name,
      time,
    })
  })
  if (response.status === 400) {
    throw new Error ("Не удалось загрузить данные")
  }
  const data = await response.json()
  return data.leaders;
}
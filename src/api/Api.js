const URL = "https://wedev-api.sky.pro/api/v2/leaderboard";

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

export const createLeader = async (name, time, achievements) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify ({
      name,
      time,
      achievements,
    })
  })
  if (response.status === 400) {
    throw new Error ("Не удалось загрузить данные")
  }
  const data = await response.json()
  return data.leaders;
}
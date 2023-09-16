const nameList = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Helen"];

export const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * nameList.length);
  return nameList[randomIndex];
};


export const generateRandomAvatar = () => {
  const avatarOptions = {
    avatarStyle: ["Circle"],
    topType: ["LongHairStraight", "ShortHairShortFlat", "NoHair"],
    accessoriesType: ["Blank", "Kurt", "Prescription01", "Round"],
    hairColor: ["BrownDark", "Black", "Blonde", "Brown"],
    facialHairType: ["Blank", "BeardMedium", "BeardLight"],
    clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater"],
    eyeType: ["Default", "Happy", "Side", "Wink"],
    eyebrowType: ["Default", "UpDown", "Angry"],
    mouthType: ["Default", "Smile", "Serious"],
    skinColor: ["Light", "Dark", "Brown"]
  };

  let avatarUrl = "https://avataaars.io/?";
  for (const [key, values] of Object.entries(avatarOptions)) {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    avatarUrl += `${key}=${randomValue}&`;
  }

  return avatarUrl.slice(0, -1);
};

import { CONFIGS } from "@configs/index";

export async function fetchIndex(index: number) {
  const res = await fetch(`${CONFIGS.API_URL}/api?index=${index}`);

  return res.json();
}

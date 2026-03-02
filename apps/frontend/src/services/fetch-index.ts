import { CONFIGS } from "@configs/index";

export async function fetchIndex(index: number) {
  const res = await fetch(`${CONFIGS.API_URL}/api?index=${index}`);

  if (!res.ok) {
    throw new Error(`Status: ${res.status}`);
  }

  return res.json();
}

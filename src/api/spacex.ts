import { Launch } from '../types/launch';

const API_BASE_URL = 'https://api.spacexdata.com/v3';

export async function fetchLaunches(year: string): Promise<Launch[]> {
  const response = await fetch(`${API_BASE_URL}/launches?launch_year=${year}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch launches: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

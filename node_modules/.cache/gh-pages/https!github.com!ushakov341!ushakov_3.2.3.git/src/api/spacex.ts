import { Launch } from '../types/launch';

const API_BASE_URL = 'https://api.spacexdata.com/v4';

export async function fetchLaunches(year: string): Promise<Launch[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/launches/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          date_utc: {
            $gte: `${year}-01-01T00:00:00Z`,
            $lt: `${parseInt(year) + 1}-01-01T00:00:00Z`,
          },
        },
        options: {
          limit: 100,
          sort: {
            date_utc: 1,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch launches: ${response.statusText}`);
    }

    const data = await response.json();

    return data.docs.map((doc: any) => ({
      id: doc.id,
      mission_name: doc.name,
      launch_date_utc: doc.date_utc,
      launch_success: doc.success,
      rocket: {
        rocket_id: doc.rocket?.id,
        rocket_name: doc.rocket?.name || 'Unknown',
      },
      payloads: doc.payloads || [],
      details: doc.details || 'No details available',
      links: {
        mission_patch: doc.links?.patch?.small,
        reddit_campaign: doc.links?.reddit?.campaign,
        wikipedia: doc.links?.wikipedia,
        youtube_id: doc.links?.youtube_id,
      },
    }));
  } catch (error) {
    throw error;
  }
}

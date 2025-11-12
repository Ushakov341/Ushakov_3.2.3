export interface Launch {
  id?: string;
  mission_name: string;
  launch_year?: string;
  launch_date_utc?: string;
  launch_success?: boolean;
  details: string | null;
  payloads?: any[];
  links?: {
    mission_patch?: string | null;
    mission_patch_small?: string | null;
    reddit_campaign?: string | null;
    wikipedia?: string | null;
    youtube_id?: string | null;
  } | null;
  rocket: {
    rocket_id?: string;
    rocket_name: string;
  };
}

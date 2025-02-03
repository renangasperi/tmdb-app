interface CastMember {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CreditsResponse {
  id: number;
  cast: CastMember[];
}

export type { CastMember, CreditsResponse };

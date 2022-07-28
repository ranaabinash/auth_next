import axios from "axios";

interface GitHubUser {
  id: number;
  name: string;
}

interface AccessTokenResponse {
  access_toke: string;
}

interface UserResponse {
  id: number;
  name: string;
}

const TOKEN_URL = "https://github.com/login/oauth/access_token";
const USER_URL = "https://github.com/user";

export async function getGitHubUser(code: string): Promise<GitHubUser> {
  const token = await getAccesToken(code);
  return getUser(token);
}

async function getAccesToken(code: string) {
  const response = await axios.post<AccessTokenResponse>(
    TOKEN_URL,
    {
      client_id: process.env.GITHUB_CLIEN_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: "application/json" } }
  );

  return response.data.access_toke;
}

async function getUser(token: string): Promise<UserResponse> {
  const response = await axios.get<UserResponse>(USER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

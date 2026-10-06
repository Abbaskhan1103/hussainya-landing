import { GoogleAuth } from "google-auth-library";

const API = "https://cloudidentity.googleapis.com/v1";
const SCOPE = "https://www.googleapis.com/auth/cloud-identity.groups";

let auth: GoogleAuth | undefined;
let groupName: string | undefined;

// Adds `email` to the Google Group attached to the Play closed-testing track.
// The service account authenticates as itself, so it needs the Groups Admin
// role assigned in the Google Admin console (no domain-wide delegation).
export async function addAndroidTester(email: string): Promise<boolean> {
  const keyFile = process.env.GOOGLE_TESTERS_SA_KEY_FILE;
  const groupEmail = process.env.TESTERS_GROUP_EMAIL;
  if (!keyFile || !groupEmail) {
    console.error("testers: GOOGLE_TESTERS_SA_KEY_FILE / TESTERS_GROUP_EMAIL not configured");
    return false;
  }

  try {
    auth ??= new GoogleAuth({ keyFile, scopes: [SCOPE] });
    const client = await auth.getClient();

    if (!groupName) {
      const lookup = await client.request<{ name: string }>({
        url: `${API}/groups:lookup`,
        params: { "groupKey.id": groupEmail },
      });
      groupName = lookup.data.name;
    }

    await client.request({
      url: `${API}/${groupName}/memberships`,
      method: "POST",
      data: { preferredMemberKey: { id: email }, roles: [{ name: "MEMBER" }] },
    });
    return true;
  } catch (err) {
    if ((err as { status?: number }).status === 409) return true; // already a member
    console.error("testers: add to group failed", err);
    return false;
  }
}

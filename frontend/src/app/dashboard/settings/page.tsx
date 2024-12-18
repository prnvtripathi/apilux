import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/data";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import ProfilePage from "../user/[id]/page";
import { BackgroundStyle } from "@/components/effects/background-style";
import DeleteDialog from "@/app/dashboard/settings/deleteAccount";

interface PageParams {
  params: {
    id: string;
    email: string;
    name: string;
    username: string;
    password: string;
    img: string;
  };
}

export default async function SettingsPage(params: PageParams) {
  console.log(params, "is the params");
  const data = await auth();
  console.log(data, "mil gaya");
  const id = data?.user?.id;
  console.log(id, "li hai maine");
  // console.log(id, "is the id");
  const user = await fetchUser(id);
  console.log(user, "is what we got");

  return (
    <div className="flex min-h-screen bg-background">
      <BackgroundStyle />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="other">Data and Privacy</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">
                  Manage your profile settings and preferences.
                </p>
              </div>
              {/* <ProfileForm /> */}
              <ProfilePage
                params={{
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  username: user.username,
                  password: user.password,
                  img: user.img,
                }}
              />
            </TabsContent>
            <TabsContent value="other" className="space-y-4">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">
                  Other Settings
                </h2>
                <p className="text-muted-foreground">
                  Manage your account preferences and settings.
                </p>
              </div>
              {/* <OtherSettingsForm /> */}
              <form className="space-y-5">
                {" "}
                <Card>
                  <CardContent>
                    <h1 className="font-semibold">Remove Stored API Data</h1>
                    <p>By removing stored API data, you will clear all cached information related to your account.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <h1 className="font-semibold">Remove Stored API Test Cases</h1>
                        <p>
                        This will remove all generated test cases for the APIs stored within your account. Note that this will not delete the APIs themselves.
                        </p>
                      </div>{" "}
                      <DeleteDialog/>
                    </div>{" "}
                  </CardContent>
                </Card>
                <h1 className="font-bold text-2xl">Danger Zone</h1>
                <Separator />
                <Card>
                  <CardContent>
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <h1 className="font-semibold">Delete Account</h1>
                        <p>
                          This action is irreversible. Once you delete your
                          account, all your data will be permanently removed.
                        </p>
                      </div>{" "}
                      <DeleteDialog/>
                    </div>{" "}
                  </CardContent>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

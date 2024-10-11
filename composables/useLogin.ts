export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  company: string;
  expires_in: 259200;
}

export interface LoginPayload {
  UserName: string;
  Password: string;
  Company: string;
  browserInfo: BrowserInfo;
  machineInfo: MachineInfo;
  osInfo: OsInfo;
  osNameInfo: OsNameInfo;
  Device: string;
  Model: string;
  Source: string;
  Exp: number;
}

export interface BrowserInfo {
  chrome: boolean;
  chrome_view: boolean;
  chrome_mobile: boolean;
  chrome_mobile_ios: boolean;
  safari: boolean;
  safari_mobile: boolean;
  msedge: boolean;
  msie_mobile: boolean;
  msie: boolean;
}

export interface MachineInfo {
  brand: string;
  model: string;
  os_name: string;
  os_version: string;
  type: string;
}

export interface OsInfo {
  android: boolean;
  blackberry: boolean;
  ios: boolean;
  windows: boolean;
  windows_phone: boolean;
  mac: boolean;
  linux: boolean;
  chrome: boolean;
  firefox: boolean;
  gamingConsole: boolean;
}

export interface OsNameInfo {
  name: string;
  version: string;
  platform: string;
}

export default async ({
  body,
}: {
  body: { UserName: string; Password: string };
}) => {
  const { error, data, status } = await useFetch<LoginResponse>(
    `https://core.api.elsoft.id/portal/api/auth/signin`,
    {
      lazy: true,
      method: "POST",
      body: {
        UserName: body.UserName,
        Password: body.Password,
        Company: "d3170153-6b16-4397-bf89-96533ee149ee",
        browserInfo: {
          chrome: true,
          chrome_view: false,
          chrome_mobile: false,
          chrome_mobile_ios: false,
          safari: false,
          safari_mobile: false,
          msedge: false,
          msie_mobile: false,
          msie: false,
        },
        machineInfo: {
          brand: "Apple",
          model: "",
          os_name: "Mac",
          os_version: "10.15",
          type: "desktop",
        },
        osInfo: {
          android: false,
          blackberry: false,
          ios: false,
          windows: false,
          windows_phone: false,
          mac: true,
          linux: false,
          chrome: false,
          firefox: false,
          gamingConsole: false,
        },
        osNameInfo: {
          name: "Mac",
          version: "10.15",
          platform: "",
        },
        Device: "web_1703742830368",
        Model: "Admin Web",
        Source: "103.242.150.163",
        Exp: 3,
      } as LoginPayload,
    }
  );
  return { error, data, status };
};

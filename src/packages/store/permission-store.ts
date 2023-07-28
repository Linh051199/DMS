import {atomsWithQuery} from "jotai-tanstack-query";
import {logger} from "@packages/logger";
import {createClientGateApi} from "@packages/api";
import {authAtom} from "@packages/store/auth-store";
import {User} from "@packages/types";

interface PermissionState {
  menu?: string[];
  buttons?: string[];
  sysUser?: User
}
export const [permissionAtom] = atomsWithQuery<PermissionState>((get) => ({
  queryKey: ['permissions'],
  queryFn: async ({ }) => {
    const auth = get(authAtom);
    logger.debug('auth:', auth)
    if(auth) {
      const { currentUser, networkId, orgData, clientGateUrl } = auth;
      if(!currentUser) {
        return {}
      }
      const api = createClientGateApi(
        currentUser!,
        clientGateUrl!,
        networkId,
        orgData?.Id!
      )
      const res = await api.GetForCurrentUser();
      if (res.isSuccess) {
        // parsing permission data
        const grantedMenu = res.Data?.Lst_Sys_Access.filter((item) => item.so_FlagActive === "1" && item.so_ObjectType === "MENU").map((item) => item.so_ObjectCode);
        const grantedButtons = res.Data?.Lst_Sys_Access.filter((item) => item.so_FlagActive === "1" && item.so_ObjectType === "BUTTON").map((item) => item.so_ObjectCode);
        return {
          menu: grantedMenu,
          buttons: grantedButtons,
          sysUser: res.Data?.Sys_User
        }
      } else {
        if(res.errorCode === "SysUserGetForCurrentUser") {
          window.location.href = "/login"
          return {}
        }
        return {};
      }
    }
    return {};
  },
  networkMode: 'offlineFirst',
  keepPreviousData: false,
}));

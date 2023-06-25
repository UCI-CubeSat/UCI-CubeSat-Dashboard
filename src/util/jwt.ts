import { User, userSchema } from "@/model/user";

export const parseJwt = (token: string): unknown => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const validateToken = (
  setAuth: (auth: { user: User; token: string } | null) => void
) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const result = userSchema.safeParse(parseJwt(token));
    if (result.success && result.data.exp > Date.now() / 1000) {
      setAuth({
        user: result.data,
        token: token,
      });
    } else {
      localStorage.removeItem("token");
      setAuth(null);
    }
  } else {
    setAuth(null);
  }
};
